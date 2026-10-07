# Sol Source Materialization Mission — Benchmark #002 / NOVAEL ARC v1.3

## Role

Act as **Source Materialization Lead / Motion & Audio Asset Producer**.

The v1.3 commercial design is accepted. Do not redesign it and do not implement the final commercial runtime yet.

## Repository

`C:\ECKO-AI-Commercial-Lab`

## Branch

`assets/benchmark-002-novael-v13`

## Governing issues / PR

- Parent benchmark: #9
- Engineering source gate: #12
- Completed commercial design gate: #14
- Active source materialization gate: #15
- Draft integration PR: #13

## Starting checkpoint

`c10b629c6efc814bf458154c91bf2e96b4f3665f`

## Read first

1. `commercials/novael-arc/design/creative-direction.v1.3.json`
2. `commercials/novael-arc/storyboard/storyboard.v1.3.json`
3. `docs/NOVAEL_V1_3_ASSET_AND_AUDIO_PLAN.md`
4. `docs/NOVAEL_V1_3_IMPLEMENTATION_HANDOFF.md`
5. current canonical NOVAEL PNG source pack
6. Issue #15

The current v1.2 implementation may be read for technical context only. Do not change it in this phase.

## Objective

Materialize and govern exactly seven mandatory v1.3 commercial sources:

### Motion

- `commercials/novael-arc/assets/v1.3/motion/novael-arc-hook-sweep-v1.mp4`
- `commercials/novael-arc/assets/v1.3/motion/novael-arc-material-glide-v1.mp4`
- `commercials/novael-arc/assets/v1.3/motion/novael-arc-light-event-v1.mp4`
- `commercials/novael-arc/assets/v1.3/motion/novael-arc-hero-glide-v1.mp4`

### Audio

- `commercials/novael-arc/assets/v1.3/audio/novael-arc-mnemonic-stems-v1.wav`
- `commercials/novael-arc/assets/v1.3/audio/novael-arc-material-accents-v1.wav`
- `commercials/novael-arc/assets/v1.3/audio/novael-arc-bed-v1.wav`

Also create:

- `commercials/novael-arc/assets/v1.3/ASSET_SHA256.txt`
- `commercials/novael-arc/assets/v1.3/MATERIALIZATION_REPORT.md`

## Product identity anchor

`shot-01-hero.png` remains the primary physical identity reference.

Use the complete canonical still pack as supporting reference.

Never accept motion because it is merely aesthetically similar.

## Motion workflow

Materialize one plate at a time in this order:

1. hook sweep
2. material glide
3. light event
4. hero glide

For each:

1. create candidate;
2. inspect first / middle / final frame;
3. inspect full-speed playback;
4. compare geometry/material identity to canonical reference;
5. PASS or REJECT;
6. only after PASS move to the next source.

Do not batch-approve candidates.

## Motion identity requirements

Across all relevant frames preserve:

- outer arch curvature;
- tip silhouette;
- shell thickness;
- diffuser path and width;
- base diameter and height;
- product/base junction;
- matte graphite shell;
- frosted diffuser;
- stone contact;
- warm amber only.

Reject:

- morphing;
- changing proportions;
- floating base/contact;
- invented seams, controls, ports, buttons or cables;
- unrelated props;
- people/hands;
- text or logos baked into source;
- texture crawl;
- frame pumping;
- stutter/duplicate-frame pseudo-motion;
- neon/fantasy light;
- AURORA green/emerald carryover.

## Motion technical requirements

Each accepted MP4:

- progressive;
- 1080×1920 minimum;
- 30 fps minimum;
- no baked typography;
- no required alpha;
- sufficient unique motion frames;
- decodable end-to-end.

Minimum usable source:

- hook sweep: ≥2.0 s / ≥60 unique frames
- material glide: ≥3.5 s / ≥105 unique frames
- light event: ≥5.5 s / ≥165 unique frames
- hero glide: ≥5.0 s / ≥150 unique frames

If a higher-resolution or higher-frame-rate master is used, retain provenance and document deterministic conversion.

## Per-motion source rules

### Hook sweep

- near-black charcoal opening with authentic warm inner edge;
- product context appears early enough to avoid unrelated abstract light;
- genuine macro tracking along real inner curve;
- brisk first 0.45 s then deceleration;
- partial three-quarter crescent by editorial 1.5 s;
- no fake orbit;
- no still zoom substitute.

### Material glide

- genuine macro glide over graphite/frosted junction;
- minimal parallax;
- stable focus priority;
- no invented seam/fastener/texture;
- shell thickness and diffuser width stable;
- no still pan substitute.

### Light event

This source has the strictest gate.

- same product geometry throughout;
- starts lower-warmth but readable;
- illumination rises **globally and spatially coherently**;
- relative illumination pattern remains stable;
- no internal region-to-region or base-to-tip directional chase;
- no visible mechanism/control;
- no neon tube/bloom wash;
- fully lit hero state by editorial 3.9 s;
- stable lit hold ≥1.1 s;
- camera push ≤3%;
- base-to-tip direction is NOT baked into this plate.

Any violation = REJECT.

### Hero glide

- fully lit whole product;
- genuine restrained lateral camera glide;
- constant lens height;
- only modest perspective reveal;
- no unseen-geometry hallucination;
- ends compatible with S08 still family;
- no floating contact or proportion drift.

## Audio workflow

Create the three audio packages as versioned source material, not as the final mastered commercial mix.

### Mnemonic stems

Three-note rising contour based on A3–C#4–E4 or a transposition preserving the interval contour.

Must include:

- note 1;
- note 2;
- note 3;
- expanded hero figure;
- final glass-and-stone sting.

Must not sound like:

- notification;
- appliance startup;
- cinematic boom;
- sci-fi zap.

### Material accents

Must provide timing-ready versions of:

- stone click;
- reverse-air pull;
- frosted brush;
- graphite tap;
- arc-wipe punctuation;
- dry exit tick.

Tactile and restrained. No machinery implication.

### Bed

- 48 kHz / 24-bit PCM / stereo;
- 30.000 s exactly, or deterministic versioned stems with exact timeline metadata;
- sparse warm foundation;
- narrowing/suspension before S05;
- broadest harmonic width at S05;
- S06 decay + 350 ms near-silent pocket;
- renewed S07 pulse;
- simplified S08/S09 support;
- digital silence by 29.92 s;
- no tail beyond frame 899.

## Audio acceptance

For every accepted package verify:

- 48 kHz;
- 24-bit PCM;
- stereo;
- no clipping;
- mono fold-down;
- phone-speaker audibility;
- no sub-only identity;
- correct mnemonic contour / event identity.

Human listening is required. File existence is not acceptance.

## Required evidence

Probe every MP4 and WAV.

Record at minimum:

### MP4
- filename
- codec
- width/height
- fps
- frame count
- duration
- pixel format
- decodability
- first/middle/final frame identity observations
- full-speed playback verdict

### WAV
- filename
- sample rate
- bit depth/sample format
- channels
- duration
- peak/clipping status
- mono-fold review
- phone audibility review

## Manifest

`ASSET_SHA256.txt` must list exactly the seven accepted media sources.

No rejected candidate belongs in the accepted manifest.

## Materialization report

`MATERIALIZATION_REPORT.md` must include:

- source generation/capture provenance;
- exact tool/model/version where available;
- reference inputs;
- candidate/rejection history in concise form;
- accepted technical metadata;
- identity review;
- perceptual review;
- known limitations;
- exact SHA-256 values;
- final `SOURCE_PACK_PASS` or `SOURCE_PACK_HOLD` recommendation.

Do not claim GPT acceptance yourself.

## Prohibited

Do not modify:

- v1.3 design files;
- v1.3 storyboard;
- canonical v1.2 PNG source bytes;
- current v1.2 implementation;
- renderer/timeline/recipe;
- validation runtime;
- mastering runtime;
- PR #13 merge state.

Do not implement the v1.3 commercial yet.

## Stop point

When all sources are locally accepted:

1. probe all media;
2. produce manifest/report;
3. run `git diff --check`;
4. report exact changed/untracked files;
5. do not commit or push;
6. provide the seven accepted files + manifest/report for independent GPT review.

## State

`V1_3_SOURCE_MATERIALIZATION_AUTHORIZED / PRODUCTION_IMPLEMENTATION_NOT_AUTHORIZED`
