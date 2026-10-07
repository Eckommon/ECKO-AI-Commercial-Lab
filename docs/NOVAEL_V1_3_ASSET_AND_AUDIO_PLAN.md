# NOVAEL ARC v1.3 — Asset and Audio Plan

Status: `DESIGN_ONLY / SOURCES_REQUIRED / IMPLEMENTATION_NOT_AUTHORIZED`

The five existing PNGs were visually audited at their native 1080×1920 dimensions. They preserve a coherent graphite crescent lamp, frosted inner diffuser, low circular base, stone surface and warm amber world. They are useful anchors, but the human playback finding is correct: they cannot supply enough real movement for a 30-second advertisement. Four purpose-shot motion plates are mandatory and currently unavailable.

## Existing-source matrix

| Existing source | Classification | v1.3 role | Reason / treatment |
|---|---|---|---|
| `shot-01-hero.png` | KEEP | S02 recognition; REWORK use in S04 proposition | Strongest complete product identity and negative space. Preserve bytes. Permit only whole-plate 1–2.5% motion and campaign-specific arc reveal over the intact plate. |
| `shot-02-detail.png` | REWORK | Reference for S03 motion plate; optional ≤0.7 s insert | Strong curvature/material detail but no inherent motion and cropped geometry. Preserve bytes; do not stretch into a three-second still pan. |
| `shot-03-profile.png` | REPLACE | Not used | Baked left-edge block and lower surface discontinuity, near-duplicate view, and weak improvement over hero make repair unjustified. Replace its editorial function with the S07 motion plate; do not modify the canonical file. |
| `shot-04-lit.png` | REWORK | S06 release and S08 campaign-line anchor | Useful lit hero and consistent geometry. Preserve bytes. Match required motion-plate endpoints; use only restrained whole-plate movement and exterior graphic echo. |
| `shot-05-endcard.png` | REWORK | S09 final brand card | Best centered close and usable negative space. Preserve bytes and baked upper band. Add editable type and one short arc trace; no cleanup. |

`KEEP` means accepted as an intact identity anchor. `REWORK` means the canonical bytes remain untouched but the source receives bounded runtime framing, type or graphic treatment. `REPLACE` means the source remains in the repository but is not used by v1.3.

## New-source matrix

| Proposed source | Classification | Availability | Required |
|---|---|---|---|
| `novael-arc-hook-sweep-v1.mp4` | ADD | Unavailable | Yes |
| `novael-arc-material-glide-v1.mp4` | ADD | Unavailable | Yes |
| `novael-arc-light-event-v1.mp4` | ADD | Unavailable | Yes |
| `novael-arc-hero-glide-v1.mp4` | ADD | Unavailable | Yes |
| `novael-arc-mnemonic-stems-v1.wav` | ADD | Unavailable | Yes |
| `novael-arc-material-accents-v1.wav` | ADD | Unavailable | Yes |
| `novael-arc-bed-v1.wav` | ADD | Unavailable | Yes |

No listed ADD source may be treated as present until materialized, reviewed and hashed. A later executor must fail closed if any mandatory source is absent.

## Motion-source specifications

### ADD — `novael-arc-hook-sweep-v1.mp4`

- Purpose: first-1.5-second attention hook and motion handoff into whole-product recognition.
- Start visual state: near-black charcoal frame with one authentic warm edge of the inner diffuser entering from lower-right/center; enough context to avoid an abstract unrelated light streak.
- End visual state: partial but unmistakable three-quarter crescent silhouette aligned to `shot-01-hero.png`, ready for an arc wipe into that still.
- Camera behavior: genuine macro track along the inner curve; brisk acceleration over the first 0.45 s, then controlled deceleration. No digital orbit.
- Required source length: minimum 2.0 s of clean picture; editorial use is 1.5 s.
- Loopability: not required and must not be looped.
- Geometry consistency: exact outer arc curvature, shell thickness, diffuser path, base proportions and matte graphite/frosted boundaries from `shot-01-hero.png`.
- Background/material constraints: charcoal studio, graphite shell, frosted diffuser, warm amber edge only; no props, people, beams, neon or green.
- Baked type: none.
- Minimum resolution/frame rate: 1080×1920, 30 fps, progressive, at least 60 unique frames; source may be higher resolution but must preserve 9:16 crop safety.
- Acceptance: no temporal warping, duplicate-frame stutter, geometry morph, new seams or highlight clipping; product partially recognizable by editorial 0.7 s.
- Failure behavior: `MISSING_MANDATORY_MOTION_SOURCE` or `MOTION_IDENTITY_MISMATCH`; no still zoom fallback.

### ADD — `novael-arc-material-glide-v1.mp4`

- Purpose: tactile material/form seduction in S03.
- Start visual state: recognizable graphite outer shell and frosted inner diffuser junction at upper-left curvature.
- End visual state: same junction further down the continuous curve, with lighting/material boundary unchanged.
- Camera behavior: slow genuine lateral macro glide with minimal parallax, constant focus priority on the material boundary and no focus-rack gimmick.
- Required source length: minimum 3.5 s; editorial use is 3.0 s.
- Loopability: not required.
- Geometry consistency: curvature maps unambiguously to `shot-01-hero.png` and `shot-02-detail.png`; no invented seam, control, fastener or texture.
- Background/material constraints: neutral charcoal/graphite, physically plausible specular response, no colored accent other than restrained amber reflection.
- Baked type: none.
- Minimum resolution/frame rate: 1080×1920, 30 fps, progressive, at least 105 unique frames.
- Acceptance: shell thickness and diffuser width remain stable frame to frame; no texture crawl, wobble or synthetic sharpening.
- Failure behavior: fail closed after any optional ≤0.7 s still insert; do not pan the detail still for three seconds.

### ADD — `novael-arc-light-event-v1.mp4`

- Purpose: central light transformation/hero event in S05.
- Start visual state: three-quarter whole lamp matching S04 hero family, readable in a quiet low-warmth state without crushing the graphite silhouette.
- End visual state: same exact geometry fully lit through a global, spatially coherent increase in warm output, with controlled amber diffuser, retained texture and restrained plausible spill compatible with `shot-04-lit.png`.
- Camera behavior: slow maximum 3% push; lens height and angle remain constant.
- Required source length: minimum 5.5 s; editorial use is 5.0 s.
- Loopability: no.
- Geometry consistency: immutable arch, base, diffuser path, shell thickness and material boundary across every frame.
- Background/material constraints: same dark stone/charcoal world; no volumetric beam, neon tube, bloom wash, visible control or physical mechanism.
- Baked type: none.
- Minimum resolution/frame rate: 1080×1920, 30 fps, progressive, at least 165 unique frames.
- Acceptance: warm output increases continuously and spatially coherently across the complete diffuser, reaches its end by editorial 3.9 s, and holds at least 1.1 s. Diffuser topology, relative illumination pattern, geometry and material boundaries remain stable; no internal directional, region-to-region or base-to-tip chase, frame pumping, geometry drift or clipped diffuser is permitted. Base-to-tip direction is added later only as an exterior graphic trace outside the product silhouette.
- Failure behavior: `MISSING_MANDATORY_LIGHT_EVENT` or `MOTION_IDENTITY_MISMATCH`. Crossfading or brightness-tweening existing stills is explicitly prohibited.

### ADD — `novael-arc-hero-glide-v1.mp4`

- Purpose: restore attraction after controlled release and create a genuine moving hero before the close.
- Start visual state: fully lit whole product in a slightly off-center three-quarter view compatible with S06.
- End visual state: centered lit whole product compatible with `shot-04-lit.png` and the S08 arc wipe.
- Camera behavior: subtle lateral glide with constant lens height and restrained perspective change; no more than the unseen geometry can support.
- Required source length: minimum 5.0 s; editorial use is 4.5 s.
- Loopability: not required.
- Geometry consistency: exact canonical product identity, including base diameter/height, shell thickness, diffuser width and top-tip curvature.
- Background/material constraints: dark neutral studio, stone contact, controlled amber emission; no props, hands, logo or generated typography.
- Baked type: none.
- Minimum resolution/frame rate: 1080×1920, 30 fps, progressive, at least 150 unique frames.
- Acceptance: no morphing, floating contact, surface crawl or changing product proportions; end frame must match S08 within reviewed scale/color tolerances.
- Failure behavior: fail closed. A 4.5-second Ken Burns move on a still is not an authorized substitute.

## Motion-plate acquisition and identity gate

Reference-guided generation or controlled 3D/product capture is acceptable only if `shot-01-hero.png` remains the identity anchor. Generate one plate at a time. Review the first, middle and final frames plus a full-speed playback before accepting the next. For every plate compare:

1. outer arch curvature;
2. tip silhouette;
3. shell thickness;
4. diffuser path and width;
5. base diameter/height;
6. product-to-base junction;
7. matte graphite and frosted material boundary;
8. contact with surface;
9. warm amber only;
10. absence of text, controls, ports, people or unrelated props.

Any mismatch means REJECT/REGENERATE. Compositing may not repair product identity. Accepted bytes require a versioned manifest and SHA-256 entries before implementation.

## Audio identity

### Sonic mnemonic

Use a three-note rising figure based on A3–C♯4–E4 (220.00, 277.18 and 329.63 Hz) or a transposition preserving the major-third/minor-third contour. Timbre combines a warm struck-glass fundamental, short graphite/stone contact and breath-like harmonic tail. It must not resemble a notification sound, appliance startup or cinematic logo boom.

Mnemonic use:

- 0.0–1.5: tactile click + notes 1–2;
- 1.5–2.25: note 3 resolves with product/name recognition;
- 7.35/8.05/8.75: soft harmonic fragments support proposition groups;
- 10.5–14.2: expanded figure builds through the light event and resolves at hero arrival;
- 23.0–26.5: notes 1–2 establish final expectation;
- 27.15: note 3 plus glass-and-stone sting resolves the name.

### ADD — `novael-arc-mnemonic-stems-v1.wav`

- Purpose: isolated mnemonic notes, light-event expansion and final sting for editorial timing.
- Contents: separate labeled stereo stems or clearly separated regions for notes 1, 2, 3, expanded hero figure and final glass-and-stone sting.
- Format: 48 kHz, 24-bit PCM WAV, stereo; mono-compatible fundamentals.
- Required length: up to 30 s timeline-aligned stem or individual stems with exact cue metadata.
- Acceptance: recognizable contour across three contexts, no clipped transient, no notification/appliance association, survives mono and phone playback.
- Failure behavior: audio design hold; do not replace with generic sub-hits.

### ADD — `novael-arc-material-accents-v1.wav`

- Purpose: opening stone click, reverse-air pull, frosted brush, graphite tap, arc-wipe punctuation and S06 dry exit tick.
- Format: 48 kHz, 24-bit PCM WAV, stereo; each event available dry enough for timing.
- Character: tactile, close and restrained; no metallic sci-fi zap, switch click or machinery implication.
- Acceptance: each event remains distinct at phone volume and mono without dominating the mnemonic.
- Failure behavior: omit an unsafe accent and rebalance; never substitute a loud generic impact.

### ADD — `novael-arc-bed-v1.wav`

- Purpose: tonal continuity, anticipation, width change, controlled release and endpoint.
- Structure: sparse warm foundation in S01–S04; narrower suspended state before S05; broadest harmonic width at S05; decaying room tone and 350 ms near-silence in S06; renewed pulse in S07; simplified support in S08–S09.
- Format: 48 kHz, 24-bit PCM WAV, stereo, exactly 30.000 s or a deterministic assembly of versioned stems.
- Endpoint: digital silence by 29.92 s, no tail beyond frame 899.
- Acceptance: audible on phone speakers, stable mono fold-down, no low-frequency-only identity, no clipping, and clearly weaker commercial impact when muted during human review.
- Failure behavior: hold audio acceptance and revise balance/timbre; file existence alone is not pass evidence.

## Cue map

| Time | Event | Visual alignment |
|---:|---|---|
| 0.00 | Stone click + reverse-air pull | First warm edge |
| 0.35–1.30 | Mnemonic notes 1–2 | Macro acceleration and crescent reveal |
| 1.50–2.25 | Mnemonic note 3 | Whole product and complete name |
| 4.25 | Frosted brush | First material boundary pass |
| 5.65 | Graphite tap | Second macro detail |
| 7.35 / 8.05 / 8.75 | Three harmonic pulses | Proposition groups |
| 10.50–14.20 | Expanded mnemonic build | Genuine light transformation |
| 14.20 | Soft bright arrival | Fully lit hero |
| 15.50–18.15 | Resonance decay | Controlled release |
| final 0.35 s of S06 | Near-silent pocket + dry tick | Contrast and S07 cut |
| 18.50–23.00 | Shortened mnemonic pulse | Hero glide |
| 23.00–26.50 | Mnemonic notes 1–2 | Campaign-line resolve |
| 27.15 | Note 3 + brand sting | Final name lock |
| 29.92 | Digital silence | End hold remains visible |

## Later audio acceptance

After production is authorized, test and listen for:

- exact cue-to-frame timing;
- deterministic generation or versioned source provenance;
- 48 kHz stereo and mono fold-down;
- phone-speaker audibility of mnemonic contour and material accents;
- integrated loudness, loudness range and true peak appropriate to the delivery context;
- no transient clipping, sub-only cues or endpoint overrun;
- audible contrast between S05 peak and S06 release;
- final sting recognition without excessive loudness;
- human full-speed audiovisual playback, including a muted/unmuted comparison.

The prior `novael-bed.wav` and generic `sub-hit` grammar are not v1.3 sources. They may inform technical reproducibility only and must not be reused as creative authority.

## Blocking summary

The design is feasible but not implementation-ready. Four mandatory motion plates and three required audio source packages are ADD/unavailable. Independent GPT design acceptance, source materialization, visual/listening review, hashes and a separate implementation authorization are required before any production code changes.
