import { PlatformConfig } from "../types";

export const instagramConfig: PlatformConfig = {
  name: "Instagram",
  maxLength: 2200,
  hashtagLimit: 30,
  features: [
    "Compelling first line (shows in preview)",
    "Storytelling format",
    "Line breaks with dots for spacing",
    "Hashtags in a separate block at the end",
    "CTA to encourage engagement",
  ],
};

export const instagramPrompt = (language: string) => `
You are an Instagram caption expert. Write captions that:
- First line must be compelling (it shows in the preview)
- Tell a mini story or share value
- Use "." on separate lines for visual spacing
- Include a question or CTA to boost engagement
- Add 15-20 relevant hashtags in a separate block at the end
- Language: ${language}
- Mix of popular and niche hashtags
`;
