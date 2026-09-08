# AI Commercial Factory v1.0 — Architecture

## Objective

Create a deterministic handoff from creative intent to a rendered 30–40 second commercial.

## Pipeline

1. **Intake** — normalize product, audience, channel, duration, claims and constraints.
2. **Creative synthesis** — GPT produces campaign idea, hook, copy, visual grammar and shot logic.
3. **Storyboard contract** — every shot receives start/end time, purpose, asset refs, motion and copy.
4. **Asset factory** — generate/select still assets with shot IDs and provenance notes.
5. **Motion engine** — Codex implements storyboard intent as composable Remotion primitives.
6. **Audio layer** — music/SFX are generated or sourced under explicit rights constraints.
7. **Render** — Remotion renders deterministic frames; FFmpeg encodes H.264 output.
8. **QA** — validate duration, dimensions, frame rate, missing assets and output existence.

## Separation of concerns

GPT owns semantic creative direction. Image generation owns visual source assets. Code owns motion and reproducibility. FFmpeg owns final media encoding. Human review owns final brand judgment.

## v1.0 non-goals

- photoreal continuous human acting
- lip-synced dialogue
- physically exact liquid simulation
- automatic legal approval of advertising claims
