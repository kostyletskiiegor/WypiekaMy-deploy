---
description: Generate or update design-tokens.css from brand_assets/ and existing UI
---
Read everything in `brand_assets/` (logos, color guides, style guides) and any existing 
CSS/Tailwind config in this project. Generate or update `design-tokens.css` containing:
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- Full color palette as CSS custom properties (primary, secondary, accent, neutrals, 
  semantic colors like success/error) derived from brand assets if present
- Typography scale: font families (display + body pairing), font sizes, line-heights, 
  letter-spacing per heading level
- Border-radius scale: sm, md, lg, full
- Shadow tokens: layered, color-tinted, at 2-3 elevation levels

Output as CSS custom properties under `:root`. Do not invent brand colors if brand_assets/ 
already defines them — use those exact values.