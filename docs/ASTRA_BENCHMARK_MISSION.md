# Astra Mission — Benchmark #001

You are the independent creative and engineering producer for **Benchmark #001-ASTRA**.

## Repository

`C:\ECKO-AI-Commercial-Lab`

## Branch

`benchmark/001-astra`

## Issue

GitHub Issue #4 — Benchmark #001-ASTRA — Independent AURORA commercial build

## Critical independence constraint

Do not inspect, fetch, merge, cherry-pick, compare against, or otherwise use:

- `factory/v1.1-motion-quality-upgrade`
- PR #3
- commits `163f49f...` or `25c2807...`
- Sol/Codex v1.1 motion source
- Sol/Codex v1.1 architecture/validation docs
- Sol/Codex v1.1 QA evidence

You are being evaluated on independent synthesis from the common pre-v1.1 baseline.

## Fixed campaign contract

Preserve exactly:

- `ACB-001`
- AURORA Cold Brew
- 40 seconds
- 1080×1920 vertical
- 30 fps
- nine semantic storyboard beats
- `AWAKEN THE COLD.`
- `COLD.`
- `BOLD. SMOOTH. READY.`
- the same five canonical source images
- no unsupported factual product claims

## Objective

Produce the strongest 40-second AURORA commercial you can create from this baseline.

Do not imitate the existing v1.0 renderer merely because it exists.

You may redesign the motion implementation from first principles while preserving the governed campaign semantics.

The result should feel intentionally directed, temporally composed, and commercially credible rather than like a still-image slideshow.

## Creative/technical freedom

Choose your own motion architecture.

You may use code-driven techniques available locally, including:

- Remotion
- SVG
- CSS
- Canvas
- WebGL / Three.js
- procedural graphics
- FFmpeg
- combinations of the above

Do not use an external generative-video service in this benchmark.

Do not replace canonical source assets to make the problem easier.

## Required work sequence

1. Read `AGENTS.md` and benchmark protocol.
2. Audit repository baseline and v1.0 renderer.
3. Inspect all five canonical source images.
4. Establish baseline validation/render evidence.
5. Develop an independent creative/motion direction.
6. Record your architecture/design rationale.
7. Implement.
8. Validate continuously.
9. Render the complete 40-second commercial.
10. Inspect temporal behavior and media output.
11. Correct visible or technical defects.
12. Produce final verification evidence.
13. Record human interventions.
14. Report final diff/status and self-scorecard.

## Do not optimize for matching another implementation

There is no required component list.

Choose abstractions only when they make this commercial stronger and/or make future Factory work more reusable.

The benchmark rewards independent judgment.

## Output requirements

Final MP4 video stream must be:

- H.264 or another explicitly justified broadly compatible codec
- 1080×1920
- 30 fps
- exactly 1200 video frames
- exactly 40.000000 seconds

Report audio/container duration separately.

## Final report

Include:

- architecture/design rationale
- files changed
- exact commands
- validation/test results
- media metadata
- MP4 SHA-256
- QA method and findings
- creative before/after assessment
- remaining production weaknesses
- full human-intervention log
- final git status
- suggested commit message
- suggested PR title/body

Self-score 0–10:

- creative originality
- motion sophistication
- visual coherence
- product focus
- typography
- transition quality
- audio-visual synchronization
- commercial impact
- code architecture
- reuse potential
- reproducibility
- validation strength

Do not merge the benchmark branch.
