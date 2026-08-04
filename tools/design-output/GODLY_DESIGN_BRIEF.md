# GODLY DESIGN BRIEF

_Generated 2026-08-04T14:41:41.514877+00:00_

**Reference:** [https://wodniack.dev/?ref=uiuxshowcase.com](https://wodniack.dev/?ref=uiuxshowcase.com)
**Target:** http://localhost:3000

> Adopt wodniack.dev design language, animation, and composition. Preserve Mohit Shah content + existing color system.

## 1. Color — KEEP (remap only)

| Token | Value |
| --- | --- |
| `--bg` | `#1a1a1a` |
| `--bg-deep` | `#0f0f0f` |
| `--ink` | `#ffffff` |
| `--brand` | `#3498db` |
| `--brand-bright` | `#61dafb` |
| `--surface` | `#2c2c2c` |
| `--accent-rgb` | `52, 152, 219` |

Wodniack red/cream are **reference only**. Never ship them.

## 2. Typography

- **Display:** Syne or Clash Display or unrestricted Bigger Display-class (Google: Syne)
- **Body:** Instrument Serif or Newsreader (Editorial New stand-in)
- **Mono UI:** IBM Plex Mono or JetBrains Mono (Fraktion Mono stand-in)
- **Hero copy:** `DIGITAL DESIGNER / & DEVELOPER`
- **Status line:** Available for freelance & product work → Contact

## 3. First viewport (hero budget)

- MS. brand mark (hero-level)
- One headline: DIGITAL DESIGNER & DEVELOPER
- One status sentence + Hire/Contact link
- One dominant motif: binary/canvas field using --brand tones (not red)

**Forbid:**
- Dual CTA button pair
- Stats / GitHub numbers
- Card grids
- Particle header competing with headline

## 4. Motion system

### Add
- **smooth_scroll** (`@studio-freight/lenis or lenis`) — Match wodniack inertia feel
- **hero_letter_stagger** (`GSAP SplitText-equivalent or custom spans + CSS`) — Signature first-impression motion
- **section_inview** (`IntersectionObserver → .is-in-view`) — Replace generic ScrollReveal with class-driven choreography
- **work_horizontal_scrub** (`GSAP ScrollTrigger or CSS scroll-snap + drag`) — Core wodniack work interaction
- **binary_field** (`Canvas 2D or DOM grid of 0/1 using accent color`) — Atmosphere motif remapped to blue accents

### Retire / demote
- Header AnimatedBackground 300-particle field (too noisy for brand-first hero)
- ScrollReveal as primary motion system
- Dual competing cursor + particles

### Keep
- Custom cursor (refine, don't remove) — quieter
- Skills pen-split parallax (unique to Mohit — signature secondary motion)

## 5. Work strip

- Transform: 6 icon cards with link lists → Horizontal media cells — one cell per project category or featured case study
- Cells: UX/UI Design, Website Development, Content Writing, Level Design, Mobile App Development, Illustration and Animation

## 6. Implementation order

1. Design tokens (styles.css / main.scss) — unify on canonical dark+blue set
2. Home.js / Home.css — brand-first hero + letter stagger + binary motif
3. Header.js — sparse mono nav, kill particle takeover
4. Work.js — horizontal strip from projects[]
5. About.js — typographic about; demote tabs
6. Skills.js — quieter layout; keep pen motif
7. Contact.js — oversized CTA typography
8. Motion shell — Lenis + inview observer + GSAP optional

## 7. Success criteria

- [ ] First viewport passes brand test: remove nav → still unmistakably Mohit Shah
- [ ] Colors match existing blue/dark tokens pixel-close
- [ ] All existing project links & bio facts preserved
- [ ] ≥3 intentional motions: intro stagger, section enter, work scrub
- [ ] Desktop + mobile both load; reduced-motion respected

## 8. Anti-patterns

- Purple-on-white / purple-indigo gradients
- Warm cream #F4F1EA + terracotta (wodniack surface is warm but we KEEP dark)
- Broadsheet hairline newspaper columns
- Rounded-full pill clusters & stat strips in hero
- Copying wodniack red literally
- Copying Antoine's biography / awards / project names

---

Next step after this brief: implement tokens → Home → Header → Work strip → motion shell.
