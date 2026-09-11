# AURORA / light under pressure

Independent direction for ACB-001 on benchmark/001-astra, starting HEAD
4869f931b195158a54d8822cd9755644717d83b0. No other branch, PR, history,
implementation or pre-existing QA output is a creative reference.

## Audit and baseline

Read every tracked text file except the generated dependency lock, whose root,
installed versions and dependency integrity are checked by npm install. Viewed
all five PNGs and verified every SHA-256 against the canonical manifest. Tracked
worktree initially clean; pre-existing untracked commercial output directory
preserved. Its filenames were exposed by the initial file inventory; no contents
were opened. All new media lives in artifacts/astra-001, a separate directory.

The actual second image is the ice/coffee burst; the fourth is the condensation
macro. Names and canonical bytes remain unchanged. Baseline rendered from
unchanged v1.0 source, using the branch lockfile: 1080x1920, H.264, 30 fps,
1200 frames, video 40.000000 seconds, AAC/container 40.042667 seconds.
Baseline contact sheet shows static photographic detail, almost uniform camera
velocity, hard cuts, competing baked-in and overlay copy, and a short fixed
text envelope that fades before the six-second hero beat ends.

## Direction

The product contains the aurora; light is released as the film unfolds. Restrict
the palette to near-black, emerald and warm metal. Alternate scale, energy and
negative space. A quiet opening earns the impact; an extended product hold earns
brand recall. Typography is large, edited to sound, and never competes with the
brand face. No new slogan, product promise, specification or CTA.

Considered: full-frame photographic montage (fast but retains competing copy),
fully synthetic 3D can (flexible but invents packaging), and source-based optical
compositing. Choose the third: preserve the source photographs, isolate product
and texture with SVG/CSS, add deterministic atmospheric motion. This is 2.5D
compositing, not a true camera orbit or fluid simulation.

Keep all nine semantic boundaries: 0,3,7,11,16,21,27,32,36,40 seconds.
1. Cold open: slit of emerald reveals rim and silhouette; gradual recognition.
2. Tactile: cropped ice/condensation with traveling optical aperture.
3. COLD.: decisive large type, portrait product floats into a composed hold.
4. Signature: aurora ribbons open behind the original hero; light crosses metal.
5. Impact: macro snap and controlled release, source ice fragments cross depth.
6. Recognition: can locks in a generous frame, AURORA remains readable.
7. Breathing: slow elliptical texture window and softened particle movement.
8. Character: BOLD. / SMOOTH. / READY. enter separately then hold together.
9. Memory: AWAKEN THE COLD. above an isolated packshot, quiet final settle.

## Architecture

Storyboard owns beat timing, copy and numerical motion/audio cues. A single
frame clock reads those values; the root takes dimensions/fps/duration from the
brief. Reusable components own source cropping/product isolation, atmospheric
field, camera interpolation and editable typography. Scene components own
meaning and composition. Native Remotion primitives already installed in the
baseline are sufficient; no dependency upgrade, transition time subtraction,
external assets or generative-video service is needed.

Frame-driven SVG/CSS is deterministic and supports random frame access.
Code masks exclude raster campaign text and obscure unapproved source label
phrases; the original PNGs remain byte-identical. Do not pretend the original
packaging lettering is editable: all newly presented campaign typography is
code, whereas the photographic brand label is source imagery.

Compose a deterministic stereo score locally from oscillators and filtered
noise. Shape its energy around the same storyboard cues, with an impact at 16s,
softened bed at 21s and three character accents at 32s onward. No voiceover or
licensed third-party audio. Exact PCM sample length is 1,920,000 at 48 kHz.

## Validation and QA

Fail before rendering for altered contract, missing/corrupt asset, bad hash,
missing audio, unknown scene, invalid cue or any timeline gap/overlap. Test
rejections using in-memory corruptions, without touching the canonical assets.
Type-check React source. Render full-resolution 1200-frame H.264. Inspect a
1fps overview, every transition at close frame intervals, and large hero/type
frames. Analyze all decoded frames for black gaps and frame differences; decode
all video/audio with FFmpeg; independently count frames with ffprobe. Record
audio and container duration separately, file bytes and SHA-256. Correct defects
and rerender when required. Perceptual review remains bounded by sampled visual
inspection and available playback; do not equate automated QA with audience testing.

## Implementation plan

Goal: a completed independently directed 40-second MP4 and reproducible evidence.
Tech: existing Remotion/React/TypeScript, SVG/CSS, Python/NumPy, FFmpeg.
Execution: inline within the authorized benchmark branch; no merge or PR publication.

- [x] Audit source/contract/assets and establish a fresh unmodified baseline.
- [x] Add numerical direction/cues to storyboard; implement components and scenes.
- [x] Generate stereo score and deterministic source synchronization.
- [x] Strengthen contract validation, adversarial checks and TypeScript checking.
- [x] Render preview; inspect composition and correct visible defects.
- [x] Validate then render the full 1080x1920 MP4; run temporal/media QA.
- [x] Write findings, limitations, self-scores, commands, status and PR recommendation.

This design is authorized by the initial explicit freedom of creative and
architectural choice and end-to-end execution. No additional human approval
checkpoint, asset intervention, edit or rerender request has occurred. Three human
messages requested resumption after reported usage-limit recovery; these are
recorded as operational interventions in ASTRA_HUMAN_INTERVENTION_LOG.md.
