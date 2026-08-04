#!/usr/bin/env python3
"""
Godly Design Diff — portfolio × wodniack.dev
=============================================
Fetches / inspects both sites, extracts design signals (color, type, layout,
motion, IA), then emits an implementation blueprint that:

  • STEALS  structure, motion language, and composition from wodniack.dev
  • KEEPS   Mohit's content, brand colors, and personal data

Usage:
  python3 tools/analyze_design.py
  python3 tools/analyze_design.py --local http://localhost:3000
  python3 tools/analyze_design.py --json-only

Outputs:
  tools/design-output/design_blueprint.json
  tools/design-output/GODLY_DESIGN_BRIEF.md
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Any


# ---------------------------------------------------------------------------
# Known deep-analysis of https://wodniack.dev (live CDP inspection, Aug 2026)
# Network fetch alone cannot see computed styles / canvas / video gallery —
# this block is the ground-truth complement to live HTML scraping.
# ---------------------------------------------------------------------------

WODNIACK_DEEP = {
    "url": "https://wodniack.dev/",
    "stack": {
        "framework": "Astro",
        "smooth_scroll": "Lenis (html.lenis)",
        "motion": "Custom JS + CSS (GSAP-class scroll choreography)",
        "media": "34 autoplay muted work videos + 2 canvas layers",
        "contrast_toggle": True,
    },
    "color": {
        "primary": "#f40c3f",
        "secondary": "#160000",
        "shadow": "#540000",
        "surface": "#fff0eb",
        "notes": (
            "Bold monochrome-accent system: one saturated brand field, "
            "near-black ink, warm off-white surface. Contrast toggle swaps "
            "field ↔ ink. NOT a purple/cream AI cliché — high-chroma red."
        ),
    },
    "typography": {
        "display": '"Bigger Display", sans-serif',
        "body": '"Editorial New", serif',
        "mono_ui": '"Fraktion Mono", monospace',
        "hero": {
            "text": "CREATIVE DEVELOPER",
            "size_vw": "~clamp(4rem, 18vw, 16rem)",
            "weight": 700,
            "transform": "uppercase",
            "tracking": "-0.025em",
            "line_height": "~0.8",
            "split": "letter / word stagger on load",
        },
        "nav": {
            "size": "14px",
            "transform": "uppercase",
            "tracking": "0.05em",
            "family": "mono",
        },
    },
    "layout": {
        "ia": ["sticky brand + About/Work/Contact", "hero", "about + awards", "horizontal WORK strip", "personal archive / my-way", "CTA / contact"],
        "hero_budget": (
            "Brand (name), one headline (Creative Developer), one status line "
            "(available → Hire me), one dominant visual motif (QR + generative "
            "binary field). No stats, cards, or dual CTAs in first viewport."
        ),
        "work": (
            "Horizontal scroll / marquee of large media cells — each cell is a "
            "project with looping video preview, project code (#xxxx-000n/34), "
            "and title. Full-bleed edge-to-edge, not a card grid."
        ),
        "about": (
            "Two short paragraphs + awards list as typographic columns — "
            "no icon tabs, no GitHub stat cards."
        ),
        "decoration": [
            "Binary 0/1 generative fields behind/beside sections",
            "QR code as brand object",
            "Star / SVG ornaments",
            "Section-out-of-view classes driving enter animations",
        ],
    },
    "motion": {
        "scroll": "Lenis inertia scroll (html.is-loaded, is-scroll-blocked on intro)",
        "section_enter": "is-out-of-view → in-view class flip (translate + opacity)",
        "hero": "Letter-split stagger + binary field shimmer",
        "work": "Horizontal scrub / drag + video autoplay on visibility",
        "cta": "Oversized typographic GO / LET'S ROCK lettering animation",
        "principles": [
            "Motion creates hierarchy, not noise",
            "2–4 signature motions max (intro, section enter, work scrub, CTA)",
            "Respect prefers-reduced-motion",
        ],
    },
    "composition_rules": [
        "One composition per viewport — not a dashboard",
        "Brand is a hero-level signal (name + monogram)",
        "No cards in hero; cards only when interaction requires a container",
        "Full-bleed media plane for work, not inset rounded cards",
        "Expressive custom fonts — never Inter/Roboto/system default",
        "Atmosphere via generative motif (binary/QR/canvas), not flat fill alone",
    ],
}


# Portfolio ground truth from src/ CSS + components (authoritative for KEEP)
PORTFOLIO_KEEP = {
    "brand": {
        "name": "Mohit Shah",
        "monogram": "MS.",
        "role": "Digital Designer & Developer",
        "tagline": (
            "Crafting innovative digital experiences through design and development. "
            "Specializing in UI/UX design, web development, and creative solutions."
        ),
        "github": "caspermohit",
        "email_form": True,
    },
    "colors_canonical": {
        # Prefer dark portfolio system from styles.css + main.scss
        "background": "#1a1a1a",
        "background_deep": "#0f0f0f",
        "text": "#ffffff",
        "primary": "#4a90e2",
        "accent": "#3498db",
        "accent_bright": "#61dafb",
        "secondary_purple": "#a742e6",
        "surface": "#2c2c2c",
        "accent_rgb": "52, 152, 219",
        "rule": "NEVER adopt wodniack red (#f40c3f) or cream (#fff0eb). Remap every pattern onto these tokens.",
    },
    "sections": ["Home", "About", "Skills", "Work", "Contact", "Client Guide"],
    "work_categories": [
        "UX/UI Design",
        "Website Development",
        "Content Writing",
        "Level Design",
        "Mobile App Development",
        "Illustration and Animation",
    ],
    "current_stack": [
        "React 18 + react-scripts",
        "react-router-dom",
        "ScrollReveal",
        "react-scroll-parallax",
        "custom Cursor + AnimatedBackground (particles)",
        "Font Awesome / react-icons",
        "Sass",
    ],
    "pain_points": [
        "Hero is centered text + dual CTAs + soft radial gradient — dashboard-adjacent, weak brand plane",
        "Work is a 6-card icon grid — opposite of wodniack full-bleed media strip",
        "About uses icon tabs + GitHub stat cards — dense, card-heavy",
        "Fonts lean Avenir/Nunito/Roboto — generic vs expressive display+mono pairing",
        "Motion is mostly ScrollReveal fade-ups — no signature intro / horizontal scrub / letter stagger",
        "Custom cursor + particle header compete with content hierarchy",
    ],
}


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = Path(__file__).resolve().parent / "design-output"


# ---------------------------------------------------------------------------
# Lightweight HTML / CSS extractors
# ---------------------------------------------------------------------------

class SignalHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title = ""
        self.headings: list[dict[str, str]] = []
        self.links: list[str] = []
        self.scripts: list[str] = []
        self.stylesheets: list[str] = []
        self.meta: dict[str, str] = {}
        self._capture_title = False
        self._capture_heading: str | None = None
        self._heading_buf: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        ad = {k: (v or "") for k, v in attrs}
        if tag == "title":
            self._capture_title = True
        if tag in {"h1", "h2", "h3"}:
            self._capture_heading = tag
            self._heading_buf = []
        if tag == "a" and ad.get("href"):
            self.links.append(ad["href"])
        if tag == "script" and ad.get("src"):
            self.scripts.append(ad["src"])
        if tag == "link" and "stylesheet" in ad.get("rel", "") and ad.get("href"):
            self.stylesheets.append(ad["href"])
        if tag == "meta":
            key = ad.get("name") or ad.get("property") or ""
            if key and ad.get("content"):
                self.meta[key] = ad["content"]

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._capture_title = False
        if tag in {"h1", "h2", "h3"} and self._capture_heading == tag:
            text = re.sub(r"\s+", " ", "".join(self._heading_buf)).strip()
            if text:
                self.headings.append({"level": tag, "text": text[:120]})
            self._capture_heading = None

    def handle_data(self, data: str) -> None:
        if self._capture_title:
            self.title += data.strip()
        if self._capture_heading:
            self._heading_buf.append(data)


CSS_VAR_RE = re.compile(r"--([a-zA-Z0-9-_]+)\s*:\s*([^;]+);")
HEX_RE = re.compile(r"#(?:[0-9a-fA-F]{3,8})\b")
RGB_RE = re.compile(r"rgba?\([^)]+\)")
FONT_FAMILY_RE = re.compile(r"font-family\s*:\s*([^;}{]+)", re.I)


def fetch_url(url: str, timeout: float = 20.0) -> str | None:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (DesignAnalyzer/1.0; +local portfolio tool)",
            "Accept": "text/html,application/xhtml+xml",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            charset = resp.headers.get_content_charset() or "utf-8"
            return resp.read().decode(charset, errors="replace")
    except (urllib.error.URLError, TimeoutError, ValueError) as exc:
        print(f"  ⚠  fetch failed for {url}: {exc}", file=sys.stderr)
        return None


def parse_html(html: str) -> dict[str, Any]:
    parser = SignalHTMLParser()
    try:
        parser.feed(html)
    except Exception as exc:  # noqa: BLE001 — best-effort scrape
        print(f"  ⚠  HTML parse issue: {exc}", file=sys.stderr)
    return {
        "title": parser.title,
        "headings": parser.headings[:30],
        "nav_like_links": [l for l in parser.links if l.startswith("#") or l.startswith("/")][:40],
        "external_scripts": parser.scripts[:20],
        "stylesheets": parser.stylesheets[:20],
        "meta": parser.meta,
        "html_bytes": len(html.encode("utf-8")),
        "video_tags": len(re.findall(r"<video\b", html, re.I)),
        "canvas_tags": len(re.findall(r"<canvas\b", html, re.I)),
        "mentions_lenis": "lenis" in html.lower(),
        "mentions_gsap": "gsap" in html.lower(),
    }


def extract_css_tokens_from_text(css: str) -> dict[str, Any]:
    vars_found = {f"--{k}": v.strip() for k, v in CSS_VAR_RE.findall(css)}
    hexes = sorted(set(HEX_RE.findall(css)))
    fonts = sorted({f.strip().strip("'\"") for f in FONT_FAMILY_RE.findall(css)})
    return {
        "css_variables": vars_found,
        "hex_colors": hexes[:40],
        "font_families": fonts[:20],
    }


def scan_local_css(src_dir: Path) -> dict[str, Any]:
    files = list(src_dir.rglob("*.css")) + list(src_dir.rglob("*.scss"))
    merged_vars: dict[str, str] = {}
    all_hex: set[str] = set()
    all_fonts: set[str] = set()
    per_file: dict[str, Any] = {}
    for path in files:
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        tokens = extract_css_tokens_from_text(text)
        rel = str(path.relative_to(src_dir))
        per_file[rel] = {
            "var_count": len(tokens["css_variables"]),
            "hex_sample": tokens["hex_colors"][:12],
        }
        merged_vars.update(tokens["css_variables"])
        all_hex.update(tokens["hex_colors"])
        all_fonts.update(tokens["font_families"])
    return {
        "files_scanned": len(files),
        "merged_css_variables": merged_vars,
        "all_hex_colors": sorted(all_hex),
        "all_font_families": sorted(all_fonts),
        "per_file": per_file,
    }


@dataclass
class SiteReport:
    label: str
    url: str
    live: dict[str, Any] = field(default_factory=dict)
    notes: list[str] = field(default_factory=list)


def build_blueprint(ref: SiteReport, local: SiteReport, local_css: dict[str, Any]) -> dict[str, Any]:
    """Map wodniack patterns → portfolio tokens. This is the godly output."""

    colors = PORTFOLIO_KEEP["colors_canonical"]

    return {
        "meta": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "reference": ref.url,
            "target": local.url,
            "directive": (
                "Adopt wodniack.dev design language, animation, and composition. "
                "Preserve Mohit Shah content + existing color system."
            ),
        },
        "color_remap": {
            "wodniack_primary_#f40c3f": colors["accent"],
            "wodniack_secondary_#160000": colors["background_deep"],
            "wodniack_surface_#fff0eb": colors["background"],
            "wodniack_ink_on_field": colors["text"],
            "highlight_secondary": colors["accent_bright"],
            "optional_accent_spark": colors["secondary_purple"],
            "css_tokens_to_author": {
                "--bg": colors["background"],
                "--bg-deep": colors["background_deep"],
                "--ink": colors["text"],
                "--brand": colors["accent"],
                "--brand-bright": colors["accent_bright"],
                "--surface": colors["surface"],
                "--accent-rgb": colors["accent_rgb"],
            },
        },
        "typography_plan": {
            "keep_content_voice": True,
            "replace_generic_stack": True,
            "recommended_pairing": {
                "display": "Syne or Clash Display or unrestricted Bigger Display-class (Google: Syne)",
                "body": "Instrument Serif or Newsreader (Editorial New stand-in)",
                "mono_ui": "IBM Plex Mono or JetBrains Mono (Fraktion Mono stand-in)",
            },
            "hero": {
                "copy": "DIGITAL DESIGNER\n& DEVELOPER",
                "brand_above": "Mohit Shah / MS.",
                "treatment": "uppercase, huge clamp, tight leading, letter-stagger intro",
                "supporting_line": "Available for freelance & product work → Contact",
            },
            "nav": {
                "items": ["About", "Work", "Skills", "Contact"],
                "style": "uppercase mono 14px, tracking 0.05em, sparse — drop Client Guide to footer or secondary",
            },
        },
        "information_architecture": {
            "first_viewport": [
                "MS. brand mark (hero-level)",
                "One headline: DIGITAL DESIGNER & DEVELOPER",
                "One status sentence + Hire/Contact link",
                "One dominant motif: binary/canvas field using --brand tones (not red)",
            ],
            "forbid_in_hero": [
                "Dual CTA button pair",
                "Stats / GitHub numbers",
                "Card grids",
                "Particle header competing with headline",
            ],
            "sections_order": [
                {"id": "home", "job": "Brand + role as one composition"},
                {"id": "about", "job": "Two paragraphs of biography — typographic, no tabs"},
                {"id": "experience", "job": "Resume as quiet list (optional collapse from current tabs)"},
                {"id": "work", "job": "Horizontal full-bleed project media strip"},
                {"id": "skills", "job": "Mono chip rows or single column — not card tiles"},
                {"id": "contact", "job": "Oversized typographic CTA + minimal form"},
            ],
            "data_sources": {
                "about_copy": "src/components/About.js",
                "work_projects": "src/components/Work.js projects[]",
                "skills": "src/components/Skills.js skillCategories",
                "contact": "src/components/Contact.js",
            },
        },
        "motion_plan": {
            "add": [
                {
                    "name": "smooth_scroll",
                    "lib": "@studio-freight/lenis or lenis",
                    "why": "Match wodniack inertia feel",
                },
                {
                    "name": "hero_letter_stagger",
                    "lib": "GSAP SplitText-equivalent or custom spans + CSS",
                    "why": "Signature first-impression motion",
                },
                {
                    "name": "section_inview",
                    "lib": "IntersectionObserver → .is-in-view",
                    "why": "Replace generic ScrollReveal with class-driven choreography",
                },
                {
                    "name": "work_horizontal_scrub",
                    "lib": "GSAP ScrollTrigger or CSS scroll-snap + drag",
                    "why": "Core wodniack work interaction",
                },
                {
                    "name": "binary_field",
                    "lib": "Canvas 2D or DOM grid of 0/1 using accent color",
                    "why": "Atmosphere motif remapped to blue accents",
                },
            ],
            "retire_or_demote": [
                "Header AnimatedBackground 300-particle field (too noisy for brand-first hero)",
                "ScrollReveal as primary motion system",
                "Dual competing cursor + particles",
            ],
            "keep": [
                "Custom cursor (refine, don't remove) — quieter",
                "Skills pen-split parallax (unique to Mohit — signature secondary motion)",
            ],
            "reduced_motion": "Gate all stagger / scrub / lenis behind prefers-reduced-motion",
        },
        "work_strip_spec": {
            "from": "6 icon cards with link lists",
            "to": "Horizontal media cells — one cell per project category or featured case study",
            "cell": {
                "media": "screenshot / looping mp4 / static art (use existing Behance & Netlify URLs)",
                "label": "Title + tech mono caption",
                "code_motif": optional_project_code("MS"),
                "chrome": "No rounded card chrome; edge-to-edge media with ink overlay on hover",
            },
            "projects_map": PORTFOLIO_KEEP["work_categories"],
        },
        "component_rewrite_order": [
            "1. Design tokens (styles.css / main.scss) — unify on canonical dark+blue set",
            "2. Home.js / Home.css — brand-first hero + letter stagger + binary motif",
            "3. Header.js — sparse mono nav, kill particle takeover",
            "4. Work.js — horizontal strip from projects[]",
            "5. About.js — typographic about; demote tabs",
            "6. Skills.js — quieter layout; keep pen motif",
            "7. Contact.js — oversized CTA typography",
            "8. Motion shell — Lenis + inview observer + GSAP optional",
        ],
        "anti_patterns_to_avoid": [
            "Purple-on-white / purple-indigo gradients",
            "Warm cream #F4F1EA + terracotta (wodniack surface is warm but we KEEP dark)",
            "Broadsheet hairline newspaper columns",
            "Rounded-full pill clusters & stat strips in hero",
            "Copying wodniack red literally",
            "Copying Antoine's biography / awards / project names",
        ],
        "success_criteria": [
            "First viewport passes brand test: remove nav → still unmistakably Mohit Shah",
            "Colors match existing blue/dark tokens pixel-close",
            "All existing project links & bio facts preserved",
            "≥3 intentional motions: intro stagger, section enter, work scrub",
            "Desktop + mobile both load; reduced-motion respected",
        ],
        "evidence": {
            "reference_live": ref.live,
            "local_live": local.live,
            "local_css_scan": {
                "files_scanned": local_css.get("files_scanned"),
                "key_vars": {
                    k: local_css.get("merged_css_variables", {}).get(k)
                    for k in [
                        "--primary-color",
                        "--accent-color",
                        "--background-color",
                        "--text-color",
                        "--first-color",
                        "--body-font",
                        "--heading-font",
                    ]
                    if local_css.get("merged_css_variables", {}).get(k)
                },
            },
            "wodniack_deep": WODNIACK_DEEP,
            "portfolio_keep": PORTFOLIO_KEEP,
        },
    }


def optional_project_code(prefix: str) -> str:
    return f"#{prefix.lower()}-000n / total — decorative project index like wodniack #3vva-0000/34"


def render_markdown(blueprint: dict[str, Any]) -> str:
    c = blueprint["color_remap"]["css_tokens_to_author"]
    typo = blueprint["typography_plan"]
    motion = blueprint["motion_plan"]
    lines = [
        "# GODLY DESIGN BRIEF",
        "",
        f"_Generated {blueprint['meta']['generated_at']}_",
        "",
        f"**Reference:** [{blueprint['meta']['reference']}]({blueprint['meta']['reference']})",
        f"**Target:** {blueprint['meta']['target']}",
        "",
        f"> {blueprint['meta']['directive']}",
        "",
        "## 1. Color — KEEP (remap only)",
        "",
        "| Token | Value |",
        "| --- | --- |",
    ]
    for k, v in c.items():
        lines.append(f"| `{k}` | `{v}` |")
    lines += [
        "",
        "Wodniack red/cream are **reference only**. Never ship them.",
        "",
        "## 2. Typography",
        "",
        f"- **Display:** {typo['recommended_pairing']['display']}",
        f"- **Body:** {typo['recommended_pairing']['body']}",
        f"- **Mono UI:** {typo['recommended_pairing']['mono_ui']}",
        f"- **Hero copy:** `{typo['hero']['copy'].replace(chr(10), ' / ')}`",
        f"- **Status line:** {typo['hero']['supporting_line']}",
        "",
        "## 3. First viewport (hero budget)",
        "",
    ]
    for item in blueprint["information_architecture"]["first_viewport"]:
        lines.append(f"- {item}")
    lines += ["", "**Forbid:**"]
    for item in blueprint["information_architecture"]["forbid_in_hero"]:
        lines.append(f"- {item}")
    lines += ["", "## 4. Motion system", "", "### Add"]
    for m in motion["add"]:
        lines.append(f"- **{m['name']}** (`{m['lib']}`) — {m['why']}")
    lines += ["", "### Retire / demote"]
    for m in motion["retire_or_demote"]:
        lines.append(f"- {m}")
    lines += ["", "### Keep"]
    for m in motion["keep"]:
        lines.append(f"- {m}")
    lines += [
        "",
        "## 5. Work strip",
        "",
        f"- Transform: {blueprint['work_strip_spec']['from']} → {blueprint['work_strip_spec']['to']}",
        f"- Cells: {', '.join(blueprint['work_strip_spec']['projects_map'])}",
        "",
        "## 6. Implementation order",
        "",
    ]
    for step in blueprint["component_rewrite_order"]:
        lines.append(f"{step}")
    lines += [
        "",
        "## 7. Success criteria",
        "",
    ]
    for s in blueprint["success_criteria"]:
        lines.append(f"- [ ] {s}")
    lines += [
        "",
        "## 8. Anti-patterns",
        "",
    ]
    for a in blueprint["anti_patterns_to_avoid"]:
        lines.append(f"- {a}")
    lines += [
        "",
        "---",
        "",
        "Next step after this brief: implement tokens → Home → Header → Work strip → motion shell.",
        "",
    ]
    return "\n".join(lines)


def print_banner(blueprint: dict[str, Any]) -> None:
    c = blueprint["color_remap"]["css_tokens_to_author"]
    print()
    print("═" * 72)
    print("  GODLY DESIGN OUTPUT — wodniack patterns × Mohit colors/data")
    print("═" * 72)
    print(f"  Brand field → {c['--bg']}  ink → {c['--ink']}  accent → {c['--brand']}")
    print(f"  Hero       → {blueprint['typography_plan']['hero']['copy'].replace(chr(10), ' / ')}")
    print(f"  Motions    → {len(blueprint['motion_plan']['add'])} to add, "
          f"{len(blueprint['motion_plan']['retire_or_demote'])} to demote")
    print(f"  Rewrite    → {len(blueprint['component_rewrite_order'])} ordered steps")
    print("═" * 72)
    print()


def main() -> int:
    parser = argparse.ArgumentParser(description="Analyze wodniack.dev vs portfolio; emit design blueprint.")
    parser.add_argument(
        "--reference",
        default="https://wodniack.dev/?ref=uiuxshowcase.com",
        help="Reference portfolio URL",
    )
    parser.add_argument(
        "--local",
        default="http://localhost:3000",
        help="Local portfolio URL (optional live fetch)",
    )
    parser.add_argument("--json-only", action="store_true", help="Skip markdown brief")
    parser.add_argument(
        "--out",
        type=Path,
        default=OUT_DIR,
        help="Output directory",
    )
    args = parser.parse_args()

    out: Path = args.out
    out.mkdir(parents=True, exist_ok=True)

    print("→ Fetching reference site…")
    ref_html = fetch_url(args.reference)
    ref = SiteReport(label="wodniack", url=args.reference)
    if ref_html:
        ref.live = parse_html(ref_html)
        ref.notes.append("Live HTML fetched successfully")
    else:
        ref.notes.append("Live fetch failed — using WODNIACK_DEEP only")

    print("→ Fetching local site (if running)…")
    local_html = fetch_url(args.local)
    local = SiteReport(label="portfolio", url=args.local)
    if local_html:
        local.live = parse_html(local_html)
        local.notes.append("Local dev server responded")
    else:
        local.notes.append("Local server offline — blueprint uses codebase scan + PORTFOLIO_KEEP")

    print("→ Scanning local CSS/SCSS tokens…")
    local_css = scan_local_css(ROOT / "src")

    print("→ Building godly blueprint…")
    blueprint = build_blueprint(ref, local, local_css)
    blueprint["fetch_notes"] = {
        "reference": ref.notes,
        "local": local.notes,
    }

    json_path = out / "design_blueprint.json"
    json_path.write_text(json.dumps(blueprint, indent=2), encoding="utf-8")
    print(f"✓ Wrote {json_path.relative_to(ROOT)}")

    if not args.json_only:
        md_path = out / "GODLY_DESIGN_BRIEF.md"
        md_path.write_text(render_markdown(blueprint), encoding="utf-8")
        print(f"✓ Wrote {md_path.relative_to(ROOT)}")

    print_banner(blueprint)
    print(render_markdown(blueprint) if not args.json_only else json.dumps({
        "color_remap": blueprint["color_remap"],
        "motion_plan": blueprint["motion_plan"],
        "component_rewrite_order": blueprint["component_rewrite_order"],
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
