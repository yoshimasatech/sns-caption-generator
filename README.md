# sns-caption-generator

AI-powered SNS caption generator for **TikTok**, **Instagram**, and **X (Twitter)**.

Generate engaging, platform-optimized captions with hashtags in seconds using Claude or GPT.

## Features

- **Multi-platform support** - TikTok, Instagram, X with platform-specific optimization
- **Category templates** - Hotel, Travel Spot, Restaurant, Product, General
- **Multi-language** - Japanese, English, Korean
- **Dual AI support** - Works with both Anthropic Claude and OpenAI GPT
- **Interactive mode** - Guided step-by-step caption generation
- **CLI mode** - Quick generation with command-line options

## Quick Start

```bash
# Clone and install
git clone https://github.com/YOUR_USERNAME/sns-caption-generator.git
cd sns-caption-generator
npm install

# Set up your API key
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY or OPENAI_API_KEY

# Build
npm run build

# Run interactive mode
sns-caption interactive

# Or use CLI mode
sns-caption generate -p tiktok -c hotel -t "Luxury ryokan in Hakone with private onsen"
```

## Usage

### Interactive Mode

```bash
sns-caption interactive
# or
sns-caption i
```

Walk through a guided flow:
1. Choose platform (TikTok / Instagram / X)
2. Select content category
3. Pick language
4. Describe your topic
5. Choose tone
6. Set number of variations

### CLI Mode

```bash
sns-caption generate \
  --platform tiktok \
  --category hotel \
  --language ja \
  --topic "Shibuya rooftop hotel with city view" \
  --tone casual \
  --count 3
```

**Options:**

| Option | Values | Default |
|--------|--------|---------|
| `-p, --platform` | `tiktok`, `instagram`, `x` | required |
| `-c, --category` | `hotel`, `spot`, `restaurant`, `product`, `general` | required |
| `-l, --language` | `ja`, `en`, `ko` | `ja` |
| `-t, --topic` | any text | required |
| `--tone` | `casual`, `formal`, `luxury`, `energetic` | - |
| `-n, --count` | `1-5` | `3` |
| `--provider` | `anthropic`, `openai` | auto-detect |

## Example Output

```
==================================================
  TikTok Caption #1  (186 chars)
==================================================

this hotel in Hakone is UNREAL

private onsen on your balcony
with Mt. Fuji right there

stayed 2 nights and honestly
didn't want to leave

save this for your next Japan trip

Hashtags: #Hakone #JapanTravel #Ryokan #Onsen #TravelTikTok
CTA: Save for your next trip to Japan!
```

## AI Provider Setup

### Anthropic (Claude) - Recommended
```bash
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

### OpenAI (GPT)
```bash
AI_PROVIDER=openai
OPENAI_API_KEY=sk-xxxxx
```

The tool auto-detects which provider to use based on available API keys. Set `AI_PROVIDER` to override.

## Project Structure

```
sns-caption-generator/
├── src/
│   ├── index.ts          # CLI entry point
│   ├── generator.ts      # Core generation logic
│   ├── types.ts          # TypeScript types
│   ├── platforms/         # Platform-specific configs
│   │   ├── tiktok.ts
│   │   ├── instagram.ts
│   │   └── x.ts
│   └── templates/         # Category prompt templates
│       └── index.ts
├── package.json
├── tsconfig.json
└── .env.example
```

## Contributing

Contributions are welcome! Feel free to:

- Add new platforms (Threads, LinkedIn, etc.)
- Add new category templates
- Add new languages
- Improve prompt quality

## License

MIT
