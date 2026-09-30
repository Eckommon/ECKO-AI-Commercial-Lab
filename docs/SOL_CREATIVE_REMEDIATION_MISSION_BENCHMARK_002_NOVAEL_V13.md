# Sol Creative Remediation Mission — Benchmark #002 / NOVAEL ARC v1.3

## Role

You are **Sol acting as Creative Director / Commercial Editor / Creative Systems Planner** for this phase.

Astra is unavailable. Do not imitate Astra's prior output mechanically.

This is a design-only remediation pass. Do not implement production code yet.

## Repository

`C:\ECKO-AI-Commercial-Lab`

## Branch

`creative/benchmark-002-novael-v13`

## Governing issues / PR

- Parent benchmark: #9
- Engineering implementation gate: #12
- Commercial creative remediation: #14
- Draft integration PR: #13

## Starting checkpoint

`36aa6846a26d90df996472601ee2b13c2a41e003`

This checkpoint is an accepted engineering portability baseline, not final creative acceptance.

## Human playback finding

The NOVAEL v1.2 file plays without technical defects, and the lamp's exterior/image identity is acceptable. However:

- it is too close to a sequence of still images;
- it lacks sufficient advertising-grade visual attraction;
- association and memorability are weak;
- the audio is not perceptually functioning as effective commercial sound design.

Treat this human observation as the highest-priority creative failure signal.

## Mission

Redesign the 30-second NOVAEL ARC piece so that it can plausibly function as a real vertical advertisement while preserving the engineering strengths already proven.

Do not optimize for “safe to render.” Optimize for:

**visibility + association + attraction + cinematic movement + sonic identity + brand memory**, while remaining technically feasible and honest about source limitations.

## Read first

1. `AGENTS.md`
2. `docs/FACTORY_V1_2_ROLE_MODEL.md`
3. `docs/BENCHMARK_001_LESSONS.md`
4. `docs/NOVAEL_V1_2_DESIGN_RATIONALE.md`
5. `docs/NOVAEL_V1_2_IMPLEMENTATION_HANDOFF.md`
6. `commercials/novael-arc/design/creative-direction.v1.2.json`
7. current NOVAEL brief/storyboard/assets
8. current NOVAEL runtime/audio/mastering/QA source
9. Issue #14

Use v1.2 to understand what worked and what failed. It is not creative authority for v1.3.

## Fixed boundaries

Keep:

- `NVA-002`;
- NOVAEL ARC Lamp identity;
- 30 s;
- 1080×1920;
- 30 fps;
- fictional benchmark product;
- no unsupported factual claims;
- editable type;
- current product geometry/material identity;
- AURORA regression protection.

## Explicitly reopen for design

You may redesign:

- beat structure;
- shot durations;
- copy hierarchy;
- brand/product naming;
- motion intensity;
- camera treatment;
- transition style;
- source treatment;
- masking/isolation policy;
- use of negative space;
- audio structure;
- sonic accents;
- end-card construction;
- asset requirements.

You may conclude that the current five stills are insufficient. If so, define exactly what additional still/video/motion sources are required rather than pretending code can manufacture missing cinematography.

## Commercial proposition

First establish one concise proposition that answers:

**What is NOVAEL ARC, why should the target viewer care, and what should they remember?**

No technical claims. Emotional or aesthetic positioning is allowed.

## Required creative architecture

The design must include a deliberate:

1. **0–2 s hook**
2. **product recognition phase**
3. **material / form seduction phase**
4. **light transformation or hero event**
5. **controlled release / contrast**
6. **brand-memory close**

These are functions, not mandatory six equal beats.

At least one moment must create a memorable visual event beyond opacity + static image display.

At least one sonic event must function as a mnemonic beyond a quiet generic bed.

## Source strategy

Audit all current sources.

For each existing asset mark:
- KEEP
- REWORK
- REPLACE

For every proposed new source mark:
- ADD

If proposing a video/motion plate, specify:
- purpose;
- start/end visual state;
- camera behavior;
- length;
- loopability if relevant;
- required product geometry consistency;
- background/material constraints;
- whether type is baked (normally no);
- minimum resolution;
- how implementation should fail if unavailable.

## Motion design expectations

Avoid a slideshow feel.

Consider, where appropriate:
- controlled push/pull camera;
- source-safe macro traversal;
- layered parallax;
- shape/arc-based wipes;
- graphic light sweeps;
- kinetic type;
- rhythmic cuts;
- speed ramps in graphic elements;
- hard cuts used for impact rather than default safety;
- moments of stillness only when they create contrast.

Do not fake physically meaningful product behavior unless clearly treated as graphic expression.

## Typography

Make the product/brand legible.

The close should identify **NOVAEL ARC** explicitly unless you provide a stronger justified alternative.

Any new copy must be non-factual / non-claim unless separately governed.

Typography must be designed for 360×640 phone-scale viewing.

## Audio redesign

Create an actual commercial sound-design plan.

At minimum define:
- opening hook/transient;
- bed or tonal identity;
- material-detail accents;
- hero/light transformation event;
- transition punctuation;
- contrast/rest strategy;
- final brand mnemonic/sting;
- fade/endpoint behavior.

Explain why the ad should feel materially weaker if muted.

Do not equate “audio file exists” with successful sound design.

## Required outputs

Create exactly:

1. `commercials/novael-arc/design/creative-direction.v1.3.json`
2. `commercials/novael-arc/storyboard/storyboard.v1.3.json`
3. `docs/NOVAEL_V1_3_COMMERCIAL_RATIONALE.md`
4. `docs/NOVAEL_V1_3_IMPLEMENTATION_HANDOFF.md`
5. `docs/NOVAEL_V1_3_ASSET_AND_AUDIO_PLAN.md`

Do not alter the existing v1.2 design/storyboard. v1.3 must coexist for review.

## Validation

Before stopping:

- ensure v1.3 storyboard covers exactly 30.000 s with no gaps/overlaps;
- confirm all copy is explicitly listed;
- confirm every beat has a source strategy;
- confirm every proposed source exists or is explicitly marked ADD / unavailable;
- confirm audio events align to the proposed beat logic;
- run `git diff --check`;
- confirm only the five requested design files are uncommitted changes.

Do not commit or push.

## Self-scorecard

Provide 0–10 scores and evidence for:

| Dimension | Required target |
|---|---:|
| Hook | >= 8 |
| Visibility | >= 8 |
| Product recognition | >= 8 |
| Motion/cinematic potential | >= 8 |
| Association | >= 8 |
| Attraction | >= 8 |
| Audio concept | >= 8 |
| Memorability | >= 8 |
| Feasibility | >= 7 |
| Overall commercial quality | >= 8 |

If any score is below target, revise once before stopping or explicitly return `COMMERCIAL_DESIGN_HOLD`.

## Completion report

Return:

- five changed files;
- one-sentence commercial proposition;
- beat structure and timing;
- visual mnemonic;
- sonic mnemonic;
- copy set;
- asset KEEP/REWORK/REPLACE/ADD matrix;
- motion strategy;
- audio strategy;
- what specifically fixes the v1.2 slideshow problem;
- implementation risks;
- storyboard continuity validation;
- `git diff --check`;
- `git status --short`;
- self-scorecard;
- recommended checkpoint commit message.

Then stop for independent GPT review.

## State

`SOL_CREATIVE_REMEDIATION_AUTHORIZED / IMPLEMENTATION_NOT_AUTHORIZED`
