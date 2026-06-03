#!/usr/bin/env node

import "dotenv/config";
import { Command } from "commander";
import { input, select, number } from "@inquirer/prompts";
import { generateCaptions } from "./generator";
import { Platform, Category, Language, CaptionResult } from "./types";
import { getPlatformConfig } from "./platforms";

const program = new Command();

program
  .name("sns-caption")
  .description("AI-powered SNS caption generator for TikTok, Instagram, and X")
  .version("1.0.0");

program
  .command("generate")
  .alias("g")
  .description("Generate captions with options")
  .option("-p, --platform <platform>", "Platform: tiktok, instagram, x")
  .option("-c, --category <category>", "Category: hotel, spot, restaurant, product, general")
  .option("-l, --language <language>", "Language: ja, en, ko", "ja")
  .option("-t, --topic <topic>", "Topic or subject")
  .option("--tone <tone>", "Tone: casual, formal, fun, luxury")
  .option("-n, --count <number>", "Number of variations", "3")
  .option("--provider <provider>", "AI provider: anthropic, openai")
  .action(async (opts) => {
    try {
      const options = {
        platform: opts.platform as Platform,
        category: opts.category as Category,
        language: (opts.language || "ja") as Language,
        topic: opts.topic as string,
        tone: opts.tone,
        provider: opts.provider,
        count: parseInt(opts.count, 10),
      };

      if (!options.platform || !options.category || !options.topic) {
        console.error("Error: --platform, --category, and --topic are required.");
        console.error("Example: sns-caption generate -p tiktok -c hotel -t \"Shibuya rooftop hotel\"");
        process.exit(1);
      }

      console.log(`\n  Generating ${options.count} caption(s) for ${options.platform}...\n`);

      const results = await generateCaptions(options);
      printResults(results);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command("interactive")
  .alias("i")
  .description("Interactive mode - guided caption generation")
  .action(async () => {
    try {
      const platform = (await select({
        message: "Which platform?",
        choices: [
          { name: "TikTok", value: "tiktok" },
          { name: "Instagram", value: "instagram" },
          { name: "X (Twitter)", value: "x" },
        ],
      })) as Platform;

      const category = (await select({
        message: "Content category?",
        choices: [
          { name: "Hotel / Accommodation", value: "hotel" },
          { name: "Travel Spot", value: "spot" },
          { name: "Restaurant / Food", value: "restaurant" },
          { name: "Product", value: "product" },
          { name: "General", value: "general" },
        ],
      })) as Category;

      const language = (await select({
        message: "Language?",
        choices: [
          { name: "Japanese", value: "ja" },
          { name: "English", value: "en" },
          { name: "Korean", value: "ko" },
        ],
      })) as Language;

      const topic = await input({
        message: "What is the topic? (e.g., luxury hotel in Shibuya with rooftop bar)",
      });

      const tone = await select({
        message: "Tone?",
        choices: [
          { name: "Casual & Fun", value: "casual" },
          { name: "Professional", value: "formal" },
          { name: "Luxury & Elegant", value: "luxury" },
          { name: "Energetic & Exciting", value: "energetic" },
        ],
      });

      const count =
        (await number({
          message: "How many variations? (1-5)",
          default: 3,
        })) || 3;

      console.log(`\n  Generating ${count} caption(s) for ${platform}...\n`);

      const results = await generateCaptions({
        platform,
        category,
        language,
        topic,
        tone,
        count: Math.min(count, 5),
      });

      printResults(results);
    } catch (error: any) {
      if (error.message?.includes("User force closed")) {
        console.log("\nBye!");
        return;
      }
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

function printResults(results: CaptionResult[]) {
  const config = getPlatformConfig(results[0].platform);

  results.forEach((result, index) => {
    console.log(`${"=".repeat(50)}`);
    console.log(`  ${config.name} Caption #${index + 1}  (${result.charCount} chars)`);
    console.log(`${"=".repeat(50)}`);
    console.log();
    console.log(result.caption);
    console.log();

    if (result.hashtags.length > 0) {
      const tags = result.hashtags.map((t: string) => (t.startsWith("#") ? t : `#${t}`)).join(" ");
      console.log(`Hashtags: ${tags}`);
    }

    if (result.cta) {
      console.log(`CTA: ${result.cta}`);
    }

    console.log();
  });
}

program.parse();
