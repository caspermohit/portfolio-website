# Work section: research and design decisions

Reviewed October 9, 2026. This review focuses on how portfolio projects are presented, navigated, and connected to real work, rather than ranking whole websites.

## Reference comparison

| Primary reference | Observed presentation | Useful principle | Application here |
| --- | --- | --- | --- |
| [Niccolò Miranda](https://www.niccolomiranda.com/) | Paper-like editorial layout, oversized display typography, image-led project strip, sideways navigation instructions, descriptive project copy | Give the work an unmistakable visual concept; put context alongside imagery | Editorial project spreads with blue serif statements, oversized numbering, and supporting descriptions |
| [Aristide Benoist](https://aristidebenoist.com/) | Browser review showed a strip of tall photographic slices; rendered page content includes project dates, type, role, client, and exploration links | Treat the selection as a gallery while preserving useful project information | Layered presentation, year/category metadata, direct live links, and source links |
| [Camille Mormal](https://camillemormal.com/) | Rendered content exposes named projects and a numbered 1–8 work selector; the first screenshot still showed the loader | A compact index can make a visual portfolio easy to navigate | Searchable, expandable index with visible titles, discipline, and year. No claim about the site's completed visual animation is inferred from the loader screenshot |
| [Dennis Snellenberg](https://dennissnellenberg.com/) | Short recent-work list includes project names and disciplines, with an explicit route to more work | Distinguish a curated selection from the full body of work | Three showcased projects followed by the complete 27-project archive |
| [Awwwards: Humbert & Poyet scroll portfolio](https://www.awwwards.com/inspiration/scroll-portfolio) | Search index identifies a clean, minimal, typography-led scroll portfolio; direct retrieval timed out | Secondary discovery reference for restrained scroll presentation | Informational reference only; specific animation mechanics were not assumed |

Miranda and Aristide were inspected through actual browser screenshots as well as rendered content. Aristide's initial screenshot was taken during loading; a second capture after the entrance completed showed the photographic selection. Reference images remain in temporary review files and are not republished as site assets.

## Chosen direction

A **project exhibition followed by an expandable index**.

The previous featured section repeated the same browser card at a modest size. Each new spread has a dedicated composition: real desktop and phone screenshots overlap against a quiet blue-tinted surface, with a typographic motif behind them. These are screenshots of the owner's projects, not invented product interfaces.

The featured works are Shade & Shine, E-commerce, and Entertainment Review. Their live pages were captured at 1440 × 1000 and 390 × 844. Project copy describes existing functions without inventing client outcomes, usage statistics, or performance gains.

Large screens with fine pointers receive three sticky spreads. As the following spread enters, the previous spread contracts and fades. Desktop previews rotate into position with scroll. Hover introduces a small movement in the desktop/phone composition. Keyboard focus brings the focused spread above the stack and restores its readability.

Phones, touch layouts, and reduced-motion settings use normal vertical flow. Reduced motion also removes preview rotation. Neither dragging nor hover is required to access project information or links.

## Archive interaction

The 27 projects are sorted by their recorded dates. The archive offers:

- Category buttons with counts and pressed states.
- Search across project names, descriptions, and technologies.
- Expandable project rows with descriptions, tools, and original external links.
- Real screenshots for the three featured websites.
- Deliberate typographic artwork for other entries, rather than fabricated screenshots.
- Search result announcements and an empty state with a reset action.

The original archive contained two elements with the `work` ID. The new index has its own `project-index` ID, while the main featured section retains `work` and its navigation link.

## Palette

The existing ivory, ink, and electric blue tokens remain authoritative. Different project colors were not introduced. Colors inside authentic screenshots belong to those external projects; their surrounding portfolio surfaces share the same palette.

## Validation

- `npm run build`: passed.
- Browser runtime errors: none observed.
- No document overflow at 320, 390, 768, 1024, and 1440 pixels.
- Archive: all 27 entries retained; code filter returns 5 entries.
- Search for Laravel returns the storefront and chat project.
- Unmatched search displays the reset action; reset restores all entries.
- Expand/collapse updates `aria-expanded`; hidden links leave the tab order.
- Reduced-motion mode uses relative project positioning rather than sticky stacking.
- Duplicate DOM IDs: none found.

The research is a design comparison, not evidence of award eligibility. No live deployment is included.
