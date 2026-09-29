# NOVAEL ARC — implementation handoff for Sol/Codex

Status: design prepared for independent GPT review; IMPLEMENTATION_NOT_AUTHORIZED. Issue #11 must receive independent DESIGN_PASS before production begins. This document is observable treatment intent supporting the Creative Direction Contract, not authorization to build or release.

## Authority and invariants

- **MUST** derive campaign identity, delivery, beat boundaries, purposes, asset assignments, copy and cue membership from the governed brief/storyboard. Preserve NVA-002, 30 seconds, 1080x1920, 30 fps and exactly 900 downstream frames; preserve all seven beats and their exact existing semantics. Claims remain empty.
- **MUST** use the canonical five PNGs and manifest at `79c13d9cba78c890df751c845dadfc15d68012ac`. Do not modify brief, storyboard, manifest or source bytes. The design contract references beat IDs rather than duplicating those inputs.
- **MUST** inherit cue onset from the corresponding governed beat boundary. A cue's designed envelope can extend within its beat, and continuous bed/reverb may bridge cuts, but this never changes a cue's identity or creates another event.
- **MUST** preserve editable typography and exact governed wording and punctuation. Do not add a wordmark, CTA, specification, claim, subtitle or voiceover. Asset-generation notes do not override storyboard copy.
- **MUST** treat all treatment deadlines below as local offsets from the existing beat start, not replacement editorial timings. At 30 fps, frame offsets are zero-based; a deadline means fully settled on that offset's frame. Settled means no remaining transform, text-opacity or reveal-envelope change for the stated hold.

## Per-beat essentials and temporal acceptance

All inter-beat picture transitions **MUST** be hard cuts at the governed boundary. Incoming imagery **MUST NOT** appear before its beat. Only the assigned source is used within each beat. The following deadlines are maximum settling times, not mandatory animation lengths.

| Beat | MUST: essential behavior | Latest settling point and required hold | Later temporal QA evidence |
|---|---|---|---|
| S01 | Reveal a coherent whole arc, base and contact; no type. The first frame still gives a readable silhouette. | Whole-image reveal and any scale change finish by local 1.0 s / frame 30; hold unchanged to exit. | Entry, frame 30, middle and last frame show intact tip/base/contact and no later motion. |
| S02 | Show the authored material junction; no reconstructed geometry, labels or extra cue. | Any very small uniform scale change finishes by local 2.0 s / frame 60; final 2 s are still. | Junction remains coherent at entry/settle/last frame; no texture swim or synthetic highlight sweep. |
| S03 | Keep the whole profile fixed and reveal the complete `FORM.` together above it. | Text reaches full opacity by local 0.5 s / frame 15; hold picture and full word to exit. | Complete punctuation and word at frame 15 and through last frame; no product overlap or hidden source repair. |
| S04 | Fixed camera; one monotonic uniform reveal of the already-lit plate, synchronized to `light-rise`. | Reveal and audible opening settle by local 2.0 s / frame 60; retain native picture appearance for the remaining 3 s. | Entry/quarter/half/settle samples show a gradual reveal with no overshoot, moving emission edge, invented spill or lost geometry; final hold has no pulsing. |
| S05 | Whole assigned source at native appearance, no text, no added effect or cue. | Fully still from local frame 0 through exit, all 5 s. | Entry/middle/last frame maintain the same picture placement and treatment; audio density recedes, never builds. |
| S06 | Lit source already settled at entry; reveal complete `GLOW.` without repeating activation. | Text fully visible by local 0.5 s / frame 15; hold picture and word to exit. | Native illumination at entry; complete word at frame 15; no second rise, glow pumping or late movement. |
| S07 | Fixed complete product and exact `HOLD THE LIGHT.`; whole phrase arrives together. | Text fully visible by local 0.5 s / frame 15; product and phrase persist through global frame 899. | Entry/settle/last frame show no late fade, missing word, moving type, cropped base or exit transition. |

S04's optical fallback **MUST** be recorded if used: a shallower uniform reveal first, or a native still with the full governed audio rise if attenuation is unsafe. Under the still fallback, QA expects stable native pixels instead of a visual ramp; the cue must still open and settle by the same local deadline. This exception does not apply to removing or substituting the cue.

## Composition and readable type

- **MUST** preserve source aspect ratio, arc tip, base and contact in whole-object beats. The existing authored detail crop is the S02 exception; it is not permission to create missing detail.
- **SHOULD** use native source framing. S01/S02 **MAY** use a uniform scale excursion of no more than 2 percent above native fill, with no rotation or independent axis distortion, only while every relevant contour remains safe. No translation, parallax or orbit is needed. All other beats **MUST** keep the picture fixed.
- **SHOULD** place text in the upper negative space: approximately x=108..972 and y=154..300 at delivery size, aligned consistently, avoiding the source's left band. These are layout targets, not asset crops or mandatory glyph coordinates. **MUST** retain at least 48 px between rendered glyph bounds and the product silhouette and keep all type at least 108 px from either side and 154 px from the top/bottom.
- **SHOULD** use a medium-weight modern sans, warm off-white, fixed tracking between 0.02 and 0.06 em, support-word size around 76..88 px, and closing-line size around 60..72 px. **MUST** keep final type at least 60 px at delivery resolution, with no thin hairlines, glow, extruded depth or animated tracking. A licensed available font **MAY** be selected during implementation; exact font metrics require later layout verification.
- **MUST** reveal full phrases together using opacity only, fixed in place. The close **MAY** break after `THE` into two lines, preserving exact text and punctuation. It **MUST NOT** reveal the lines sequentially. Product hierarchy takes priority over maximizing type size.
- **MUST** use the safe layout fallback if readable type collides with the arc or has inadequate contrast: a plain charcoal upper field approximately 22 percent of the canvas, with the entire assigned source uniformly contained and centered in the lower 78 percent. Retain any resulting side bars as plain charcoal; do not stretch or extend source content. Fix this layout from beat entry, not as an animated rearrangement. Keep the product large enough to recognize at phone size; if that and the text constraints cannot coexist, report a design hold rather than altering copy or assets.
- **SHOULD** check readability at a 360x640 preview as well as delivery resolution. **MUST** distinguish geometric text fit from actual human readability and ensure any chosen fallback remains coherent across the editorial beats.

## Flattened imagery and activation

- **MUST** honor `allowMask=false` and `allowSourceDerivedCleanup=false` for every beat. This mission selects whole-source treatment; isolation is optional for Factory use, not a prerequisite or an enabled trial here.
- **MUST NOT** fake object extraction, hidden sides, depth-separated background, emitter-only animation, progressive LED startup, moving shadows, new reflection, replacement material, or local relighting. No inpainting, texture patches, source regeneration, alternate variants or cross-source morphs.
- **MUST** keep baked atmosphere, illumination, reflection and contact attached to the original plate. S04's warm spatial response is already photographed. Its uniform reveal is editorial emphasis, not a technical demonstration of the product.
- **SHOULD** start S04 with mild attenuation, roughly 80 percent of native whole-plate appearance over a neutral dark field, increasing monotonically to native appearance. This is a perceptual target, not a mandated transfer function. **MUST** maintain a readable silhouette at entry, never exceed native brightness, never animate a separate amber field, and use the declared fallback if gradients band or dark detail disappears. S01 likewise **MUST** avoid an unreadable black opening.
- **MUST** retain the profile's left-edge band and the end card's upper tonal band as source content. **MAY** choose the separate typography-field layout to keep text clear, but **MUST NOT** claim it removes or repairs those source features. If they fail downstream visual acceptance, stop for governance.
- **MUST** accept S04-to-S05 as an editorial cut to the governed quieter source. Do not synthesize a power-off transition, match the lighting by recoloring, or replace S05 with the lit plate.

## Audio intent

- **MUST** preserve `sub-hit` at S01/S03/S06/S07 and `light-rise` at S04. There is no `impact-hit`; S02 and S05 have no discrete cue. **MUST NOT** add cue events for typography reveals or uncued cuts.
- **SHOULD** interpret each low accent as soft rounded punctuation: S01 establishes presence, S03 is lighter, S06 gently returns to warmth, S07 resolves. **MUST NOT** turn them into camera impacts, explosive bass drops or simulated switch sounds.
- **MUST** give `light-rise` a sustained onset and gradual opening in warmth/width tied to S04's reveal, resolving by its local 2 s deadline. It **MUST** remain perceptibly different from the short low accents, including under the native-still visual fallback.
- **SHOULD** use a sparse continuous tonal bed with no metronomic percussion. S05 **MUST** have lower sustained density than S04, letting resonance recede toward near-silence. **MUST NOT** build an anticipation ramp there. **MAY** retain a very quiet continuous bed to avoid an abrupt digital void.
- **MUST** resolve the close within the governed endpoint without an appended tail; the picture remains visible while audio resolves. **SHOULD** preserve quiet contrast on phone speakers and mono fold-down without making the low accents dominate. Audio construction and measured delivery settings belong to later authorized production, not this design package.

## Generic core versus campaign recipe

Generic Factory support **SHOULD** handle family references, whole-source framing, fixed holds, bounded uniform reveals, editable text, cut ownership, cue-specific envelopes and source-safe fallback selection. It **MUST NOT** require a particular palette, source geometry, cue name, typography alignment or climax position for all campaigns.

NOVAEL's scene sequence, arc-safe zones, source-band awareness, warm neutral palette, quiet dynamics and choice to disable masking **MUST** remain campaign treatment. Optional future isolation/cleanup adapters **MUST NOT** be smuggled into this implementation through generic primitives. Component/class naming and the executor's internal architecture remain open; observable behavior and governed boundaries are mandatory.

## Later acceptance and present boundary

After independent design acceptance, the executor **MUST** fail closed on missing assets, SHA mismatch, timing gaps, wrong copy/cues, missing/duplicate beats, unresolved family references or contract drift. Existing schema success alone does not enforce these semantic conditions. The prose deadlines and layout targets above require explicit later QA interpretation; this mission does not change the schema or write validators.

The executor **MUST** run `npm run validate` before any authorized render and render only after it passes. A current AURORA-only path must not be treated as NOVAEL coverage. Later production **MUST** verify 900 frames, SDR BT.709 conversion/signaling, yuv420p, decodability, temporal holds and boundaries, and audio timing and delivery measurements. Dark gradients, diffuser detail, source bands, phone-size readability and the subtle activation require actual visual/listening review. Human full-speed audiovisual playback remains a separate publication gate.

This design pass stops with the three requested deliverables, schema/coverage checks, checkpoint byte-integrity checks, scope verification and whitespace checks. It produces no renderer, motion/audio/mastering/runtime changes, media artifacts, production PR, commit or push. Independent GPT review is the next gate.
