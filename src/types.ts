export type Platform = "tiktok" | "instagram" | "x";
export type Category = "hotel" | "spot" | "restaurant" | "product" | "general";
export type Language = "ja" | "en" | "ko";
export type AIProvider = "anthropic" | "openai";

export interface GenerateOptions {
  platform: Platform;
  category: Category;
  language: Language;
  topic: string;
  tone?: string;
  provider?: AIProvider;
  includeHashtags?: boolean;
  includeCTA?: boolean;
  count?: number;
}

export interface CaptionResult {
  platform: Platform;
  caption: string;
  hashtags: string[];
  cta?: string;
  charCount: number;
}

export interface PlatformConfig {
  name: string;
  maxLength: number;
  hashtagLimit: number;
  features: string[];
}
