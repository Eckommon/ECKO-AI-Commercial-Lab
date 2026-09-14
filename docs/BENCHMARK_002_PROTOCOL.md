# Benchmark #002 Protocol — NOVAEL ARC Portability Proof

Issue: #9  
Canonical baseline: `51da285acafe5730d5b41fe111fa80e7d83b92af` (Factory v1.2)  
Benchmark branch: `benchmark/002-novael-arc`

## Purpose

Benchmark #002 is a portability test, not a second AURORA campaign.

The benchmark asks whether the canonical Factory v1.2 operating model can produce a materially different commercial without depending on AURORA campaign code or AURORA-specific assumptions in generic Factory paths.

The required operating model is:

`Governed brief/storyboard → Astra design-only contract → Sol/Codex implementation → validation/render/mastering/QA → human playback gate`

## Governed benchmark identity

- Campaign ID: `NVA-002`
- Fictional product: `NOVAEL ARC Lamp`
- Category: premium sculptural ambient lighting
- Duration: 30 seconds
- Resolution: 1080×1920
- Frame rate: 30 fps
- Target frames: 900
- Campaign line: `HOLD THE LIGHT.`
- Support copy: `FORM.` and `GLOW.`
- Claims: none

## Why this is a real portability test

Benchmark #002 intentionally changes dimensions of the campaign contract that were fixed in AURORA:

1. 30 seconds instead of 40 seconds.
2. 7 governed beats instead of 9.
3. 900 frames instead of 1200.
4. A lighting object instead of a beverage can.
5. Warm amber / graphite / stone visual language instead of black / emerald / condensation / coffee.
6. A governed `light-rise` cue, with no requirement that the campaign contain an `impact-hit` cue.
7. Different editorial rhythm: quiet reveal → form study → light activation → breathing room → resolved close.

A passing render that is achieved by copying and renaming AURORA campaign code is not a passing benchmark.

## Authority order

1. Approved brief and claims policy.
2. Governed storyboard semantics, copy, assets and timing.
3. Approved NOVAEL Creative Direction Contract.
4. Canonical NOVAEL asset manifest and campaign adapters.
5. Generic Factory primitives and campaign-neutral infrastructure.
6. NOVAEL composition implementation.
7. Rendered artifact.

Lower layers may not silently override higher layers.

## Role split

### Astra

Designer / Planner / Creative Systems Architect.

Astra owns campaign interpretation, hierarchy, scene-family planning, pacing, typography intent, source treatment, transition intent, audio direction, risk/fallback planning and implementation handoff.

Astra must not implement the production renderer, Factory core, audio generator or mastering pipeline for Benchmark #002.

### Sol/Codex

Implementer / Engineering Core / Production Executor.

Sol/Codex consumes the independently accepted design contract and implements the campaign while generalizing only those Factory capabilities that are genuinely campaign-neutral.

## Anti-copy rules

The benchmark fails portability if any of the following occur:

- NOVAEL production code imports `src/commercials/aurora/*`.
- AURORA campaign files are copied into a NOVAEL directory and merely renamed.
- `NVA-002`, NOVAEL asset names, NOVAEL colors or NOVAEL timing are embedded in generic Factory primitives.
- AURORA governed copy/assets/timing/design are changed to make NOVAEL easier.
- A new monolithic `validateNovaelCampaign()` is created by duplicating the AURORA validator rather than extracting campaign-neutral validation structure where needed.
- A new NOVAEL-only mastering implementation is created by duplicating AURORA finalization logic instead of parameterizing shared delivery rules where appropriate.

Campaign-specific recipes/adapters are expected. Campaign-specific duplication of generic infrastructure is not.

## Regression rule

Every shared-core generalization made for NOVAEL must preserve canonical AURORA v1.2 behavior.

At the implementation gate, both campaigns must validate independently. AURORA remains a regression fixture, not a source of NOVAEL creative decisions.

## Governed beat structure

| Beat | Time | Purpose | Asset | Copy | Cue |
|---|---:|---|---|---|---|
| S01 | 0–4 | sculptural reveal | `shot-01-hero.png` | — | `sub-hit` |
| S02 | 4–8 | material/form study | `shot-02-detail.png` | — | — |
| S03 | 8–12 | name the design idea | `shot-03-profile.png` | `FORM.` | `sub-hit` |
| S04 | 12–17 | light activation | `shot-04-lit.png` | — | `light-rise` |
| S05 | 17–22 | spatial breathing room | `shot-01-hero.png` | — | — |
| S06 | 22–26 | distilled product character | `shot-04-lit.png` | `GLOW.` | `sub-hit` |
| S07 | 26–30 | brand memory and close | `shot-05-endcard.png` | `HOLD THE LIGHT.` | `sub-hit` |

## Phase gates

### Gate A — governed source pack

Required before Astra design:

- brief committed;
- storyboard committed;
- five canonical source images created;
- source images visually checked for the same product identity;
- SHA-256 manifest committed;
- no unsupported baked product claims or real brand marks.

### Gate B — Astra design acceptance

Astra must produce:

- `commercials/novael-arc/design/creative-direction.v1.json`
- design rationale
- implementation handoff

Independent review must return `DESIGN_ACCEPTED` before production implementation starts.

### Gate C — Sol/Codex implementation acceptance

Required evidence includes:

- campaign-neutral validation path;
- no imports from AURORA campaign modules;
- governed duration/beat count/frame count derived from NOVAEL inputs;
- cue path supports `light-rise` without requiring `impact-hit`;
- exact asset hashes;
- fail-closed design→implementation binding;
- AURORA regression PASS;
- NOVAEL adversarial mutation tests PASS;
- deterministic audio/mastering/QA evidence;
- final media contract PASS.

### Gate D — human release

Human full-speed video+audio playback must pass before the benchmark receives a terminal portability verdict.

## Final media contract

- H.264 MP4
- 1080×1920
- 30 fps
- exactly 900 video frames
- exactly 30.000000 s video stream
- yuv420p
- limited-range BT.709 matrix/transfer/primaries
- stereo AAC 48 kHz
- faststart
- full video/audio decode PASS
- loudness/LRA/true-peak evidence

## Verdicts

- `PORTABILITY_PROVED`: all gates pass without AURORA campaign-code dependency.
- `PORTABILITY_PARTIAL`: media succeeds but meaningful AURORA-specific assumptions remain in generic/core paths.
- `PORTABILITY_HOLD`: benchmark cannot complete without unsafe copying, contract drift or regression.

## Current state

`PHASE_A_ACTIVE — governance scaffold created; canonical asset pack not yet materialized.`
