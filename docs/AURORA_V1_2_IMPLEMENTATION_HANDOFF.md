# AURORA v1.2 implementation handoff

Design-review candidate for Sol/Codex, 2026-09-11, Issue #6. Implement only under the subsequent implementation authorization and reviewed design. This document supplies requirements, not production code. It does not mark the broader issue complete.

Read `AGENTS.md`, `docs/FACTORY_V1_2_ROLE_MODEL.md`, `docs/BENCHMARK_001_LESSONS.md`, `factory/creative_direction.schema.json`, the campaign brief/storyboard/asset manifest, [design contract](../commercials/aurora-cold-brew/design/creative-direction.v1.2.json) and [rationale](AURORA_V1_2_DESIGN_RATIONALE.md). All required design context is on this branch; the Astra benchmark branch is not a dependency.

## MUST: invariants and design behavior

- Preserve ACB-001, the product identity, 40 seconds, 1080x1920, 30 fps and exactly 1200 video frames. Derive runtime values and beat/cue frames from governed sources; independently reject drift against the approved campaign values.
- Preserve exactly S01–S09, their order, purposes, boundaries, assets, copy, and sfx presence/names. Do not copy timing or strings from the rationale into a second runtime authority. Validate the creative JSON against its schema and require exactly one treatment per governed beat, valid unique family IDs and resolvable family references. Schema validity alone does not enforce those relations.
- Preserve the five canonical PNGs and their manifest hashes. `shot-02-macro.png` visibly contains the splash composition; `shot-04-impact.png` visibly contains the close macro crop. Keep their storyboard assignments. S02/S07 use restrained detail framing on shot-02; S05's optical impact uses shot-04.
- Apply the one-priority-per-beat hierarchy and all JSON fallback policies. Retain the governed motion intentions; do not turn tactile/orbit beats into new splash events or S08 into another impact.
- Settle S05 by local progress 0.32, S06 camera/type by 0.30 and S09 camera/type by 0.25. Complete S03 type by 0.25 and S08 by 0.40. Derive local-frame deadlines with ceiling rounding from governed duration. Hold completed copy through the final owning frame; hold settled product geometry in S05/S06/S09. No black fade inside S09.
- Use exact storyboard copy as code-editable text, including `AURORA` in S06 and empty copy in no-copy beats. Do not substitute baked raster words or OCR text. Clear outgoing editable copy at the boundary. Protect the central brand, rim and relevant silhouette.
- Use an opaque off-product upper editorial field on shot-05 as the baseline to cover the baked campaign headline for S06/S09; place the owning editable text there. Verify coverage through the full camera move. Optional clean same-source background restoration may replace the field only after temporal inspection. Never accept a double headline.
- Keep source-plate ownership exact at cuts. Mist/emerald may bridge peripherally; no crossfade between two product plates or leaking copy. The S05 exposure accent must remain restrained and removable without changing its purpose or cue.
- Keep product and pedestal in one source surface. All beat treatments have `allowMask=false`; no moving product cutout is required or permitted by this design. Optional cleanup requires `allowSourceDerivedCleanup=true`, stays off-product, and must move with its source. Never alter canonical source files.
- Keep cue timing on the common governed clock. S02 has no sfx cue; S05 retains `impact-hit`; other beats retain their `sub-hit`. Vary relative loudness/timbre to make S05 the strongest transient. No added voiceover, promotional language or cue schedule that changes governed semantics.
- For final delivery, verify actual SDR BT.709 handling and matching matrix/transfer/primaries/range metadata, yuv420p, exact visual runtime, faststart and stereo delivery. Report audio/container padding separately. Do not use metadata tags to conceal an incorrect signal transform.
- Preserve missing-source, invalid-reference, timing-gap and contract-drift failures as blockers. Run `npm run validate` before any production render, and render only after it passes. Human full-speed playback with sound remains a publication/release gate.

## SHOULD: quality targets

- Make the can more salient than added atmosphere. Use one perceptually prominent added atmospheric behavior at a time and reduce effect strength whenever label, silhouette or copy loses clarity.
- Use restrained warm-gold type, short entrances and stable whole-string holds. Aim for 6% horizontal / 8% vertical insets and at least 64 output pixels of capital height; verify both full resolution and a 270x480 view. Prefer line breaks over tiny type. Resolve and pin fonts/metrics for reproducibility.
- Use less travel and particle activity in S07 than S02. Concentrate S04's scan in its middle portion. The S06 hold should feel quieter than the preceding impact, and S09 should remain stable through its final frame.
- Keep low-frequency impact centered, upper textures gently stereo, and check mono fold-down. Target approximately -16 LUFS integrated and no more than -1 dBTP after delivery encoding for this benchmark; report actual loudness, LRA and true peak with any deviation and rationale. These are proposed mix targets, not platform certification.
- Reuse the canonical Factory's useful motion/timeline mechanisms. Keep AURORA crop regions, cleanup recipes, text-field layout and stylistic choices outside reusable core policy. Preserve fresh-clone QA with an explicit after-only mode when the optional v1.0 baseline is absent.

## MAY: bounded discretion

- Choose easing curves, short transition lengths, exact font, text line breaks, low-level audio synthesis and component organization. The hold deadlines, literal copy, hierarchy and governed timing constrain those choices.
- Disable a harsh flash, reduce camera amplitude, widen a soft crop, simplify a beam or remove decorative particles. Use the declared fallback without seeking a new creative decision when it preserves the required behavior.
- Use safe static cleanup derived from the same assigned source only where permitted. No cleanup is necessary for shot-02. Prefer the baseline editorial field over an unproven seamless restoration.
- If S08 cannot fit a field outside the product, uniformly contain the intact assigned plate in an upper image panel occupying approximately 72% of the dark canvas and use a separate lower text band. Retain its subtle pullback within the panel and two-line exact copy within global insets. Adjust the split to measured font fit. This permitted whole-image layout does not enable product masks, packaging occlusion or reconstruction; inspect reduced product scale at phone size before acceptance.
- Implement a generic isolation interface as part of separately authorized Issue #6 engineering, while this campaign continues to use its safe whole-source mode. Do not infer permission to turn masks on in this contract.

## Unsafe from these flattened assets

True 3D orbit, hidden-side reconstruction, moving a can away from its pedestal, transparent ice extraction, independent liquid/bean trajectories, animated label relighting and condensation rolling on the physical can cannot be safely inferred from these plates. Procedural peripheral droplets may suggest atmosphere; they must not pretend to track the material surface. No generative-video dependency or asset replacement is authorized.

Do not paint out on-can microcopy, redraw packaging, invent obscured content or enlarge inherited promotional language into a claims-reading beat. The source itself contains promotional raster text beyond the editable storyboard strings. Preserve that distinction in evidence and flag it for Human publication review. If removal becomes mandatory, obtain a governed source-policy revision rather than silently changing the canonical images.

If cleanup fails, retain the source and use the declared field/crop fallback. If even the safe layout cannot fit mandatory editable copy without obscuring the product, stop the affected implementation and report the concrete layout conflict. Do not shrink indefinitely, omit copy or change the source assignment.

## Execution sequence and evidence expected later

1. Establish the branch/dirty-work baseline and verify governed assets, design schema, one-to-one beat coverage and family references. Keep the v1.1 contract reproducible. Add fail-closed enforcement in the later engineering task; this design mission adds no validator code.
2. Establish source-safe framing and editable typography first, including shot-05 headline suppression and S08 fit. Validate before rendering review frames. Evidence should include entrance, settled hold and worst camera-extreme views; reject doubled letters, edge halos, uncovered borders and field leakage before adding atmosphere.
3. Apply camera envelopes, then restrained light/atmosphere and the specified transition grammar. Add audio sections from the shared cue clock. Choose mechanisms freely within the MUST/SHOULD/MAY boundaries; no prescribed new class hierarchy is required.
4. Run full validation before the full render. Test semantic mutations: changed copy, beat purpose, primary asset, missing/duplicate beat, gap/overlap, wrong cue presence/name/order/range, corrupted source, runtime tuple drift, unsupported claims, missing treatment and invalid family reference. Reject drift before rendering; do not confuse schema success with semantic enforcement.
5. Produce full audio/video decode evidence, exact frame/rate/dimension/duration metadata, explicit color/pixel-format evidence, loudness/LRA/true-peak report, beat sheets and boundary windows. Inspect adjacent frames on both sides of every boundary, typography completion deadlines, impact decay, camera extremes and final-frame hold. Classify intentional holds explicitly in freeze/black metrics.
6. Present reproducible commands, artifact paths and final Git status for implementation review. Record Human full-speed playback separately; machine acceptance does not grant publication readiness.

| Design check | Required observable evidence |
|---|---|
| S01 curiosity | Rim/brand become visible early; no empty opening segment |
| S02 tactility | Assigned shot-02 stays sharp enough in the detail crop; no source swap |
| S03 sensation | Exact editable word complete by its deadline, readable below central brand |
| S04 signature | One controlled scan; rim and label survive its brightest point |
| S05 energy peak | Attack, recoil, decay and stable aftermath are distinct; no ongoing shake |
| S06 recognition | Complete hero, editable brand, no baked headline competition, long hold |
| S07 breathing room | Quieter lateral movement than S02, no invented geometry |
| S08 character | Complete three-word statement held together, no clipped punctuation |
| S09 memory | One editable campaign headline, clear rim, stable last frame |
| Cross-beat ownership | Source and copy switch at exact governed frames; bridges never double cans |
| Source fallback | Cleanup/field mode recorded per source; no hidden source alteration |

## Design-only completion boundary

This handoff, the rationale and the creative JSON are the complete requested deliverables. No production motion components, renderer, audio engine, mastering pipeline or Factory refactor belongs in this mission. No render quality or media acceptance is claimed here. Independent design review may accept or revise this proposal before production work.

Recommended design checkpoint commit message for a future authorized action: `docs(aurora): define v1.2 creative direction and engineering handoff`.
