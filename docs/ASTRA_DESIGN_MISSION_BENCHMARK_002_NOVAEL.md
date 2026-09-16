# Astra Design Mission — Benchmark #002 / NOVAEL ARC

## Role

Act as **Designer / Planner / Creative Systems Architect** for Benchmark #002.

Do not implement the renderer, motion components, audio generator, mastering pipeline, or validation/runtime code in this mission. Your output is a design contract that Sol/Codex can implement and verify.

## Repository

`C:\ECKO-AI-Commercial-Lab`

## Branch

`design/benchmark-002-novael-astra`

## Governing issues

- Parent benchmark: Issue #9
- Design gate: Issue #11
- Completed canonical asset gate: Issue #10

## Immutable checkpoint

Start from canonical asset checkpoint:

`79c13d9cba78c890df751c845dadfc15d68012ac`

The five canonical source PNGs and `ASSET_SHA256.txt` at that checkpoint are fixed inputs. Do not modify, replace, regenerate, or reinterpret them as alternate product variants.

## Read first

Read these before designing:

1. `AGENTS.md`
2. `README.md`
3. `docs/FACTORY_V1_2_ROLE_MODEL.md`
4. `docs/BENCHMARK_001_LESSONS.md`
5. `factory/creative_direction.schema.json`
6. `commercials/novael-arc/brief/brief.json`
7. `commercials/novael-arc/storyboard/storyboard.json`
8. `commercials/novael-arc/assets/ASSET_SHA256.txt`
9. `commercials/novael-arc/assets/ASSET_GENERATION_SPEC.md`
10. the five canonical NOVAEL source images
11. Issue #11 acceptance criteria

AURORA design documents may be read only as examples of the role boundary and documentation quality. They are not creative authority for NOVAEL.

## Fixed campaign contract

Preserve exactly:

- campaign ID: `NVA-002`
- product: NOVAEL ARC Lamp (fictional benchmark brand)
- duration: 30 seconds
- format: vertical 1080×1920
- fps: 30
- downstream target: exactly 900 frames
- seven governed beats S01–S07 with exact existing timings, purposes, assets, copy, and cues
- support copy: `FORM.` and `GLOW.`
- campaign line: `HOLD THE LIGHT.`
- claims: none
- canonical asset pack locked at `79c13d9...`

The Creative Direction Contract may govern treatment only. It must not redefine timing, copy, claims, asset identity, duration, dimensions, fps, or storyboard semantics.

## Portability objective

This benchmark exists to prove that Factory v1.2 can support a campaign that is materially different from AURORA.

NOVAEL should feel like **sculptural light, controlled space, form, material, and quiet activation** rather than beverage energy.

Do not reuse AURORA's emerald/aurora visual grammar, condensation, coffee/ice motifs, kinetic-energy climax pattern, or campaign-specific typography/transition logic.

The design should be recognizably NOVAEL even if brand names were temporarily hidden.

## Governed editorial facts to respect

- S01: sculptural reveal
- S02: material/form study
- S03: name the design idea / `FORM.`
- S04: light activation / governed `light-rise` cue
- S05: spatial breathing room
- S06: distilled product character / `GLOW.`
- S07: brand memory / `HOLD THE LIGHT.` close

Do not turn S05 into an arbitrary effects peak. Treat the `light-rise` cue in S04 as a meaningful activation event rather than an interchangeable hit.

## Required outputs

Create exactly these design deliverables:

### 1. `commercials/novael-arc/design/creative-direction.v1.2.json`

Requirements:

- valid against `factory/creative_direction.schema.json`;
- `campaignId` must be `NVA-002`;
- exactly seven `beatTreatments`, one for each S01–S07;
- every `sceneFamily` referenced by a beat must exist in `sceneFamilies`;
- do not restate or redefine governed timing/copy/assets in the design file;
- make source-treatment decisions explicit;
- masking/isolation must remain optional and have a whole-source-safe fallback;
- flattening limitations of the source images must be acknowledged where relevant;
- mastering intent remains compatible with SDR BT.709 / yuv420p delivery.

### 2. `docs/NOVAEL_V1_2_DESIGN_RATIONALE.md`

Explain:

- campaign thesis;
- what makes the treatment distinct from AURORA;
- visual hierarchy;
- scene-family structure;
- pacing, holds, activation, and breathing-room logic;
- typography hierarchy and reveal logic;
- transition strategy, including where a hard cut is stronger;
- audio structure and cue meaning, especially `light-rise`;
- source treatment / isolation strategy and safe fallbacks;
- quality risks and likely failure modes;
- which decisions are NOVAEL-specific;
- which lessons may generalize into Factory v1.2 without becoming campaign hacks;
- any schema limitation discovered.

### 3. `docs/NOVAEL_V1_2_IMPLEMENTATION_HANDOFF.md`

Write for Sol/Codex.

Use clear **MUST / SHOULD / MAY** language. Specify observable implementation intent without dictating unnecessary component names or code architecture.

Include:

- per-beat essential behavior;
- hierarchy/readability expectations;
- activation/hold deadlines where design quality depends on them;
- audio intent and cue distinctions;
- source-safe fallback behavior;
- what must remain generic vs campaign-specific;
- what implementation must not fake from flattened imagery;
- design acceptance cues that can later be checked in temporal QA.

## Design principles

- Product/form hierarchy before effect count.
- Use negative space as an active design element.
- Light activation should feel controlled, not explosive.
- Motion may accelerate, breathe, or stop, but every change needs editorial purpose.
- Typography stays editable in code and subordinate to product hierarchy.
- Atmosphere should frame form, not obscure it.
- A hard cut is valid when clearer than a decorative transition.
- Do not require unsafe object extraction from flattened assets.
- Avoid unsupported technical, performance, wellness, or efficiency implications.
- Audio direction should describe structure, accents, dynamics, and silence rather than implementation details.

## Explicit prohibitions

Do not:

- edit the brief, storyboard, asset manifest, or canonical PNGs;
- write production renderer/motion/audio/mastering code;
- import or copy AURORA campaign production code;
- rename campaign IDs or governed beat IDs;
- add factual product claims;
- create extra design authority outside the three required deliverables;
- merge or open a production PR;
- continue into Sol/Codex implementation after finishing design.

## Validation before stopping

Before completion:

1. validate `creative-direction.v1.2.json` against `factory/creative_direction.schema.json`;
2. verify exactly one treatment exists for each S01–S07;
3. verify no extra/missing beat IDs;
4. verify governed brief/storyboard/assets remain byte-unchanged from checkpoint `79c13d9...`;
5. verify only the three design deliverables were added/changed by the Astra design work;
6. run `git diff --check`;
7. do **not** commit or push unless explicitly instructed by GPT governance after review.

## Completion report

Return:

- files created/changed;
- one-paragraph design thesis;
- scene families and their purpose;
- per-beat priority summary;
- source-treatment/fallback decisions;
- audio direction summary;
- generic Factory lessons discovered;
- schema gaps, if any;
- unresolved risks;
- JSON schema validation result;
- governed-input byte-integrity result;
- `git diff --check` result;
- `git status --short`;
- recommended checkpoint commit message.

Then stop for independent GPT design review.

## State

`ASTRA_DESIGN_AUTHORIZED / IMPLEMENTATION_NOT_AUTHORIZED`
