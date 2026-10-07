# NOVAEL ARC v1.3 — Design-to-Implementation Handoff

Status: `DESIGN_ONLY / INDEPENDENT_GPT_REVIEW_REQUIRED / IMPLEMENTATION_NOT_AUTHORIZED`

This handoff describes observable behavior for a later executor. It is not production code, an implementation plan or permission to modify the v1.2 runtime. Independent GPT approval and materialization/acceptance of all mandatory ADD sources must occur first.

## Fixed delivery contract

- Campaign: `NVA-002`
- Product: NOVAEL ARC Lamp
- Duration: exactly `30.000 s`
- Frame rate: `30 fps`
- Frame count: exactly `900`, frames `0–899`
- Canvas: `1080×1920`
- Pixel delivery intent: `yuv420p`, SDR BT.709
- Typography: editable runtime layers
- Claims: none
- AURORA regression protection: mandatory

## Authority and binding

For v1.3 implementation, the approved v1.3 storyboard will govern beat semantics, timing, copy and source assignment. The approved v1.3 Creative Direction Contract will govern treatment. The v1.2 storyboard, design and implementation remain historical baselines and must coexist unchanged.

The executor must introduce a new v1.3 implementation lock and explicit raw-byte hashes only after independent design approval. It must not repoint the v1.2 lock, silently modify canonical stills, or infer that Issue #14 authorizes production.

## Frame-exact beat map

| Beat | Seconds | Frames | Duration | Function | Primary source |
|---|---:|---:|---:|---|---|
| S01 | 0.0–1.5 | 0–44 | 45 | Hook | ADD `novael-arc-hook-sweep-v1.mp4` |
| S02 | 1.5–4.0 | 45–119 | 75 | Recognition/name | KEEP `shot-01-hero.png` |
| S03 | 4.0–7.0 | 120–209 | 90 | Material seduction | ADD `novael-arc-material-glide-v1.mp4` |
| S04 | 7.0–10.5 | 210–314 | 105 | Proposition | REWORK `shot-01-hero.png` |
| S05 | 10.5–15.5 | 315–464 | 150 | Light hero event | ADD `novael-arc-light-event-v1.mp4` |
| S06 | 15.5–18.5 | 465–554 | 90 | Controlled release | REWORK `shot-04-lit.png` |
| S07 | 18.5–23.0 | 555–689 | 135 | Moving hero desire | ADD `novael-arc-hero-glide-v1.mp4` |
| S08 | 23.0–26.5 | 690–794 | 105 | Campaign-line resolve | REWORK `shot-04-lit.png` |
| S09 | 26.5–30.0 | 795–899 | 105 | Brand-memory close | REWORK `shot-05-endcard.png` |

The intervals are contiguous: every beat begins on the frame after the previous beat ends. Total duration is `45+75+90+105+150+90+135+105+105 = 900` frames.

## Copy contract

Only the following runtime copy is authorized:

| Copy | Beats | Required full-state hold |
|---|---|---|
| `NOVAEL ARC` | S02, S07, S09 | S02: 2.25–4.0; S07: 21.0–22.6; S09: 27.2–30.0 |
| `LIGHT, HELD AS FORM.` | S04 | Fully readable by 9.0; hold to 10.5 |
| `HOLD THE LIGHT.` | S08, S09 | S08: 23.8–26.5; S09: 27.2–30.0 |

No CTA, factual qualifier, technical claim, logo text, URL, price or additional support copy may be introduced without a reviewed design amendment. `FORM.` and `GLOW.` from v1.2 are not v1.3 copy.

At 1080×1920, primary name cap height must be at least 92 px and secondary copy at least 58 px. Validate all complete-copy states at 360×640. Type must remain clear of the product, base and reflection.

## Beat observables

### S01 — 0–1.5 s / hook

- Required plate begins near-black with one authentic warm product edge.
- Camera follows the real inner curve; it may not synthesize an orbit.
- Product geometry becomes partially recognizable by 0.7 s and resolves toward three-quarter silhouette by 1.5 s.
- Arc trace hugs the visible crescent and supplies the wipe edge into S02.
- Audio states hook click, reverse-air pull and mnemonic notes 1–2.
- Missing or rejected plate is blocking.

### S02 — 1.5–4.0 s / recognition

- Whole lamp, base, arc tip and contact shadow are visible from entry.
- Whole-source push starts at 1.025 and settles at 1.0 by 2.7 s.
- `NOVAEL` arrives by 1.75; `ARC` locks by 2.25; complete name holds to 4.0.
- Mnemonic note 3 lands with whole-product/name recognition.

### S03 — 4.0–7.0 s / material seduction

- Required plate is a real lateral macro glide, not a pan across a still.
- Two tactile accents align at 4.25 s and 5.65 s.
- No copy.
- The final six frames may carry the amber arc wipe into S04.
- Missing or rejected plate is blocking.

### S04 — 7.0–10.5 s / proposition

- Intact hero plate pulls back no more than 2 percent and settles by 9.5 s.
- Copy groups begin at 7.35, 8.05 and 8.75; full line is readable by 9.0.
- Each group aligns to a harmonic pulse derived from the mnemonic.
- A two-frame editorial luminance dip at frame 313–314 may anticipate S05; it must not read as product switch-off.

### S05 — 10.5–15.5 s / hero light event

- Required plate starts in a frame family compatible with S04 and preserves identical geometry throughout.
- Genuine plate motion raises the product illumination globally and spatially coherently while camera pushes no more than 3 percent.
- Diffuser topology, relative illumination pattern, geometry and material boundaries remain stable throughout; no internal directional, region-to-region or base-to-tip chase is allowed.
- Fully lit product is achieved by 14.4 s and held through 15.5 s.
- A clearly editorial exterior arc trace may travel from base-side to tip-side and finish 120 ms after the plate reaches its globally lit hero state; all directional travel stays outside the product silhouette.
- No copy.
- Missing plate, geometry drift, changing relative illumination topology, any internal chase, neon appearance or clipped diffuser is blocking.
- Crossfading/brightness-tweening stills is prohibited as a fallback.

### S06 — 15.5–18.5 s / controlled release

- Match-cut from S05 endpoint to intact `shot-04-lit.png` must not visibly jump scale or color.
- Whole-source push is no more than 1.5 percent and stops by 17.2 s.
- Arc echo dissipates by 16.4 s.
- Full stillness is limited to 1.3 s.
- Preserve a 350 ms near-silent audio pocket before the dry exit tick.

### S07 — 18.5–23.0 s / moving hero desire

- Required plate is a real three-quarter lateral move with constant lens height and no geometry drift.
- It ends in the centered frame family needed for S08.
- A small `NOVAEL ARC` signature is visible from 21.0 through 22.6 s and then clears.
- Missing or rejected plate is blocking; a still pan is prohibited.

### S08 — 23.0–26.5 s / campaign line

- Arc wipe resolves to the intact lit plate by 23.35 s.
- Continuation push is no more than 1 percent and stops by 25.0 s.
- `HOLD THE LIGHT.` is fully readable by 23.8 s and holds through 26.5 s.
- Final mnemonic notes 1–2 remain unresolved at the cut.

### S09 — 26.5–30.0 s / brand memory

- Use intact `shot-05-endcard.png`; do not patch its upper band.
- Final arc trace ends by 27.35 s.
- `NOVAEL ARC` and `HOLD THE LIGHT.` are fully visible by 27.2 s and remain through frame 899.
- Mnemonic note 3 and glass-and-stone sting land at 27.15 s.
- Audio reaches digital silence by 29.92 s; picture never fades out.

## Source and compositing policy

- The four ADD motion plates are mandatory and unavailable at design time.
- `shot-01-hero.png`, `shot-02-detail.png`, `shot-04-lit.png` and `shot-05-endcard.png` remain unmodified canonical sources.
- `shot-03-profile.png` is not used in v1.3 because its baked left-edge/surface discontinuities and redundant framing do not justify remediation.
- Campaign-specific arc mattes are allowed only as whole-plate reveal/transition devices. They may not assert object separation or permit independent product/background parallax.
- No content-aware fill, background reconstruction, pixel cleanup, artificial orbit, geometry repair or independent emitter extraction is allowed.

## Audio observables

The later sound design must contain audibly distinct events, not only file-level cues:

1. hook click and reverse-air pull at 0.0;
2. mnemonic notes 1–2 during S01;
3. recognition note 3 at S02 entry/lock;
4. frosted brush at 4.25 and graphite tap at 5.65;
5. proposition pulses at 7.35, 8.05 and 8.75;
6. widening mnemonic build from 10.5 to 14.2 and soft arrival at 14.2;
7. hero resonance decay plus 350 ms near-silent pocket in S06;
8. shortened mnemonic pulse through S07;
9. final setup notes during S08;
10. final note and glass-and-stone sting at 27.15, tail ending by 29.92.

Mix acceptance must include mono fold-down, phone-speaker audibility, cue timing, no clipping, integrated loudness/true peak evidence and human listening. A deterministic generated file can satisfy reproducibility but cannot prove perceptual success.

## Fail-closed preconditions for later production

Before any v1.3 production work begins:

1. independent GPT accepts all five design deliverables;
2. all four ADD motion plates exist under governed filenames;
3. each plate passes side-by-side geometry/material identity review against `shot-01-hero.png`;
4. hashes and availability are added to a reviewed v1.3 asset manifest;
5. the v1.3 storyboard and Creative Direction Contract receive an exact-byte implementation lock;
6. an explicit implementation mission authorizes code changes.

If any condition is missing, return a blocking error. Do not silently fall back to the v1.2 composition.

## Later validation expectations

After implementation authorization, validation must cover:

- exact nine-beat order and 900-frame continuity;
- exact copy and hold timing;
- source presence, hashes and no unapproved substitutions;
- motion-plate frame rate, dimensions, duration, identity and endpoint compatibility;
- arc wipe placement and non-physical treatment boundary;
- phone-scale product/copy recognition;
- mnemonic/audio event timing and mono survival;
- absence of freezes except the authorized 2.8-second final hold;
- AURORA regression;
- SDR BT.709/yuv420p, 30 fps, 900 frames, full decode and duration padding;
- human full-speed audiovisual playback.

No render, audio generation, production validation or media acceptance is claimed in this design-only handoff.
