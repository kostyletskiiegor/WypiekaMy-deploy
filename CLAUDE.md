# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
  - Note: these paths are machine-specific (Windows). If working from a different machine/OS, update these paths first or check for a local `.env`/config before assuming they're valid.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

### Responsive / Breakpoint Testing
- Never approve a layout from a single screenshot. Screenshot at minimum these three widths before calling any layout "done":
  - Mobile: 375px
  - Tablet: 768px
  - Desktop: 1440px
- `node screenshot.mjs http://localhost:3000 --width=375 label` (adjust script/flag to however your screenshot.mjs accepts viewport size — add a `--width` flag to `screenshot.mjs` if it doesn't support one yet)
- Flag any element that reflows badly, overflows, or overlaps at a breakpoint — fix before moving to the next screen size.

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Spacing System
- Use only this scale (px): `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`
- No arbitrary spacing values outside this set — if a gap "feels like" 20px, round to 16 or 24, don't invent 20.
- Section padding (vertical): 64–128px on desktop, 48–64px on mobile.
- Component-internal padding: 16–24px small components, 32–48px cards/panels.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens (see Spacing System above) — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Animation System
- Default library: **Framer Motion** for component-level transitions (fade/slide-in, hover states, page/section transitions).
- Use **GSAP** instead when the ask is scroll-driven (parallax, pinned sections, scrubbed timelines) or involves complex multi-step sequencing.
- Signature patterns to reach for by default, unless told otherwise:
  - Sections fade + slide up 16–24px on scroll into view, staggered by ~0.08–0.12s per child.
  - Buttons/cards: subtle scale (1 → 1.02–1.04) + shadow lift on hover, spring easing, no linear/ease-in-out.
  - Page load: stagger hero elements in over 0.4–0.6s total, don't animate everything at once.
- Keep durations short: 150–400ms for micro-interactions, 400–800ms for section reveals. Anything longer feels sluggish.
- Respect `prefers-reduced-motion`: wrap non-essential animations in a media query check and fall back to instant/opacity-only transitions.

## Accessibility
- Maintain WCAG AA contrast minimums (4.5:1 body text, 3:1 large text/UI elements) — check custom brand colors against this, don't just eyeball it.
- Every interactive element needs a visible `focus-visible` state (already required above) — don't rely on hover alone.
- Respect `prefers-reduced-motion` (see Animation System above).
- Use semantic HTML elements (`button`, `nav`, `header`, etc.) over generic `div`s with click handlers where possible.

## Deployment Workflow
- GitHub is synced to Vercel — every push to GitHub automatically deploys to Vercel.
- **Never commit or push to GitHub unless the user explicitly asks.**
- All changes are tested on localhost first. Only push when the user directly says to commit/push.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not skip responsive breakpoint checks
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color