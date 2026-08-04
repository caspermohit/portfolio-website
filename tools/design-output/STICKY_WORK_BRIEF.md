# STICKY WORK BRIEF — handwritten pen board

_Generated 2026-08-04T15:28:57.167846+00:00_

> Redesign Work as a physical sticky-note corkboard with handwritten pen ink. Keep Mohit project data and site brand colors (#1a1a1a / #3498db / #61dafb).

## Concept — Desk sticky board

A dark desk surface scattered with pastel sticky notes, titles written in pen handwriting, existing pen assets as the writing tool motif.

**Why:** Ties Work to Mohit's unique pen-split Skills motif — craft / sketch / think — instead of generic tech cards or cinematic media tiles.

## Keep

- Projects: UX/UI Design, Website Development, Content Writing, Level Design, Mobile App Development, Illustration and Animation
- Links: All existing Behance / Netlify / WordPress URLs unchanged
- Brand tokens: `{'--bg': '#1a1a1a', '--bg-deep': '#0f0f0f', '--brand': '#3498db', '--brand-bright': '#61dafb'}`
- Pen assets: src/components/assets/img/wholepen.png, src/components/assets/img/penled.png

## Visual system

- Surface: Dark desk (#0f0f0f) with subtle cork/fiber grain — not flat purple
- Sticky paper:
  - `note_yellow` → `#F6E58D`
  - `note_sky` → `#A8D8F0`
  - `note_mint` → `#B8E0C8`
  - `note_blush` → `#F2C4B8`
  - `note_lilac` → `#D4C4F0`
  - `note_cream` → `#F0E6C8`
  - **Rule:** Pastels are PAPER only — ink uses brand blue + near-black, never terracotta/purple-theme
- Hand font: Caveat (Google) — titles + scribbled captions
- Meta font: IBM Plex Mono for tiny #ms-000n codes only

## Layout

- Desktop: Irregular masonry / scattered board — 3 columns with staggered offsets, not a rigid equal card grid. Notes overlap the desk atmosphere slightly.
- Mobile: Single column stack, still rotated ±3deg, drag optional
- Header: Handwritten 'Work' in Caveat large; mono subtitle 'pinned ideas → projects'; small ink doodle line

## Motion

- **enter:** Notes flutter in (opacity + rotate from larger angle → resting tilt), stagger 60–90ms
- **hover:** Note lifts, tape peels slightly, title ink darkens to --brand
- **pen:** Pen asset drifts slowly (CSS float) as if resting on the desk
- **reduced_motion:** No flutter — notes appear at rest angles only

## Implement

- Files: src/components/Work.js, src/components/Work.css, src/styles/fonts.css
- DOM: `section.work > .work__desk > header + .work__board > article.work__note × N + .work__pen`

## Anti-patterns

- Glassmorphism tech cards
- Equal 3-column bootstrap grid of identical notes
- Inter/Roboto on sticky titles
- Copying wodniack video strip for this mode
- Warm cream page background replacing dark site chrome
