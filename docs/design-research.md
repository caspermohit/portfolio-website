# Portfolio design research

Research date: October 9, 2026.

## Reference review

- [Dennis Snellenberg](https://dennissnellenberg.com/): strong personal identity, direct positioning, a short featured-work selection, and prominent contact routes. Applied: clear introduction, curated work before the complete archive, generous typography, and a distinct contact chapter.
- [Bruno Simon](https://bruno-simon.com/): a personal portfolio organized around an interactive 3D world, with keyboard, touch, and quality controls. Applied: a distinctive sculptural identity rendered with CSS transforms, while keeping project access direct. The sculpture is decorative and requires no interaction to access content.
- [Awwwards scroll inspiration](https://www.awwwards.com/inspiration/scroll-portfolio) and [interactive website collection](https://www.awwwards.com/websites/web-interactive/?page=5): discovery references for scroll-led presentation. The inspiration page was indexed in search but direct retrieval timed out; no individual interaction claims are inferred from that page.
- [Webby Awards: Bruno Simon](https://winners.webbyawards.com/2020/websites-and-mobile-sites/features-design/best-use-of-animation-or-motion-graphics/128535/bruno-simon-portfolio): confirms historical recognition in the animation/motion category, rather than implying a current ranking.
- [Cassie Evans](https://cassie.codes/): checked the current site; it now contains a retirement message rather than its former animated portfolio. Excluded as a current design reference.
- [Anton & Irene](https://antonandirene.com/?lang=en): retrieved through search after the www hostname failed. The studio explicitly describes pairing playful imagery with clean typography and striking colors. Applied: a restrained layout with an expressive graphic, rather than making every section visually busy.
- Rauno and Sébastien Hue were unavailable to the research tool. No claims about their current designs are used.

## Implementation decisions

1. Warm ivory and blue contrast, large Outfit typography, and a two-line personal hero create an editorial identity.
2. An animated blue sculpture makes the homepage recognizable without adding a large WebGL runtime.
3. Real screenshots captured from the owner's public live projects replace generic stock imagery. Capture date: October 9, 2026. Screenshots are static previews; links open the live work.
4. On large screens with fine pointers, the selected-work title pins beside the gallery. Project previews grow into view, and an about statement gains opacity with scroll.
5. On phones and reduced-motion configurations, content remains in normal document flow. Ambient animations are disabled for reduced motion.
6. The full project catalog retains category filters and original links. Experience, education, creative work, the contact form, and the client guide remain available.

## Technical source

[GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) supports scrubbed timelines, pinning, responsive configuration, and refresh behavior. Animations use matchMedia and scoped cleanup for React's mount/unmount lifecycle.

## Scope

This is a local implementation, not a deployment or a claim of award status. The research is a focused reference review, not an exhaustive ranking of every portfolio on the web.

## Validation

- Production build: `npm run build` passed.
- Chromium browser: no JavaScript runtime errors on the portfolio and client-guide routes.
- Portfolio layout: no document overflow at 320, 390, 768, 1024, and 1440 pixels.
- Client-guide layout: no document overflow at 320, 768, and 1440 pixels.
- Verified archive filters: 5 repository entries, 27 total entries.
- Verified mobile navigation closes on selection and Escape.
- Verified desktop pinning and local project-image loading.
- Verified reduced-motion ambient animation disabled.
- Verified route navigation resets scroll and contact form rejects empty required fields.
- Email delivery was not exercised; no test messages were sent.
