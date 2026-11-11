# Editorial reference theme

Current visual reference: https://moneyincheck.org/ and its Awwwards animated-footer feature. Supersedes the previous black/cream/mustard theme. ReferenceTheme.css is imported after the base palette and maps the existing aliases to pale gray #e9e9e9, black #000000, and deep green #006f59. The green is slightly darker than the reference for readable small text.

Uses existing Instrument Serif/Georgia rather than copying the reference site’s proprietary font files. Own project screenshots and print artwork form the hero collage and floating footer objects. All content remains Mohit's. No reference artwork, text, or scripts were copied into the portfolio.

GSAP matchMedia scopes scroll-linked translation/rotation to desktop, fine pointer, no reduced-motion. Mobile uses static collages. Existing project previews, search and forms are retained.

Hero and finale text now use an outlined text layer with an aria-hidden solid layer. ScrollTrigger scrubs solid opacity from 0 to 1 and reverses on scroll up. Reduced-motion uses solid text. Browser checked hero opacity 0 at scroll 0, 1 at scroll 772, and 0 after returning home. Production build passed.
