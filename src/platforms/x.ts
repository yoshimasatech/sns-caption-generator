import { PlatformConfig } from "../types";

export const xConfig: PlatformConfig = {
  name: "X (Twitter)",
  maxLength: 280,
  hashtagLimit: 3,
  features: [
    "Concise and impactful",
    "Thread-friendly format",
    "Minimal hashtags (1-3)",
    "Engagement-driving questions or opinions",
    "Clear and direct language",
  ],
};

export const xPrompt = (language: string) => `
You are an X (Twitter) post expert. Write posts that:
- Stay within 280 characters
- Be concise, witty, or thought-provoking
- Use 1-3 hashtags maximum
- Include a hook that makes people want to engage
- Language: ${language}
- Avoid filler words - every word must earn its place
`;
