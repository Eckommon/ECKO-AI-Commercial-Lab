# Benchmark #001-ASTRA — Protocol

## Goal

Measure whether Astra can independently produce a stronger or more autonomous AURORA commercial from the same pre-v1.1 baseline used by the Sol/Codex implementation.

This is an A/B benchmark, not a collaborative continuation.

## Baseline

- branch: `benchmark/001-astra`
- base commit: `ca77efaba6f6a817c2b2973c2525ace8ac98329e`
- source assets: five canonical AURORA PNGs plus SHA-256 manifest
- starting renderer: Factory v1.0
- forbidden reference: Sol/Codex v1.1 branch, PR #3, implementation commits, architecture docs, validation docs, or QA output

## Fixed contract

- campaign: `ACB-001`
- duration: 40 seconds
- resolution: 1080×1920
- fps: 30
- storyboard: 9 semantic beats
- campaign line: `AWAKEN THE COLD.`
- supporting copy: `COLD.` and `BOLD. SMOOTH. READY.`
- canonical images must not be replaced
- no unsupported product claims
- final deliverable must include an MP4

## Independence

Astra should begin from repository truth only.

It may inspect:

- `AGENTS.md`
- `README.md`
- Factory v1.0 docs/contracts
- AURORA brief/storyboard
- canonical assets
- v1.0 Remotion implementation

It must not inspect Sol/Codex v1.1 work.

## Freedom of implementation

Astra may independently choose:

- motion architecture
- scene system
- transition grammar
- procedural effects
- typography motion
- audio implementation
- testing and QA architecture
- Remotion/SVG/Canvas/WebGL/FFmpeg composition strategy

External generative-video services are excluded from this benchmark.

## Required media evidence

The final result must report:

- codec
- width/height
- frame rate
- video frame count
- video stream duration
- audio codec and duration
- container duration
- output file size
- SHA-256
- full-stream decode result

Target video stream:

- 1080×1920
- 30 fps
- exactly 1200 frames
- exactly 40.000000 seconds

## Human-intervention accounting

Record each material human intervention with:

| # | Stage | Human action | Why required | Did it change creative direction? |
|---|---|---|---|---|

Do not count initial benchmark authorization as an intervention.

Count later approvals, corrections, manual edits, timing choices, and rerender instructions.

## Evaluation rubric

Each implementation will later be scored from 0–10:

1. Creative originality
2. Motion sophistication
3. Visual coherence
4. Product focus
5. Typography
6. Transition quality
7. Audio-visual synchronization
8. Commercial impact
9. Code architecture
10. Reuse potential
11. Reproducibility
12. Validation strength

Human intervention is separately measured rather than scored subjectively.

## Completion condition

Astra execution is complete only after:

- implementation
- validation
- full render
- media inspection
- QA evidence
- final repo diff/status
- self-scorecard
- limitations
- intervention log

Do not merge the benchmark branch before independent comparison.
