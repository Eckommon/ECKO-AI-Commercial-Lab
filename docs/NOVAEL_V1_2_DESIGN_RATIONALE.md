# NOVAEL ARC — design rationale

Design-only review package for NVA-002, Benchmark #002 / Issue #11. This rationale explains `commercials/novael-arc/design/creative-direction.v1.2.json`; the accompanying implementation handoff makes its treatment observable. Neither document supersedes the brief, storyboard or canonical assets. Independent GPT design acceptance is pending; this package does not declare DESIGN_PASS or authorize production.

## Thesis and selected approach

Light held as form. First recognize the continuous arc, then look closely at its material, name its form, let warmth arrive, and give the object space to remain. The open interior of the crescent and the empty space above it are active compositional elements. The film earns attention through changes in photographic scale, illumination emphasis and stillness. A viewer should remember a grounded sculptural object even without seeing a brand name.

Three approaches were considered: an architectural photographic sequence, a typography-led graphic sequence, and a simulated spatial-light study. The photographic sequence is selected because the locked sources already carry material, contact and atmosphere. A typography-led approach would compete with the product and sparse governed copy. A spatial-light simulation would require unseen geometry or separated emission information the flattened plates do not provide. This choice is a treatment decision, not a new campaign concept or asset request.

NOVAEL differs from AURORA in editorial structure as well as palette: charcoal, graphite, stone and photographed amber; sans-serif complete-phrase reveals; hard photographic cuts; one sustained illumination event; and a completely still S05. There is no kinetic climax, scan, condensation, beverage motif, emerald atmosphere, impact shake or inherited campaign transition logic. The earlier benchmark informs source discipline and useful holds only.

## Hierarchy and scene families

The arc and grounded base lead, followed by existing diffuser warmth, then editable copy, then the environment. In S02 the photographed shell/diffuser junction takes the whole-object role; it does not become a technical diagram. Native stone and reflection remain attached to the object photograph. Added atmosphere would compete with the existing subtle tonal structure and is excluded.

| Family | Beats | Editorial purpose |
|---|---|---|
| `sculpture-in-space` | S01, S05 | Recognize the object, then return to it without visual demands. |
| `material-study` | S02 | Read the authored material junction and curvature. |
| `editorial-object` | S03, S06, S07 | Pair a stable object with the exact governed statement. |
| `light-presence` | S04 | Reveal existing illumination as one controlled event. |

These are semantic treatment families, not required component names. The editorial family has a final-card variant through beat intent, not an additional runtime architecture requirement.

## Pacing, activation and holds

The handoff specifies relative settling deadlines inside the existing beats. It does not change their lengths or introduce cuts within them. S01 becomes fully legible early; S02 permits only a modest approach before stopping. S03 holds the entire word while the object is still. S04 starts its single reveal with the governed `light-rise`, arrives at native source appearance early enough to contemplate it, and stays there. S05 is still from entry through exit. S06 returns to the already settled lit object without replaying activation. S07 gives the whole closing line a long final hold and keeps it through the last frame.

The source assigned to S04 is already illuminated. Activation therefore means a perceptual reveal of that photograph, including its baked spatial warmth. It must not look like a measured lamp startup, a controllable dimming feature, a progressive electrical circuit, or an invented physically simulated wall response. Uniform attenuation can recede to reveal native appearance; it never boosts the source beyond its existing highlights. The audio-only emphasis fallback remains meaningful if visual attenuation cannot preserve detail.

The return from S04 to the quieter S05 source is a deliberate editorial change of view/state, not a demonstrated switch-off. Hard-cutting and allowing the audio resonance to recede avoids making a false continuous lighting demonstration. No relighting is allowed to disguise this governed source sequence.

## Typography and transitions

Use a restrained modern sans-serif in medium weight, warm off-white, with modest fixed tracking. Support words share size and alignment; the longer close may be smaller or use a deliberate two-line break. Reveal the complete phrase together through opacity, then leave it fixed. Avoid fine hairlines that disappear at phone size. Text remains editable in code and comes directly from storyboard copy.

The preferred region is the existing space above the arc. Do not lay copy across the diffuser, base or stone detail. The handoff gives conservative text-zone and readable-size targets and a whole-source layout fallback. There is no added NOVAEL wordmark: asset-generation guidance mentions branding, but the higher-priority storyboard supplies only the campaign line for S07. Brand memory is carried by the object and that governed line. A new wordmark would require separate governance.

All six inter-beat boundaries use hard cuts. These cleanly distinguish detail from whole object, statements from observation, and lit emphasis from rest. Cross-dissolves would double outlines or blend nonidentical source geometry. No outgoing transition consumes a copy hold or puts the next beat's source ahead of its governed boundary. The only picture reveal is internal to S01 or S04; typography reveals are internal to their own assigned beats. The last picture does not fade out.

## Audio structure

Use sparse sustained tone with low density and soft edges, no voiceover, regular percussion drive or cinematic impact stack. The governed `sub-hit` events at S01, S03, S06 and S07 become rounded low punctuation: opening presence, quieter editorial point, gentle return, final resolution. Their placement stays at the governed beat boundaries; text arrival does not create new cues. S02 and S05 receive no added discrete events.

S04's `light-rise` opens gradually in harmonic warmth and perceived width with the picture reveal, then rests. It is the broadest spectral opening, not a transient peak or loudness contest. S05 lets this resonance recede into a near-silent bed with no build toward S06. The close resolves within the existing endpoint. Preserve audibility of the quiet structure on phone speakers and in mono without requiring the low accents to sound like physical lamp operation. This is audio intent only; no synthesis, mix or mastering mechanism is prescribed.

## Source observations, treatment and fallbacks

All five canonical PNGs were visually inspected in this design pass. Their hashes and byte identity are checked separately against checkpoint `79c13d9cba78c890df751c845dadfc15d68012ac`.

- Hero: full crescent, base, contact and surface reflection are present; the diffuser already carries warmth. Preserve this rather than manufacturing a fully off lamp.
- Detail: an authored enlarged crop, with the tip/base partly outside the image. Preserve the shell/diffuser junction; do not invent missing geometry or sharpen synthetic detail.
- Profile: the product is shifted right, with a visible vertical band at the left and a lower surface discontinuity. Treat these as locked source content. Do not patch them or pretend the photograph provides new three-dimensional viewing freedom.
- Lit: substantially the same view family as the hero, with warmer existing highlights. Emission, environment and reflection are flattened together. Only whole-image reveal is authorized.
- End card: the full product sits beneath useful upper space; a horizontal tonal band is visible near the top. Keep it fixed and preserve it. No campaign copy is baked into the plate.

Every treatment sets `allowMask=false` and `allowSourceDerivedCleanup=false`. Isolation is optional in the Factory concept and unnecessary here; this checkpoint deliberately selects its whole-source-safe branch. It does not authorize trying extraction first. Any later proposal to mask or repair these sources needs a reviewed design amendment, never silent fallback escalation.

Fallback order: remove camera motion; reduce unsafe attenuation; use native still appearance; move editable typography into a separate plain upper field while containing the entire source below it. No background extension, content-aware fill, local matte, source substitution, regenerated image or reconstructed product is part of a fallback. If the baked bands are unacceptable, report a governance hold instead of changing the canonical pack.

## Quality risks and boundaries

The activation difference is intentionally subtle; the reveal and audio must communicate arrival without claiming physical switching behavior. Phone-size evaluation must establish that graphite edges survive attenuation and that the support words remain subordinate but readable. Very small scale movement may still expose resampling softness, especially on the detail image; stillness is preferred to damaged material. SDR compression may band the charcoal gradients or obscure contact shadows. Warm highlights must retain diffuser texture and cannot become a white neon stripe. Native source bands remain a disclosed visual limitation, not a design-validation failure to be concealed.

These are unresolved implementation/media risks. No render, temporal QA, audio listening, mastering verification or human full-speed playback is claimed by this package. Machine design checks cannot establish final perceptual acceptance. Independent GPT design review precedes production; human full-speed playback remains the later publication gate.

The integrity check also exposes a checkout caveat: the five PNGs and `ASSET_SHA256.txt` match raw checkpoint bytes exactly. The brief, storyboard, `ASSET_GENERATION_SPEC.md` and `GENERATION_MISSION.md` have CRLF working-tree endings versus LF checkpoint blobs under `core.autocrlf=true`; each matches Git's filtered checkpoint checkout exactly. The initial tree was clean and this design work does not touch these inputs. Thus repository-content integrity is preserved, but literal raw-blob byte identity for all governed working files is not a PASS. No line-ending normalization is performed because governed-input modification is prohibited; independent review must acknowledge this exception.

## Portability lessons and schema limits

NOVAEL-specific choices are the arc-led hierarchy, graphite/amber balance, top-space typography, all-hard-cut sequence, completely still S05, and the perceptual interpretation of this flattened lit plate. Source bands, safe framing, text placements and any future source adapter belong to this campaign, never generic Factory logic.

Generalizable lessons are semantic scene-family routing, stable-hold deadlines distinct from beat duration, cue-specific meaning instead of interchangeable hits, a valid zero-motion treatment, uniform whole-source fallbacks, and separating an editorial lighting reveal from physical relighting. Generic facilities may support these capabilities without assuming that every campaign needs amber light, top-aligned sans type, no masks or the same quiet pacing.

The existing schema validates shape, not exact beat coverage, unique family IDs, reference resolution, cue fidelity or source hashes. It has no typed fields for settle deadlines, hold windows, text-safe zones, transition ownership, or a distinction between perceptual activation and physically simulated emission. Those intents remain in its existing prose fields and are made reviewable in the required handoff. No extra JSON keys, new schema, runtime validator, sidecar design authority or production code is introduced. A future executor must validate semantics separately; structural schema success alone is insufficient.
