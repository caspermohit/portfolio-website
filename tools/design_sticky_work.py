#!/usr/bin/env python3
"""
Sticky-note Work board designer
================================
Produces a godly design brief for Mohit's Work section as a handwritten
sticky-note board (pen craft), while KEEPING portfolio brand blues + project data.

Usage:
  python3 tools/design_sticky_work.py

Outputs:
  tools/design-output/STICKY_WORK_BRIEF.md
  tools/design-output/sticky_work_blueprint.json
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

OUT = Path(__file__).resolve().parent / "design-output"

BLUEPRINT = {
    "meta": {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "directive": (
            "Redesign Work as a physical sticky-note corkboard with handwritten pen ink. "
            "Keep Mohit project data and site brand colors (#1a1a1a / #3498db / #61dafb)."
        ),
    },
    "concept": {
        "name": "Desk sticky board",
        "one_liner": (
            "A dark desk surface scattered with pastel sticky notes, "
            "titles written in pen handwriting, existing pen assets as the writing tool motif."
        ),
        "why": (
            "Ties Work to Mohit's unique pen-split Skills motif — craft / sketch / think — "
            "instead of generic tech cards or cinematic media tiles."
        ),
    },
    "keep": {
        "projects": [
            "UX/UI Design",
            "Website Development",
            "Content Writing",
            "Level Design",
            "Mobile App Development",
            "Illustration and Animation",
        ],
        "links": "All existing Behance / Netlify / WordPress URLs unchanged",
        "site_colors": {
            "--bg": "#1a1a1a",
            "--bg-deep": "#0f0f0f",
            "--brand": "#3498db",
            "--brand-bright": "#61dafb",
        },
        "assets": [
            "src/components/assets/img/wholepen.png",
            "src/components/assets/img/penled.png",
        ],
    },
    "visual_system": {
        "surface": "Dark desk (#0f0f0f) with subtle cork/fiber grain — not flat purple",
        "sticky_palette": {
            "note_yellow": "#F6E58D",
            "note_sky": "#A8D8F0",
            "note_mint": "#B8E0C8",
            "note_blush": "#F2C4B8",
            "note_lilac": "#D4C4F0",
            "note_cream": "#F0E6C8",
            "rule": "Pastels are PAPER only — ink uses brand blue + near-black, never terracotta/purple-theme",
        },
        "typography": {
            "hand": "Caveat (Google) — titles + scribbled captions",
            "ink_body": "Instrument Serif italic for short descriptions (optional) OR Caveat at smaller size",
            "meta": "IBM Plex Mono for tiny #ms-000n codes only",
        },
        "chrome": [
            "Slight random rotate per note (−6deg…6deg)",
            "Soft drop shadow + lifted hover (rotate settles toward 0, translateY −8px)",
            "Washi-tape strip or pin dot at top of each note",
            "Hand-drawn underline on hover for links (SVG stroke or border-image feel)",
            "Floating wholepen.png / penled.png as section decoration (absolute, parallax light)",
        ],
    },
    "layout": {
        "desktop": (
            "Irregular masonry / scattered board — 3 columns with staggered offsets, "
            "not a rigid equal card grid. Notes overlap the desk atmosphere slightly."
        ),
        "mobile": "Single column stack, still rotated ±3deg, drag optional",
        "section_header": (
            "Handwritten 'Work' in Caveat large; mono subtitle 'pinned ideas → projects'; "
            "small ink doodle line"
        ),
    },
    "motion": {
        "enter": "Notes flutter in (opacity + rotate from larger angle → resting tilt), stagger 60–90ms",
        "hover": "Note lifts, tape peels slightly, title ink darkens to --brand",
        "pen": "Pen asset drifts slowly (CSS float) as if resting on the desk",
        "reduced_motion": "No flutter — notes appear at rest angles only",
    },
    "implementation": {
        "files": ["src/components/Work.js", "src/components/Work.css", "src/styles/fonts.css"],
        "structure": (
            "section.work > .work__desk > header + .work__board > article.work__note × N + .work__pen"
        ),
        "note_fields": ["code", "title (hand)", "description", "technologies", "links[]"],
        "a11y": "Preserve semantic list of links; don't rely on color alone; respect reduced-motion",
    },
    "anti_patterns": [
        "Glassmorphism tech cards",
        "Equal 3-column bootstrap grid of identical notes",
        "Inter/Roboto on sticky titles",
        "Copying wodniack video strip for this mode",
        "Warm cream page background replacing dark site chrome",
    ],
}


def render_md(bp: dict) -> str:
    v = bp["visual_system"]
    lines = [
        "# STICKY WORK BRIEF — handwritten pen board",
        "",
        f"_Generated {bp['meta']['generated_at']}_",
        "",
        f"> {bp['meta']['directive']}",
        "",
        f"## Concept — {bp['concept']['name']}",
        "",
        bp["concept"]["one_liner"],
        "",
        f"**Why:** {bp['concept']['why']}",
        "",
        "## Keep",
        "",
        f"- Projects: {', '.join(bp['keep']['projects'])}",
        f"- Links: {bp['keep']['links']}",
        f"- Brand tokens: `{bp['keep']['site_colors']}`",
        f"- Pen assets: {', '.join(bp['keep']['assets'])}",
        "",
        "## Visual system",
        "",
        f"- Surface: {v['surface']}",
        "- Sticky paper:",
    ]
    for k, val in v["sticky_palette"].items():
        if k == "rule":
            lines.append(f"  - **Rule:** {val}")
        else:
            lines.append(f"  - `{k}` → `{val}`")
    lines += [
        f"- Hand font: {v['typography']['hand']}",
        f"- Meta font: {v['typography']['meta']}",
        "",
        "## Layout",
        "",
        f"- Desktop: {bp['layout']['desktop']}",
        f"- Mobile: {bp['layout']['mobile']}",
        f"- Header: {bp['layout']['section_header']}",
        "",
        "## Motion",
        "",
    ]
    for k, val in bp["motion"].items():
        lines.append(f"- **{k}:** {val}")
    lines += [
        "",
        "## Implement",
        "",
        f"- Files: {', '.join(bp['implementation']['files'])}",
        f"- DOM: `{bp['implementation']['structure']}`",
        "",
        "## Anti-patterns",
        "",
    ]
    for a in bp["anti_patterns"]:
        lines.append(f"- {a}")
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    json_path = OUT / "sticky_work_blueprint.json"
    md_path = OUT / "STICKY_WORK_BRIEF.md"
    json_path.write_text(json.dumps(BLUEPRINT, indent=2), encoding="utf-8")
    md = render_md(BLUEPRINT)
    md_path.write_text(md, encoding="utf-8")
    print(md)
    print(f"\n✓ Wrote {json_path}")
    print(f"✓ Wrote {md_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
