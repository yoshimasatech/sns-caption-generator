import { Category } from "../types";

const categoryTemplates: Record<Category, string> = {
  hotel: `
Category: Hotel / Accommodation
Focus on:
- Location highlights and atmosphere
- Room features and amenities
- Unique experiences (view, onsen, rooftop, etc.)
- Pricing hints if relevant (affordable luxury, budget-friendly, etc.)
- Travel tips and best season to visit
`,
  spot: `
Category: Travel Spot / Destination
Focus on:
- What makes this place special or Instagram-worthy
- Best time to visit and seasonal highlights
- Hidden gems or local tips
- How to get there (accessibility)
- Photo spots and must-do activities
`,
  restaurant: `
Category: Restaurant / Food
Focus on:
- Signature dishes and flavor descriptions
- Atmosphere and vibe of the place
- Price range hints
- Reservation tips
- Food presentation and visual appeal
`,
  product: `
Category: Product Review / Promotion
Focus on:
- Key features and benefits
- Problem it solves
- Personal experience / honest review tone
- Value for money
- Where to buy / availability
`,
  general: `
Category: General Content
Focus on:
- Engaging storytelling
- Relatable content
- Clear message or value proposition
- Audience engagement triggers
`,
};

export function getCategoryTemplate(category: Category): string {
  return categoryTemplates[category];
}
