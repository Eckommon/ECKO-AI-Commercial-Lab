# Sol/Codex Implementation Mission — Benchmark #002 / NOVAEL ARC

## Role

Act as **Implementer / Engineering Core / Production Executor**.

Astra's design work is already accepted. Do not redesign NOVAEL. Your job is to consume the approved design contract and prove that Factory v1.2 is reusable beyond AURORA.

## Repository

`C:\ECKO-AI-Commercial-Lab`

## Branch

`implementation/benchmark-002-novael`

## Governing issues

- Parent benchmark: Issue #9
- Completed asset gate: Issue #10
- Completed design gate: Issue #11
- Active implementation gate: Issue #12

## Immutable authority

Start from approved design checkpoint:

`dd046ccb370a00dbc9d09d683cca7d4a2ff7a1e2`

Canonical asset checkpoint:

`79c13d9cba78c890df751c845dadfc15d68012ac`

Do not modify the approved design, governed brief/storyboard, canonical asset manifest, or PNG bytes.

## Read first

1. `AGENTS.md`
2. `README.md`
3. `docs/FACTORY_V1_2_ROLE_MODEL.md`
4. `docs/BENCHMARK_001_LESSONS.md`
5. `docs/NOVAEL_V1_2_DESIGN_RATIONALE.md`
6. `docs/NOVAEL_V1_2_IMPLEMENTATION_HANDOFF.md`
7. `commercials/novael-arc/design/creative-direction.v1.2.json`
8. `commercials/novael-arc/brief/brief.json`
9. `commercials/novael-arc/storyboard/storyboard.json`
10. `commercials/novael-arc/assets/ASSET_SHA256.txt`
11. `factory/creative_direction.schema.json`
12. current AURORA v1.2 validator/runtime/audio/mastering/QA implementation
13. Issue #12 acceptance contract

AURORA code is implementation evidence, not NOVAEL creative authority.

## Fixed NOVAEL contract

Preserve exactly:

- campaign ID `NVA-002`;
- 30 seconds;
- 1080×1920;
- 30 fps;
- 900 frames;
- S01–S07 exact governed boundaries and semantics;
- `FORM.`;
- `GLOW.`;
- `HOLD THE LIGHT.`;
- `sub-hit` only at S01/S03/S06/S07;
- `light-rise` only at S04;
- no discrete cue at S02/S05;
- no claims;
- canonical five-image asset pack;
- all approved source treatments with mask/cleanup disabled.

## Engineering objective

Demonstrate **real portability**, not a second hard-coded commercial.

The current repository still contains AURORA-specific production boundaries:

- validator mechanics and semantic constants are coupled;
- validation entrypoint is AURORA-only;
- Remotion root exposes only AURORA;
- audio synthesis is AURORA-only and lacks meaningful `light-rise`;
- mastering hard-codes AURORA paths / 40 s / 1200 frames;
- temporal QA hard-codes AURORA frame samples and classifications;
- package scripts expose only the AURORA pipeline.

Refactor the **minimum coherent reusable boundary** necessary to support both campaigns while keeping campaign semantics explicit and campaign-owned.

Do not perform a broad framework rewrite.

## Required implementation

### 1. Reusable fail-closed contract validation

Create a reusable validation mechanism that can validate both AURORA and NOVAEL without duplicating the entire validator.

Campaign-specific authority may live in campaign specs/adapters/configuration, but the generic validator must not contain:

- NOVAEL copy;
- NOVAEL cue names;
- NOVAEL timing;
- NOVAEL product geometry;
- NOVAEL layout coordinates;
- AURORA-specific assumptions that block a second campaign.

NOVAEL validation MUST enforce:

- identity;
- 30 s / 30 fps / 1080×1920;
- exact ordered S01–S07 semantics;
- continuity with no timing gap/overlap;
- exact copy/assets/cues;
- empty claims;
- Creative Direction schema;
- exact one treatment per beat;
- unique/resolved scene families;
- mask/cleanup policy;
- exact canonical asset manifest membership and SHA-256;
- explicit design-to-implementation binding.

Preserve AURORA validation behavior and adversarial coverage.

### 2. Reviewed design binding

Add an explicit NOVAEL implementation lock that binds:

- campaign identity;
- exact Creative Direction path;
- exact-byte SHA-256 of approved `creative-direction.v1.2.json`;
- implementation recipe/adapter identity.

The validator must reject a valid but byte-changed design while the lock remains stale.

Do not automatically rewrite the lock during validation or render.

### 3. NOVAEL runtime and composition

Add a 900-frame NOVAEL Remotion composition.

Campaign-specific runtime logic should live under a NOVAEL namespace such as `src/commercials/novael/*`.

Reuse generic Factory primitives when they genuinely fit.

NOVAEL production code MUST NOT import AURORA recipe/timeline as creative authority.

All inter-beat picture boundaries are hard cuts.

Treatment deadlines from the approved handoff are mandatory:

- S01: settle by local frame 30;
- S02: settle by local frame 60;
- S03: full `FORM.` by local frame 15;
- S04: reveal and `light-rise` settle by local frame 60;
- S05: picture fully still for all 150 frames;
- S06: full `GLOW.` by local frame 15, no reactivation;
- S07: full `HOLD THE LIGHT.` by local frame 15 and stable through global frame 899.

Use whole-source treatment only.

Do not implement:

- mask extraction;
- source-derived cleanup;
- local relighting;
- emitter-only animation;
- invented shadows/reflections;
- depth reconstruction;
- inpainting;
- cross-source morphs.

### 4. Typography

Typography remains runtime-editable and comes only from governed storyboard copy.

Complete words/phrases reveal together through opacity.

No character cascade, animated tracking, extra wordmark, CTA, subtitle or claim.

Preserve the product-safe clearance and phone-size readability requirements in the approved handoff.

The approved separate upper typography-field fallback is allowed, but must contain the entire source below it without stretching or invented source extension.

### 5. Deterministic stereo audio

Implement deterministic stereo NOVAEL audio driven by storyboard cue membership and beat boundaries.

Required semantic distinction:

- `sub-hit`: short, rounded low punctuation;
- `light-rise`: sustained opening in warmth/width, not a transient impact.

No `impact-hit` assumption.

S02 and S05 receive no discrete cue.

S05 must have lower sustained density than S04 and may not build anticipation into S06.

Close must resolve inside 30 seconds with no appended tail.

Tests should verify determinism, stereo/48 kHz, cue distinction, no unexpected cues, S05 density behavior and mono survivability.

Prefer extracting a reusable cue/audio mechanism when doing so is smaller and clearer than cloning the AURORA generator.

### 6. Reusable mastering boundary

The proven v1.2 mastering safety rules remain authoritative:

- ffprobe intermediate before mastering;
- explicit H.264 / resolution / fps / frame-count / duration verification;
- evidence-driven input range decision;
- controlled BT.709 limited Remotion profile handling;
- fail closed on ambiguous or unsupported signaling;
- explicit limited BT.709 output;
- yuv420p;
- stereo AAC 48 kHz;
- faststart;
- full decode;
- loudness evidence.

Refactor or wrap the current implementation so duration/frame count/paths are campaign-driven rather than copied AURORA constants.

NOVAEL final must be exactly 900 video frames and 30.000000 seconds.

Do not regress AURORA 1200 frames / 40.000000 seconds.

### 7. Temporal QA portability

Generalize/reuse the QA mechanism rather than duplicating the AURORA script wholesale.

NOVAEL deterministic evidence must sample:

- all hard-cut boundaries;
- S01 local frame 30;
- S02 local frame 60;
- S03 local frame 15;
- S04 local frame 60;
- S05 entry/middle/last;
- S06 local frame 15;
- S07 local frame 15 and global frame 899.

Include phone-scale review evidence for S03/S06/S07 at approximately 360×640 or equivalent.

The QA report must explicitly classify S05 as an intentional full-beat still, not automatically a render freeze.

After-only mode is acceptable because Benchmark #002 has no prior NOVAEL render baseline.

### 8. Render and package scripts

Provide a governed NOVAEL path that can be executed from a fresh clone, for example through explicit package scripts for:

- NOVAEL validation;
- audio preparation;
- render;
- mastering;
- temporal QA.

Naming is your decision; behavior is not.

Do not break existing AURORA commands.

## Adversarial tests

Add real mutation tests for NOVAEL covering at minimum:

- wrong campaign ID;
- wrong duration/fps/resolution;
- missing/duplicate/unknown beat;
- timing gap/overlap;
- wrong purpose;
- wrong asset;
- wrong copy;
- wrong cue;
- unexpected cue on S02/S05;
- `light-rise` replaced with `sub-hit` or impact grammar;
- missing/corrupt source;
- asset manifest/hash drift;
- design byte drift with stale lock;
- missing/duplicate/unknown treatment;
- unresolved family;
- mask/cleanup enabled;
- mastering 900-frame/30 s drift;
- ambiguous/unsupported intermediate range;
- AURORA regression.

Tests must mutate actual campaign inputs or runtime surfaces. Do not merely assert literals in the test source.

## Portability boundaries

Generic Factory code may know about:

- abstract campaign contract mechanics;
- timing continuity;
- source-surface modes;
- scene-family references;
- generic fixed holds / bounded uniform reveals;
- generic editable typography behavior;
- cue dispatch as data;
- generic mastering media expectations supplied by a campaign;
- generic QA sampling mechanisms.

Generic Factory code must not contain NOVAEL:

- graphite/amber palette decisions;
- crescent/arc geometry assumptions;
- `FORM.`, `GLOW.`, `HOLD THE LIGHT.`;
- `light-rise` by name unless it is merely an opaque cue value passed to a campaign-owned audio profile;
- S01–S07 durations;
- safe-zone coordinates;
- source bands;
- campaign-specific scene order.

## Validation and production gates

Before claiming implementation completion, run from the final local source state:

1. NOVAEL contract validation;
2. AURORA contract regression;
3. TypeScript typecheck;
4. all contract/adversarial tests;
5. audio tests;
6. mastering tests;
7. motion/runtime tests;
8. fresh NOVAEL render;
9. NOVAEL final mastering;
10. NOVAEL temporal QA;
11. ffprobe intermediate and final;
12. full video+audio decode;
13. loudness measurement;
14. final MP4 SHA-256;
15. fresh-clone or equivalent clean-checkout reproducibility;
16. `git diff --check`.

## Human gate

Do not claim publication completion from machine checks.

Human full-speed playback of the final NOVAEL MP4 with audio remains mandatory before final benchmark integration.

## Stop point

Do **not** commit or push implementation changes yet.

Do **not** open a PR.

Do **not** close Issue #12 or parent Issue #9.

At completion, return:

- exact changed files;
- generic boundaries extracted/refactored;
- NOVAEL-specific files;
- explanation of why the result is not an AURORA clone;
- design lock details;
- contract/adversarial test results;
- AURORA regression results;
- audio tests and measurements;
- intermediate probe and color/range decision;
- final probe and delivery metadata;
- temporal QA evidence;
- phone readability evidence;
- full decode result;
- final MP4 path, size and SHA-256;
- fresh-clone/reproducibility result;
- `git diff --check`;
- `git status --short`;
- known limitations.

Then stop for independent GPT engineering review.

## State

`SOL_CODEX_IMPLEMENTATION_AUTHORIZED / COMMIT_PUSH_PR_NOT_AUTHORIZED`
