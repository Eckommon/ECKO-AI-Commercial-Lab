# ECKO AI Commercial Lab

> **AI Commercial Factory v1.0** — GPT-directed storyboards, generated visual assets, code-driven motion, and reproducible MP4 rendering.

ECKO AI Commercial Lab is an experiment in building short-form commercial production as a reproducible software pipeline rather than a one-off editing workflow.

## Mission

Turn a product brief into a 30–40 second commercial through a governed pipeline:

`Brief → GPT Creative Direction → Storyboard → Image Assets → Code-driven Motion → Audio → QA → MP4`

The goal is not “press one button and hope for a video.” The goal is a commercial factory where creative intent, timing, assets, motion, and render settings are explicit, versionable, testable, and reusable.

## Factory v1.0

| Stage | Owner | Artifact |
|---|---|---|
| 1. Brief | Human + GPT | `brief.json` |
| 2. Creative direction | GPT | concept, hook, copy, visual language |
| 3. Storyboard | GPT | time-coded `storyboard.json` |
| 4. Asset generation | GPT Image | controlled still assets |
| 5. Motion implementation | Codex / code | Remotion scenes + reusable motion components |
| 6. Audio | code / approved assets | music bed + SFX |
| 7. Render | Remotion + FFmpeg | H.264 MP4 |
| 8. QA | scripted + human review | reproducibility / timing / output checks |

## Benchmark #001 — AURORA Cold Brew

The first benchmark uses a fictional beverage brand so the repository can test the full creative pipeline without depending on a real advertiser or trademarked product packshot.

**Campaign:** `AWAKEN THE COLD.`  
**Format:** 1080×1920 vertical, 30 fps, 40 seconds  
**Creative direction:** premium dark beverage film, emerald aurora light, condensation macro imagery, coffee/ice impact, restrained gold typography.

Storyboard:

1. **0–3s — Cold Open**
2. **3–7s — Macro**
3. **7–11s — COLD.**
4. **11–16s — Aurora Scan**
5. **16–21s — Impact**
6. **21–27s — Hero**
7. **27–32s — Orbit**
8. **32–36s — BOLD. SMOOTH. READY.**
9. **36–40s — End Card / AWAKEN THE COLD.**

## Repository layout

```text
.
├─ docs/
├─ factory/
├─ src/
│  ├─ components/
│  └─ commercials/aurora/
├─ commercials/
│  └─ aurora-cold-brew/
│     ├─ brief/
│     ├─ storyboard/
│     ├─ assets/
│     ├─ audio/
│     └─ output/
└─ scripts/
```

## Quick start

On `benchmark/001-astra`, install the local score/QA dependencies once:

```powershell
python -m pip install -r scripts/requirements-astra.txt
```

```bash
npm install
npm run validate
npm run studio
npm run render:aurora
```

Independent Astra benchmark delivery and QA:

```powershell
npm run render:aurora
python scripts/qa_astra.py artifacts/astra-001/aurora-astra.mp4 --label final
```

The render command generates the original stereo score, synchronizes the five
canonical images, runs contract tests and TypeScript validation, checks prepared
bytes, then renders H.264 / BT.709 / 1080x1920 / 30 fps / 1200 frames. The MP4 is
`artifacts/astra-001/aurora-astra.mp4`. `npm run preview:aurora` makes a half-size
preview. FFmpeg and ffprobe must be on PATH for QA. Georgia/Arial are resolved
from Windows system fonts; exact cross-platform typography is not promised.

See [independent design](docs/ASTRA_DESIGN.md),
[benchmark evidence](docs/ASTRA_FINAL_REPORT.md), and
[human interventions](docs/ASTRA_HUMAN_INTERVENTION_LOG.md).
Existing commercial output/QA is excluded from this benchmark. The originally
documented shell-based FFmpeg fallback is absent from the starting repository;
use the validated Remotion pipeline above.

## Design principles

- **Reproducible over ad-hoc**
- **Code-driven motion**
- **Asset provenance**
- **Fail-closed validation**
- **Brand safety by construction**
- **Human creative authority**

## Status

**v1.0 / Benchmark #001 implemented as a working prototype.**

This repository is an experimental AI commercial production lab and is not affiliated with any third-party brand unless explicitly stated.
