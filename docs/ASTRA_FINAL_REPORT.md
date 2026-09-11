# Benchmark 001-ASTRA — independent AURORA delivery

Completed across 2026-09-08–10 KST on `benchmark/001-astra`.
Production-stage starting and handoff HEAD: `4869f931b195158a54d8822cd9755644717d83b0`.
At that handoff no commit, push, PR publication or merge had been performed.
The subsequent authorized review checkpoint is recorded in
[ASTRA_REVIEW_CHECKPOINT.md](ASTRA_REVIEW_CHECKPOINT.md).

**Delivery:** [aurora-astra.mp4](../artifacts/astra-001/aurora-astra.mp4).
The complete 40-second commercial is rendered and technically verified.
Browser playback and a perceptual listening pass were unavailable; they are not
represented as passed. Creative scoring below is a self-assessment, not an
independent A/B result or approval for publication.

## Creative direction and result

**Light under pressure.** A narrow emerald opening resolves into a cold can.
Ice and coffee textures expand the tactile vocabulary, large gold `COLD.` names
the sensation, a broad light traversal introduces the aurora, and a rapid macro
impulse releases a layered coffee/ice product tableau. Energy then falls into a
long product hold. Three separately timed words establish character before the
campaign line closes the film.

The hierarchy is product first, one readable campaign idea per beat, then
atmosphere. Negative space gives the packshot room; the large serif typography
has deliberate entrances and sustained reading time. The original photographic
brand label remains visible, while new campaign typography is editable React
text. Baked-in poster slogans and unsupported source phrases are cropped or
covered with feathered samples of blank metal from the same source image.
No new factual product claim was added. No raster image file was changed.

All original beat boundaries, purposes, primary asset references and copy values
remain: **0–3 / 3–7 / 7–11 / 11–16 / 16–21 / 21–27 / 27–32 / 32–36 / 36–40s**.
The impact beat additionally uses the existing second image as an environment
and product layer. All five canonical SHA-256 values were reverified after work.
The brief and asset manifest are unchanged.

## Architecture rationale

The brief drives output dimensions, duration and fps. The storyboard drives
sequences, camera keyframes, reveal/exit windows, copy and sound accent frames.
The composition dispatches three scene families: product, optical detail and
impact/character. Shared camera, optical stage, source surface, aurora field and
editorial type components expose reusable controls.

This source-based SVG/CSS approach preserves the approved photography and
avoids inventing a new package model. Smooth camera acceleration, source mattes,
independent environment/product scales, image-derived ice fragments and moving
atmosphere provide layered motion. This is 2.5D compositing, not real fluid
simulation or a physically correct orbit. Three scene families keep nine beats
coherent without nine copies of the renderer.

The original stereo score is synthesized locally from oscillators and seeded
noise; 18 accents read the same storyboard frame clock. The PCM file contains
exactly 1,920,000 stereo samples at 48 kHz. Render preparation checks source and
public bytes before Chromium renders. A final stream-copy step completes
BT.709 tags and faststart without another lossy encode or timing change.

Generic Remotion guidance informed deterministic frame-based animation and
video-safe typography; brainstorming/writing-plans informed the documented
creative alternatives and staged validation. User authorization supplied the
independent design and execution authority; no additional design gate was added.

## Final media evidence

| Property | Verified value |
|---|---|
| Path | `C:\ECKO-AI-Commercial-Lab\artifacts\astra-001\aurora-astra.mp4` |
| Video codec/profile | H.264 / High |
| Dimensions | 1080 × 1920 |
| Pixel format | yuv420p |
| Frame rates | r_frame_rate = 30/1; avg_frame_rate = 30/1 |
| Frames | nb_frames = 1200; independently decoded nb_read_frames = 1200 |
| Video stream duration | **40.000000 seconds** |
| Color | limited/tv range; BT.709 matrix, transfer and primaries |
| Audio | AAC, 48,000 Hz, stereo |
| Audio stream duration | **40.042667 seconds** |
| Container duration | **40.042667 seconds** |
| File size | **17,443,494 bytes** |
| Full video + audio decode | PASS, FFmpeg exit 0 |

MP4 SHA-256:

```text
5ea8998560e5103bf9b87eef5811c91b07f37befa10e13c8c83625fe8948d940
```

AAC packaging is 42.667 ms longer than the exact video stream. This is disclosed
separately, not rounded down to 40 seconds. The locally generated PCM is exactly
40 seconds. Measured final integrated loudness is approximately -21.0 LUFS,
LRA 4.3 LU and true peak -1.8 dBFS. This is a restrained mix; no platform-specific
loudness or listening approval is claimed.

Raw metadata: [ffprobe JSON](astra-evidence/final-ffprobe.json).
Summary: [media report](astra-evidence/final-media-report.json).
Decode: [log](astra-evidence/final-decode.txt).
Audio cues/hash: [source report](astra-evidence/audio-source.json).

## QA, corrections and findings

Validation passed **21/21 tests**, TypeScript strict checking, the fixed ACB-001
contract, canonical hashes and prepared asset/audio equality. Adversarial tests
cover gaps, overlaps, changed copy, missing beats, bad cues, unsorted cameras,
wrong semantic scene, changed primary asset, missing type/scan/impact controls,
missing/corrupt sources, and changed fps/duration/resolution/claims.

The encoded video was inspected using a 40-frame 1fps overview, all nine 6fps
beat sheets (240 chronological samples), 72 frames around the eight scene
boundaries, and full-size product/type details. All 1,200 decoded frames were
also measured for darkness and frame differences. Findings:

- No internal black gap. Only frame 1199 is flagged, matching the authored final
  8-frame fade. Every scene begins with imagery or the intentional opening slit.
- No identical adjacent decoded frames. This proves absence of exact repeated
  frames, not that every background pixel is animated or that no subtle pause exists.
- `COLD.`, `BOLD. SMOOTH. READY.` and `AWAKEN THE COLD.` are legible in their
  completed reveals without clipping or covering the photographed brand name.
- The ending copy holds fully revealed from 36.8s until the final fade begins
  near 39.7s. The hero brand heading holds through its six-second beat.
- The optical detail scenes intentionally reveal only parts of the source;
  product recognition returns in the next product scene. The 16-second macro
  impulse and 17-second transition into the eruption are deliberate scale changes.
- Fine source texture and feathered patches remain compositing approximations.
  The final portrait fades into darkness instead of ending in a hard cutout edge.

Corrections made autonomously:

1. Added missing React declarations after strict TypeScript correctly blocked
   the first preview. Runtime dependencies were not upgraded.
2. Replaced conspicuous rectangular copy covers with feathered same-source
   texture patches; expanded covers to remove faint label remnants.
3. Tightened the macro crop to exclude unsupported lower-label text.
4. Added a layered source eruption to the energy beat; corrected the environment
   matte gap by keeping the foreground can larger than its background hole.
5. Replaced thin background lines with soft aurora curtains, softened the floor
   cutoff, and refined the portrait rim and lower haze.
6. Removed complete fades at internal cuts, retaining only the final dark frame.
7. Corrected QA's FFmpeg expression escaping; reran final QA successfully.
8. Rendered PNG intermediates with BT.709 conversion, then filled missing H.264
   primaries/transfer tags using stream copy. All 1,200 decoded frame MD5 records
   match before/after this packaging step.

The same 1080p frame 720 was rendered twice independently and both PNGs have
SHA-256 `55cadfab5ff04b42c749a5349174439292abb01085af1ccf58e55c06d5e51ab9`.
The final PCM hash also repeated across preparation runs. This supports local
determinism; it does not prove byte-identical full MP4 output on another machine.

View [final overview](astra-evidence/final-overview-1fps.jpg) and
[transition evidence](astra-evidence/final-transitions.jpg). Exhaustive beat
sheets, full-size detail frames, frame metrics and loudness logs are under
`artifacts/astra-001/final/`. Only compact evidence is included in the Git diff.

## Before/after — this branch's freshly rendered v1.0 only

| Area | Fresh v1.0 baseline | Independent Astra result |
|---|---|---|
| Direction | Full poster images with small camera moves | Product-led optical opening, tactile interludes, eruption, sustained brand close |
| Typography | Small overlay copy competes with baked-in poster copy; fixed 100-frame envelope | Large editable lines, separate word accents, longer intended holds |
| Motion | Linear scale/translation; one scan and brief shake | Eased camera keys, reveal masks, layered foreground/environment, moving soft light and particles |
| Product clarity | Many surrounding raster slogans | Composed isolation; unsupported source wording obscured/cropped |
| Sound | Low-level synthesized bed and sparse hits | Stereo harmonic sections, rhythm, pressure rise and storyboard accents |
| Governance | Basic timeline/asset existence check | Fixed contract, canonical hashes, adversarial tests, TypeScript and prepared-input checks |
| Media QA | Established here for comparison | Full decode, frame count, 6fps review, transition windows, color tags and reproducibility checks |

Baseline MP4: `artifacts/astra-001/baseline.mp4`; H.264, 1080x1920, 1200 frames,
40.000000s video, 40.042667s AAC/container, 51,371,738 bytes; SHA-256
`c932865cc9940770344eb5b438a095c348e11a18172a08a5b79a2b769df6eba7`.
[Baseline overview](astra-evidence/baseline-overview-1fps.jpg) and
[metadata](astra-evidence/baseline-media-report.json) were generated in this run
from unchanged source before implementation. No existing QA evidence was used.

Average small-frame pixel difference is 1.797 for baseline versus 1.019 for the
final. This is not an aesthetic score: isolating the product reduces the moving
pixel area. The improvement claim rests on directed pacing, hierarchy and
readability, not on maximizing effect count or raw motion magnitude.

## Self-scorecard, 0–10

| Criterion | Score | Reason / ceiling |
|---|---:|---|
| Creative originality | 7.5 | Independent optical direction within a supplied campaign and five photographs |
| Motion sophistication | 7.0 | Layered source motion and controlled impulses; still recognizably 2.5D |
| Visual coherence | 8.3 | Consistent emerald, black, metal and restrained serif hierarchy |
| Product focus | 8.7 | Clear label, substantial hero holds, purposeful texture breaks |
| Typography | 8.2 | Strong scale and reading holds; system font dependency remains |
| Transition quality | 7.0 | Deliberate cuts/reveals and scale changes; limited true spatial continuity |
| Audio-visual synchronization | 7.2 | Shared frame/sample cue timing; perceptual listening unavailable |
| Commercial impact | 7.6 | Clear energy arc and ending memory; no audience or device testing |
| Code architecture | 7.8 | Story-driven timing and focused components; source mattes remain campaign-specific |
| Reuse potential | 7.8 | Reusable motion primitives; each new package still needs source analysis/mattes |
| Reproducibility | 8.5 | Locked dependencies, seeded score, repeated frame hash; not cross-platform proven |
| Validation strength | 8.6 | 21 tests, full decode/count, temporal samples, hashes; no live playback/listening |

These are explicitly self-scores, with no reference to another implementation.

## Remaining production limitations

- Browser runtime reported `No browser is available` and listed no connections.
  Actual player playback, subjective listening and target-phone review are unrun.
  Full FFmpeg video/audio decoding and chronological visual review did run.
- The campaign remains source-image compositing: no real liquid dynamics, full
  3D can rotation, or changing internal photographic splash motion.
- Same-source label covers repeat surface texture and can be detectable at close
  inspection. The photographic package lettering itself is not editable text;
  all presented overlay campaign typography is code-editable.
- Fonts resolve to Windows Georgia/Arial. Exact rendering on another OS requires
  font parity. NumPy/Pillow versions are pinned; Python/Node/FFmpeg are documented
  but the production environment is not containerized.
- The synthetic score is not professionally mixed or platform-mastered; AAC has
  a disclosed 42.667ms tail. No third-party music, actor, stock or generative-video
  service is involved.
- MP4s and exhaustive QA are local ignored artifacts. A future reviewer needs
  the delivered file or must rerender; the compact metadata/contact sheets are
  available as new Git files. No external publication or advertising approval.

## Changed files and exact commands

See [command record](ASTRA_COMMANDS.md), including failed attempts and corrected
commands, and [final Git snapshot](astra-evidence/git-state.txt) for the literal
status, tracked diff statistics and new file inventory.

Modified existing files:

```text
README.md
commercials/aurora-cold-brew/storyboard/storyboard.json
docs/ASTRA_HUMAN_INTERVENTION_LOG.md
package.json
package-lock.json
scripts/validate.mjs
src/Root.tsx
src/commercials/aurora/AuroraCommercial.tsx
tsconfig.json
```

New implementation/tooling/document files:

```text
artifacts/.gitignore
docs/ASTRA_DESIGN.md
docs/ASTRA_COMMANDS.md
docs/ASTRA_FINAL_REPORT.md
scripts/astra_contract.mjs
scripts/finalize_astra.mjs
scripts/generate_astra_audio.py
scripts/package_astra_evidence.py
scripts/prepare_astra.mjs
scripts/qa_astra.py
scripts/requirements-astra.txt
scripts/snapshot_astra.mjs
scripts/test_astra_contract.mjs
src/commercials/aurora/direction.ts
src/commercials/aurora/scenes/DetailScenes.tsx
src/commercials/aurora/scenes/ImpactScenes.tsx
src/commercials/aurora/scenes/ProductScenes.tsx
src/components/AuroraField.tsx
src/components/EditorialType.tsx
src/components/OpticalStage.tsx
src/components/SourceSurface.tsx
```

New compact evidence files under `docs/astra-evidence/`: `audio-source.json`,
`validation.txt`, `git-state.txt`, and for each of `baseline` and `final`:
`*-commands.txt`, `*-decode.txt`, `*-ffprobe.json`, `*-media-report.json`,
`*-overview-1fps.jpg`, `*-transitions.jpg`. The exact list is in the Git snapshot.
Generated ignored outputs include the score WAV, public source/audio copies,
baseline/preview/intermediate/master/final MP4s, repeat-frame PNGs and exhaustive
QA. Pre-existing untracked `commercials/aurora-cold-brew/output/` is preserved.

## Recommended commit and PR (not created)

Commit:

```text
feat(aurora): deliver independent Astra 40-second commercial benchmark
```

PR title:

```text
Benchmark #001-ASTRA: independent AURORA commercial and verification evidence
```

PR body:

```markdown
## Result

Build an independent AURORA film from the benchmark branch's pre-v1.1 baseline.
The film uses a product-led optical opening, tactile source crops, a layered
ice/coffee release, large editable campaign typography and an original stereo
score. Preserve ACB-001, all five canonical source hashes, all nine semantic
beat boundaries/copy values, 1080x1920, 30 fps and exactly 1200 video frames.

## Engineering and evidence

Storyboard-driven camera and sound cues, reusable source/optical/type components,
21 passing contract tests, strict TypeScript checks, prepared-input validation,
full video/audio decode, independent frame count and chronological temporal QA.
Delivery is H.264/yuv420p/BT.709; video 40.000000s, AAC/container 40.042667s.
Full rationale, file/command inventory, metadata, SHA-256, self-scores and QA are
in docs/ASTRA_FINAL_REPORT.md and docs/astra-evidence/.

## Boundaries

No excluded implementation, branch, PR or QA artifact was inspected or used.
Three operational resume messages; zero creative corrections or manual edits.
Browser playback/listening and target-device review are unrun. This is 2.5D
source compositing with Windows system-font and local-artifact dependencies.
Keep this branch unmerged until the independent benchmark comparison.

Relates to #4.
```

## Complete human-intervention log

Initial authorization excluded. Three production resumes and two subsequent
review-checkpoint interventions are counted; none changed creative direction:

| # | Stage | Human action | Why needed | Changed direction? |
|---|---|---|---|---|
| 1 | First preview validation | “한도가 복구됐다. 계속 진행해주세요” | Resume after reported usage-limit recovery | No |
| 2 | Preview defect correction | “한도 복구 됐다. 이어서 진행하라” | Resume the same authorized task | No |
| 3 | Final evidence / handoff | “한도가 복구 됐다. 진행 중이던 작업을 이어서 진행해주세요” | Complete handoff after reported usage-limit recovery | No |
| 4 | Post-delivery review checkpoint | Reports external media verification passed; authorizes commit and push only | Explicit publication authorization, with no PR, merge or Issue closure | No |
| 5 | Review checkpoint execution | “한도가 복구됐습니다. 진행중인 작업을 이어서 진행” | Resume authorized checkpoint after reported usage-limit recovery | No |

Totals: design approvals 0; correction prompts 0; manual asset/code/timing edits
0; rerender requests 0; other material interventions 5. All visible defect
corrections and rerenders were autonomous. The maintained log is
[ASTRA_HUMAN_INTERVENTION_LOG.md](ASTRA_HUMAN_INTERVENTION_LOG.md).
