#!/usr/bin/env python3
"""Generate public/images/architecture.svg for the homepage architecture diagram."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/images/architecture.svg"

FG = "#f8f8f2"
FG_SOFT = "#cfcfc7"
ACCENT = "#ff79c6"
BORDER = "#44475a"
BG = "#282a36"
CARD = "#343746"
FONT = "Satoshi, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"


def text(x, y, value, size=18, weight=500, fill=FG, anchor="middle"):
    return (
        f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" '
        f'font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">{value}</text>'
    )


def rect(x, y, w, h, r=18, fill=CARD, stroke=BORDER, sw=2):
    return (
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" ry="{r}" '
        f'fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
    )


def pill(x, y, w, value, fill="#f7eef5", fg=FG):
    return (
        f'<rect x="{x}" y="{y}" width="{w}" height="34" rx="17" fill="{fill}"/>'
        + text(x + w / 2, y + 22, value, 14, 650, fg)
    )


def mark(x, y, scale=1):
    return f"""
<g transform="translate({x} {y}) scale({scale})">
  <rect x="0.8" y="0.8" width="54.4" height="54.4" rx="14.5" fill="#1B1C22" stroke="#2F323B" stroke-width="1.6"/>
  <rect x="4" y="4" width="48" height="48" rx="12.5" fill="none" stroke="#DADCE3" stroke-width="2.2" opacity="0.75"/>
  <rect x="7" y="7" width="42" height="42" rx="10.5" fill="none" stroke="#6F7480" stroke-width="1.2" opacity="0.75"/>
  <path d="M37 15H25C16.7 15 10 21.7 10 30C10 38.3 16.7 45 25 45H37" stroke="#E4E5EA" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M25 30H42C47 30 51 34 51 39C51 44 47 48 42 48H32" stroke="#E4E5EA" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M41 48L50 55" stroke="#E4E5EA" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>"""


def arrow(x1, y1, x2, y2):
    return (
        f'<path d="M{x1} {y1} C {(x1 + x2) / 2} {y1}, {(x1 + x2) / 2} {y2}, {x2} {y2}" '
        f'stroke="{ACCENT}" stroke-width="2.4" fill="none" stroke-linecap="round" '
        'stroke-dasharray="1 8"/>'
    )


def card(x, y, title, lines, w=220):
    out = [rect(x, y, w, 118, 20)]
    out.append(text(x + w / 2, y + 35, title, 20, 750))
    for i, line in enumerate(lines):
        out.append(text(x + w / 2, y + 66 + i * 24, line, 15, 500, FG_SOFT))
    return "".join(out)


svg = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 545" font-family="{FONT}">',
    f'<rect width="1200" height="545" rx="28" fill="{BG}"/>',
    text(600, 58, "Goalrail Architecture", 34, 780),
    text(
        600,
        88,
        "One control layer for agents, policies, shared history, and every client surface.",
        16,
        500,
        FG_SOFT,
    ),
    card(70, 150, "Agents", ["Claude Code", "Codex", "Pi", "Custom agents"], 230),
    card(330, 150, "Runner", ["Sandbox boundary", "Harness adapters", "Tool mediation"], 230),
    rect(590, 128, 250, 162, 24),
    mark(616, 154, 0.82),
    text(736, 184, "Server", 24, 780),
    pill(622, 210, 90, "Policies", ACCENT, BG),
    pill(722, 210, 90, "History", ACCENT, BG),
    pill(622, 252, 90, "Catalog", "#3b2b44", FG),
    pill(722, 252, 90, "MCPs", "#3b2b44", FG),
    card(900, 110, "Clients", ["Terminal", "Web", "Desktop", "Mobile", "REST API"], 230),
    rect(330, 360, 180, 92, 18),
    text(420, 396, "Hosts", 20, 750),
    text(420, 424, "Local / Modal / Daytona", 15, 500, FG_SOFT),
    rect(590, 348, 250, 118, 20),
    text(715, 383, "Persistence", 20, 750),
    text(715, 414, "PostgreSQL, object storage,", 15, 500, FG_SOFT),
    text(715, 438, "traces, artifacts", 15, 500, FG_SOFT),
    arrow(300, 210, 330, 210),
    arrow(560, 210, 590, 210),
    arrow(840, 210, 900, 210),
    arrow(450, 268, 420, 360),
    arrow(715, 290, 715, 348),
    mark(91, 32, 0.52),
    text(143, 60, "Goalrail", 22, 780, FG, "start"),
    "</svg>",
]

OUT.write_text("\n".join(svg) + "\n", encoding="utf-8")
print(f"wrote {OUT.relative_to(ROOT)}")
