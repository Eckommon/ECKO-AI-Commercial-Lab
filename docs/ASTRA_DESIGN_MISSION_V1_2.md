# Astra Design Mission — Factory v1.2 / AURORA

## Role

Act as **Designer / Planner / Creative Systems Architect**.

Do not implement the commercial renderer in this mission.

Do not write production motion components, audio generators, FFmpeg pipelines, or validation code except for minimal design-support tooling if absolutely necessary.

Your job is to produce a high-quality, inspectable design contract that Sol/Codex can implement.

## Repository

`C:\ECKO-AI-Commercial-Lab`

## Branch

`factory/v1.2-hybrid`

## Governing issue

Issue #6 — Factory v1.2 Hybrid Creative/Engineering Integration

## Read first

- `AGENTS.md`
- `README.md`
- `docs/FACTORY_V1_2_ROLE_MODEL.md`
- `docs/BENCHMARK_001_LESSONS.md`
- `factory/brief.schema.json`
- `factory/storyboard.schema.json`
- `factory/creative_direction.schema.json`
- AURORA brief, storyboard, asset manifest, and the five canonical source images
- current Factory v1.1 architecture and validation docs

You may use the benchmark lessons documented on this branch. Do not copy Astra benchmark source code into Factory v1.2.

## Fixed campaign contract

Preserve exactly:

- `ACB-001`
- AURORA Cold Brew
- 40 seconds
- 1080×1920 vertical
- 30 fps
- nine governed semantic beats and their timings
- approved copy
- same five canonical assets
- no unsupported factual claims

## Mission

Design the v1.2 AURORA treatment as if handing it to a senior motion engineering team.

Produce:

1. `commercials/aurora-cold-brew/design/creative-direction.v1.2.json`
   - must satisfy `factory/creative_direction.schema.json`;
   - one treatment entry per governed beat;
   - reference existing beat IDs rather than redefining timing/copy.

2. `docs/AURORA_V1_2_DESIGN_RATIONALE.md`
   - campaign thesis;
   - visual hierarchy;
   - scene-family rationale;
   - pacing / hero-hold rationale;
   - typography strategy;
   - transition strategy;
   - audio strategy;
   - product-isolation/source-treatment strategy;
   - explicit risks and fallbacks;
   - which ideas are generic Factory lessons vs AURORA-specific decisions.

3. `docs/AURORA_V1_2_IMPLEMENTATION_HANDOFF.md`
   - concise executor-oriented requirements for Sol/Codex;
   - must distinguish MUST / SHOULD / MAY;
   - must identify what may not be implemented safely from flattened assets;
   - must not prescribe unnecessary component names or code structure.

## Design principles

- Product hierarchy before effect count.
- Every beat should have one dominant communication objective.
- Motion should accelerate, breathe, or stop intentionally.
- A hard cut is allowed when stronger than a transition.
- Typography must be readable and subordinate to campaign hierarchy.
- Source isolation is optional, not mandatory; unsafe mattes must have a fallback.
- Atmosphere should frame the product, not compete with it.
- Audio direction should describe sections, accents, dynamics, and silence/breathing room rather than hard-code a production implementation.
- Media mastering intent should target broadly compatible BT.709/yuv420p delivery.

## Quality bar

The design contract must be implementable without needing the Astra benchmark branch as a runtime dependency.

A Sol/Codex executor reading only this branch should understand:

- what the film should feel like;
- what each beat should prioritize;
- what visual/audio behavior is essential;
- what is optional;
- what is unsafe;
- what fallback to use;
- how to judge whether implementation matches design intent.

## Completion

Validate the JSON against the schema if tooling is available.

Do not proceed into production implementation.

Do not merge.

At completion report:

- files created/changed;
- major design decisions;
- unresolved design risks;
- any conflict discovered between design intent and governed campaign contract;
- final git status;
- recommended design checkpoint commit message.
