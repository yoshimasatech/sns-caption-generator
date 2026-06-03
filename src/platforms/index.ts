import { Platform, PlatformConfig } from "../types";
import { tiktokConfig, tiktokPrompt } from "./tiktok";
import { instagramConfig, instagramPrompt } from "./instagram";
import { xConfig, xPrompt } from "./x";

const configs: Record<Platform, PlatformConfig> = {
  tiktok: tiktokConfig,
  instagram: instagramConfig,
  x: xConfig,
};

const prompts: Record<Platform, (lang: string) => string> = {
  tiktok: tiktokPrompt,
  instagram: instagramPrompt,
  x: xPrompt,
};

export function getPlatformConfig(platform: Platform): PlatformConfig {
  return configs[platform];
}

export function getPlatformPrompt(platform: Platform, language: string): string {
  return prompts[platform](language);
}
