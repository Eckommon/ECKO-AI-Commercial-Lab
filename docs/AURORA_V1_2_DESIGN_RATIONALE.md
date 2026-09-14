# AURORA v1.2 design rationale

Design-review candidate, 2026-09-11. Designer / Planner / Creative Systems Architect mission for [Issue #6](https://github.com/Eckommon/ECKO-AI-Commercial-Lab/issues/6), on `factory/v1.2-hybrid`. Baseline: `f6fd30cc6909c74fc87a8238057b91d3b7827e44`. This is a completed design proposal awaiting independent review, not an approved production implementation or completion of the wider issue.

The treatment contract is [creative-direction.v1.2.json](../commercials/aurora-cold-brew/design/creative-direction.v1.2.json); the executor requirements are [AURORA_V1_2_IMPLEMENTATION_HANDOFF.md](AURORA_V1_2_IMPLEMENTATION_HANDOFF.md). The brief, storyboard and canonical asset identities outrank this proposal. No governed file is changed.

## Campaign thesis and selected approach

**Cold energy, held in control.** The viewer first notices a wet, dark object, then its tactile surface and emerald signature. One concentrated release makes the subsequent stillness feel confident. The film finishes by letting the product and campaign line remain in memory. This describes a sensory commercial treatment, not an energy, health or performance claim.

Three approaches were considered. Continuous spectacle would exploit the already rich source images but flatten the distinction between impact and hero. A nearly static editorial film would improve legibility but understate the governed scan, impact and orbit intentions. The selected approach uses restrained editorial framing around those existing motion intentions: limited movement, one peak, then stable recognition. It preserves the established black, emerald and warm-gold language rather than introducing a new campaign identity.

The hierarchy is product identity first, the owning beat's message second, tactile context third, and added atmosphere last. S03 and S08 temporarily give the approved words reading priority; S06 and S09 return that attention to the product. Each added effect must make this priority easier to perceive.

## Governed beat interpretation

This table is a review aid transcribed from the storyboard, not a new runtime timing source. Intervals are start-inclusive and end-exclusive. The JSON references beat IDs without redefining timing or copy. All durations remain 40 seconds total, at 1080x1920 and 30 fps: 1200 frames.

| Beat / interval | Governed asset | Exact editable copy | Dominant objective / treatment |
|---|---|---|---|
| S01 / 0–3 s | shot-01-hero.png | empty | Curiosity: eased reveal of wet silhouette, peripheral rising mist and emerald breath. |
| S02 / 3–7 s | shot-02-macro.png | empty | Tactility: modest detail crop, diagonal arc and one soft scan. |
| S03 / 7–11 s | shot-03-portrait.png | `COLD.` | Name the sensation: portrait glide, short character entrance, complete word hold. |
| S04 / 11–16 s | shot-01-hero.png | empty | Signature: reverse drift, one restrained emerald scan, then relaxation. |
| S05 / 16–21 s | shot-04-impact.png | empty | Energy peak: optical attack, recoil, rapid decay, early settle. |
| S06 / 21–27 s | shot-05-endcard.png | `AURORA` | Recognition: small hero push and letter entrance, followed by a long stable hold. |
| S07 / 27–32 s | shot-02-macro.png | empty | Breathing room: quieter lateral orbit illusion on the assigned plate. |
| S08 / 32–36 s | shot-04-impact.png | `BOLD. SMOOTH. READY.` | Character: hard cut, gentle pullback, word sequence resolving into one full statement. |
| S09 / 36–40 s | shot-05-endcard.png | `AWAKEN THE COLD.` | Memory: early-settling hero and editable campaign line held to the last frame. |

The five scene families express communication jobs, not required classes or components. Reveal/signature connects S01 and S04; tactile study makes S02 and S07 a deliberate pair; editorial statement organizes S03 and S08; contained impact belongs only to S05; recognition/memory links S06 and S09. The shared-source returns now have distinct roles rather than merely different effect settings.

## What the five images actually permit

All five canonical PNGs were visually inspected directly. File names are not reliable descriptions of their contents: `shot-02-macro.png` contains the full can amid a large coffee/ice splash; `shot-04-impact.png` contains a diagonal close can crop. The governed mappings remain literal. S02/S07 obtain detail through a conservative crop of shot-02. S05 obtains impact through camera impulse and sound on shot-04. This resolves the naming mismatch without an asset or semantic change.

| Source | Observed affordance | Primary risk / selected treatment |
|---|---|---|
| shot-01-hero.png | Upright can, ground contact, emerald background, wet surface | Baked side slogans and bottom campaign headline; optional off-product cleanup or quiet field, never label reconstruction. |
| shot-02-macro.png | Complete can, splash, ice, beans and strong condensation | Splash is already the busiest source; detail crops must retain sharpness and cannot animate splash pieces independently. |
| shot-03-portrait.png | Large can on the right with dark lower space | Put editable sensation word below the central label; retain portrait silhouette and avoid competing side raster text. |
| shot-04-impact.png | Diagonal close crop, visible droplets, large partial brand | Limited empty space; small optical impulse for S05, quiet editorial field for S08. Never fabricate the cropped-away can. |
| shot-05-endcard.png | Complete upright can on a pedestal; large baked upper campaign line | Cover the upper headline in a static off-product editorial field for S06/S09 and use editable owning-beat copy there. Keep contact shadow and pedestal intact. |

The default is a single protected source plate. **All nine `allowMask` values are false.** A reusable isolation interface remains an engineering capability requested by Issue #6, but this campaign does not require a moving extracted can. A flattened label, transparent ice edge, splash and pedestal cannot provide the hidden surfaces needed for credible independent movement. Repeating the plate behind a moving cutout risks double lettering and ghost rims, already documented in v1.1 QA.

`allowSourceDerivedCleanup` permits an optional static, same-image background treatment only where true in the JSON. It does not authorize generative fill, source-file overwrites, packaging edits or independent product motion. A cleanup layer must travel in the same coordinate space as its plate. If it smears, tiles, repeats text or swims during motion, use the opaque field/crop fallback. The field is an intentional editorial surface, not a claim of invisible restoration.

Canonical assets contain inherited promotional raster text, including on-can microcopy. Those pixels are not an approved source of new editable claims. Preserve the sources, avoid directing attention specifically to this microcopy, and record it for Human publication review. Removing or rewriting on-can text would need a source-policy decision outside this mission. No new factual claims are proposed; no claim-free certification is made for the inherited images.

## Pacing and hero holds

Use normalized local progress `u` inside the existing beat; the executor derives frames from the governed boundaries. Settle no later than the first rendered frame at or after the specified fraction. These are treatment envelopes, not changes to the shot schedule.

| Beat | Essential envelope | Intended readable/stable duration |
|---|---|---|
| S03 | Complete word by u=0.25; hold through end | At least 3 seconds of complete copy |
| S05 | Attack/recoil decays; product settles by u=0.32 | About 3.4 seconds of stable aftermath |
| S06 | Product and editable brand settle by u=0.30 | At least 4.2 seconds of recognition |
| S08 | All words complete by u=0.40; hold through end | At least 2.4 seconds of complete statement |
| S09 | Product and line settle by u=0.25; hold to last frame | At least 3 seconds of resolved close |

S01 should already reveal the rim and some brand information by u=0.20. S02 moves gently; S04 makes one scan; S07 uses less travel and particle activity than S02. S05 alone has a pronounced transient. Stable holds prohibit positional or scale drift in the product and type, but allow quiet peripheral atmosphere. A freeze detector must distinguish these intended holds from a stuck render.

The last frame stays resolved. v1.1's documented final ten-frame fade is an implementation choice, not a governed beat requirement; omitting it strengthens the storyboard's stable close without changing duration, copy or timing. Audio may decay while the picture remains held.

## Typography and layout

Use a single readable text block in each copy-bearing beat. Warm gold connects it to the can. A restrained roman serif can support the sensation/campaign line if a reproducible local font is available; a clean sans supports the editable brand word. A pinned readable local sans for all overlays is an acceptable fallback. No exact font package or new licensing dependency is required by the design.

Use 6% horizontal and 8% vertical design insets. Aim for at least 64 pixels of cap height at delivery size, then inspect a 270x480 reduction for actual readability. These are layout targets, not assertions about every platform's overlay UI. Use natural line breaks before shrinking. Preserve the literal storyboard strings, including punctuation; do not adopt typographic variants found in the raster packaging.

S03 uses lower dark space; S06/S09 share an upper editorial field that completely covers shot-05's baked headline while leaving the rim visible. S08 uses a compact lower field outside the central brand, with two lines available for fit. Test the field against the entire camera envelope, not only the hold frame. If a legible field cannot avoid the product, reduce camera travel and revise placement; never omit editable copy, substitute the raster phrase, or cover the central label as a shortcut.

S08 has a concrete alternative when the dense macro source offers insufficient off-product space: uniformly contain the intact plate in the upper approximately 72% of the dark canvas and reserve the lower band for two lines of editable copy. Keep the subtle pullback inside the image panel and the text within the global insets. The dark surround is an intentional editorial layout, not reconstructed scenery or an extracted product. This trades some product scale for a readable character statement without covering packaging or changing the assigned asset. The exact panel split may adjust to actual font metrics; inspect the smaller product and complete phrase together. Prefer this layout over progressively shrinking text or placing a field across the can.

Character/word/line offsets are short entrances into a stable whole. No bouncing, scrambled characters, tracking loops or per-word disappearance. The text does not exit before the boundary. Clear it on the next beat's first frame.

## Transition strategy

| Incoming beat | Treatment | Purpose |
|---|---|---|
| S01 | Brief cold veil reveal within the beat | Begin in darkness with a readable object, not an empty slate |
| S02 | Hard cut | Move decisively from discovery to tactile examination |
| S03 | Low peripheral mist | Carry the cold sensation into the word |
| S04 | Peripheral emerald bridge | Connect sensation to signature |
| S05 | Exact cut and single restrained exposure accent | Deliver the sole peak |
| S06 | Low peripheral mist | Release impact into recognition |
| S07 | Hard cut | Begin a quiet material return |
| S08 | Hard cut | Re-establish a reading task |
| S09 | Peripheral emerald bridge | Resolve signature into memory |

Bridges carry only supporting atmosphere across boundaries. Source plates switch on the exact governed frame; approved copy never crosses its owner boundary. No overlapping product plates, doubled silhouettes or opaque wipe that consumes a readable hold. Exposure accent can be disabled if clipping or harshness appears; the cut and governed impact-hit retain the peak. The executor chooses practical overlay lengths within these constraints.

## Audio and finishing intent

Discovery uses a low sustained tone and fine cold texture. S04 increases tension then leaves headroom; S05 delivers a compact centered impact. S06 becomes warmer and less rhythmic; S07 removes density. S08 lifts gently and S09 resolves to silence. No voiceover, opening-can narrative or added performance language is needed.

Keep all existing cue names, presence and boundary positions. In particular, S02 has no sfx, S05 has `impact-hit`, and the other beats retain `sub-hit`. Relative mix level and timbre may vary; quieter hero hits prevent every boundary sounding equally dramatic. Stereo belongs primarily to upper textures; the bass/impact remains centered and the mix must retain its hierarchy in mono. These are intentions for deterministic local audio, not an audio-engine specification.

Proposed benchmark mix targets are approximately -16 LUFS integrated and at most -1 dBTP after delivery encoding. Report measured integrated loudness, LRA and true peak; LRA has no invented acceptance target. Preserve the impact-to-hold contrast instead of crushing transients to meet a number. These targets are design proposals, not external platform standards.

Mastering intent is SDR BT.709, matching explicit matrix/transfer/primaries and limited range, yuv420p, H.264 MP4 with faststart and stereo AAC. Deep blacks must retain rim and condensation detail. Metadata must describe the actual signal: tagging alone is not color conversion. Video remains exactly 1200 frames / 40 seconds; audio content ends at 40 seconds and any encoded padding is separately reported. Full-stream decode, audio measurements and Human full-speed playback belong to the later production evidence.

## Reusable lessons and campaign decisions

| Generalizable Factory lesson | AURORA-specific decision kept in recipe/adapter |
|---|---|
| Explicit beat priority, local settle envelope and readable hold | S05 single peak; S06/S09 long holds and emerald language |
| Safe source surface with optional cleanup and a declared fallback | These five sources, off-product cleanup regions and headline fields |
| Exact-copy editable typography and fit verification | Warm gold, selected serif/sans treatment and AURORA placement |
| Semantic transition intent with exact source ownership | Mist/emerald bridges and the specific cut pattern above |
| Cue-clock audio sections and measured delivery | This discovery/impact/release score arc and benchmark mix targets |
| Fail-closed reference checks and temporal evidence | These beat IDs, source hashes and per-beat acceptance observations |

No benchmark source code, matte coordinates or campaign scene implementation is imported. Reuse the canonical v1.1 substrate where it serves the design; Sol/Codex owns the mechanism and any capability work under the wider issue.

## Risks, conflicts and review status

The naming/content mismatch is resolved by keeping exact asset assignments. No proposed treatment requires a governed timing, copy, asset or claim change. The inherited raster-language concern remains a publication review item, not permission to retouch packaging. Safe cleanup, text-field fit, font metrics, highlight separation and final audio dynamics remain unproven until implementation and rendered inspection. Each has an explicit fallback in the JSON.

If a safe field cannot preserve editable copy and product visibility, or a higher-priority contract changes, stop the affected implementation for review. Do not substitute an asset or silently revise governance. This design can be independently reviewed now; it does not assert render acceptance, audio quality, Human playback or publication readiness.

## Design verification performed

The three requested design files already existed as untracked drafts at the start of this execution. They were reviewed against the current mission, live Issue #6, schemas, storyboard, manifest and all five source images. Their overall direction was retained; this execution clarified S08's source-preserving split-layout fallback in the contract and both companion documents. The baseline commit above was verified locally. Prior completion statements in the drafts were not treated as fresh evidence; the checks below were rerun for this review.

On 2026-09-11, Python `jsonschema.Draft202012Validator` accepted the creative JSON against `factory/creative_direction.schema.json`. A separate in-memory check confirmed ACB-001 identity, exact ordered S01–S09 treatment coverage, unique scene-family IDs, valid family references and disabled masks in all nine treatments. New-file whitespace checks passed.

`npm run validate` passed the existing governed campaign/cue checks, five source SHA-256 checks, deterministic motion checks, runtime/temporal-QA reproducibility checks and TypeScript compilation. `git diff --check` passed for tracked changes; because the design files are new and untracked, their trailing whitespace and final newlines were checked separately. No tracked baseline file changed. The existing validator does not itself validate this new design JSON; the schema/reference checks above were run separately.

No render, audio generation, mastering operation or Human playback was performed. These checks validate the design artifact structure and unchanged campaign baseline, not the future rendered treatment. Initial `artifacts/` was already untracked and was left untouched. No commit, push, merge or PR was made.
