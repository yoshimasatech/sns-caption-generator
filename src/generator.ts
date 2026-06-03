import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { GenerateOptions, CaptionResult, AIProvider } from "./types";
import { getPlatformConfig, getPlatformPrompt } from "./platforms";
import { getCategoryTemplate } from "./templates";

const LANGUAGE_MAP: Record<string, string> = {
  ja: "Japanese",
  en: "English",
  ko: "Korean",
};

function buildPrompt(options: GenerateOptions): string {
  const platformPrompt = getPlatformPrompt(options.platform, LANGUAGE_MAP[options.language]);
  const categoryTemplate = getCategoryTemplate(options.category);
  const config = getPlatformConfig(options.platform);

  return `${platformPrompt}

${categoryTemplate}

Topic/Subject: ${options.topic}
${options.tone ? `Tone: ${options.tone}` : ""}
Max character limit: ${config.maxLength}
Number of caption variations: ${options.count || 1}

IMPORTANT: Respond ONLY with a valid JSON array. Each element must have this structure:
{
  "caption": "the caption text",
  "hashtags": ["tag1", "tag2"],
  "cta": "call to action text"
}

Do not include any text outside the JSON array.`;
}

async function callAnthropic(prompt: string): Promise<string> {
  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });
  const block = response.content[0];
  if (block.type === "text") return block.text;
  throw new Error("Unexpected response format from Anthropic");
}

async function callOpenAI(prompt: string): Promise<string> {
  const client = new OpenAI();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2048,
  });
  return response.choices[0]?.message?.content || "";
}

function detectProvider(): AIProvider {
  if (process.env.AI_PROVIDER === "openai") return "openai";
  if (process.env.AI_PROVIDER === "anthropic") return "anthropic";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.OPENAI_API_KEY) return "openai";
  throw new Error(
    "No AI provider configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY in your .env file."
  );
}

export async function generateCaptions(options: GenerateOptions): Promise<CaptionResult[]> {
  const provider = options.provider || detectProvider();
  const prompt = buildPrompt(options);

  const raw = provider === "anthropic" ? await callAnthropic(prompt) : await callOpenAI(prompt);

  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error("Failed to parse AI response as JSON");
  }

  const parsed = JSON.parse(jsonMatch[0]) as Array<{
    caption: string;
    hashtags: string[];
    cta?: string;
  }>;

  return parsed.map((item) => ({
    platform: options.platform,
    caption: item.caption,
    hashtags: item.hashtags,
    cta: item.cta,
    charCount: item.caption.length,
  }));
}
