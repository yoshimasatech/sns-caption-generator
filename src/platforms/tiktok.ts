import { PlatformConfig } from "../types";

export const tiktokConfig: PlatformConfig = {
  name: "TikTok",
  maxLength: 2200,
  hashtagLimit: 5,
  features: [
    "Short, punchy opening line to hook viewers",
    "Use line breaks for readability",
    "Include a clear CTA (save, follow, share)",
    "Trending hashtags mixed with niche hashtags",
    "Emoji usage for visual breaks",
  ],
};

export const tiktokPrompt = (language: string) => `
You are a TikTok caption expert. Write captions that:
- Start with a strong hook (question, bold statement, or relatable scenario)
- Keep it concise but engaging
- Use line breaks between ideas
- End with a CTA
- Add 3-5 relevant hashtags (mix of trending + niche)
- Language: ${language}
- Use emojis strategically (not excessively)
`;
