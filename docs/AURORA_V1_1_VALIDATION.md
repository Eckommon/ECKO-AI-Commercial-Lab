# AURORA Benchmark #001 — Factory v1.1 Validation

Date: 2026-09-08
Branch: `factory/v1.1-motion-quality-upgrade`
Campaign: `ACB-001`

## Result

Factory v1.1 preserves the governed 40-second, nine-beat AURORA campaign and renders a new local MP4. The runtime moves beyond a single transformed image per beat through reusable eased camera recipes, procedural depth veils, deterministic mist/droplets/sparkle, cue-linked aurora lighting, selective transition overlays, kinetic typography, and attack/recoil/settle impact motion.

The continuous-playback portion of manual QA could not be completed inside the agent environment because neither a native nor in-app browser/media surface was exposed. This is reported as unavailable, not passed. Full-stream decoding, all-frame freeze/black scanning, one-frame-per-second review, and focused temporal strips were completed.

## Governed contract

- Campaign ID: `ACB-001`
- Beat IDs: `S01` through `S09`, exactly nine contiguous beats
- Video duration: 40 seconds / 1200 frames
- Format: 1080x1920 vertical
- Frame rate: 30 fps
- Campaign line: `AWAKEN THE COLD.`
- Supporting copy: `COLD.` and `BOLD. SMOOTH. READY.`
- Claims added by v1.1: none

Storyboard purposes, assets, copy, timings, and the presence/name of every `sfx` cue are checked against literal governed values by `scripts/validate.mjs`. Cue frames used by the audio generator and runtime remain derived from the governed storyboard; no independent cue timestamps are maintained.

The runtime composition contract derives campaign ID, duration, frame rate, width, and height from `brief.json`; the resolution parser rejects malformed, non-positive, non-finite, or unsafe dimensions. The validator independently retains the literal accepted ACB-001 / 40-second / 30-fps / 1080x1920 contract, so governed-source drift fails before the render command proceeds.

## Baseline assessment

The v1.0 renderer used one full-frame `Img` per beat, linear whole-frame scale/translation, a fixed 100-frame type lifecycle, one gradient sweep, short sinusoidal shake, and hard cuts. Visual timing was hard-coded separately from the storyboard. Baseline `npm run validate` passed `ACB-001 / 9 shots / 40s`, while `npx tsc --noEmit` failed because React and ReactDOM type declarations were absent.

The existing v1 MP4 reports 1080x1920 H.264 video at 30 fps, exactly 1200 video frames and 40.000000 seconds. Its AAC stream and container report 40.042667 seconds.

## v1.1 media evidence

Final ignored artifact:

`commercials/aurora-cold-brew/output/aurora-cold-brew-v1-1.mp4`

Artifact SHA-256 from the corrected render:

`348B48BDE74180B764EE44297872FE17C3EB53A487108F8A0F9FCBD251AE04ED`

This hash identifies the verified local artifact from this run. It is not a claim that all future encoded MP4s will be byte-identical.

`ffprobe` reports:

- video frame count: `1200`
- video duration: `40.000000` seconds
- resolution: `1080x1920`
- nominal and average frame rate: `30/1`
- video codec: `h264` (High profile in decode scan)
- audio codec: `aac`
- audio stream duration: `40.042667` seconds
- container duration: `40.042667` seconds
- final file size: `44,000,958` bytes

The governed source WAV reports PCM signed 16-bit little-endian, mono, 48 kHz, and exactly 40.000000 seconds. AAC/container padding is reported separately and does not change the exact 1200-frame video contract.

## Asset SHA-256 verification

`npm run validate` recalculates every canonical image hash and compares it with `ASSET_SHA256.txt`:

| Asset | SHA-256 |
|---|---|
| `shot-01-hero.png` | `91A5A53EFE147E1F62D743AD467764A4D7968B75A97CD0096D1D125C0F8FAAA6` |
| `shot-02-macro.png` | `A5A835871D9D249407ECE37B178C7B71CE5C72856E28A42235260A40C09201EB` |
| `shot-03-portrait.png` | `51968080EE70E896803412ACB7CF53040B593AC2C0A6311CA7EE4E2ECB20C6AB` |
| `shot-04-impact.png` | `F35B1A15ED4BCC70DD79E5BDD1FC197A63C84B25E51A4CC47B1D8083DC216DC0` |
| `shot-05-endcard.png` | `C3DA92BFC7BE55BA68266D23C49F7A64B93ED1FDDD5A635A5FAD58A1E5A6E3E7` |

## Temporal QA

`npm run qa:temporal` requires the ignored v1.1 MP4. When the ignored v1.0 baseline is also present, it writes full comparison evidence under `commercials/aurora-cold-brew/output/qa/before-after/`. On a fresh clone without that baseline, it reports that comparison was skipped, exits successfully after processing v1.1, and writes unambiguous after-only evidence under `commercials/aurora-cold-brew/output/qa/after-only/`. If v1.1 is absent, it fails with an instruction to run `npm run render:aurora` first.

| Evidence | Frames | Inspection result |
|---|---:|---|
| Full timeline | one sample per second, frames 15–1185 | all nine beats present; coherent dark/emerald grade; no blank intermediate beat |
| S02 depth/camera | 96, 126, 156, 186 | diagonal camera progression and procedural depth/particle layers are visible; final version has no repeated baked headline or exposed edge |
| S03 typography | 210, 222, 255, 318 | editable `COLD.` moves from absent to staggered entrance, clean hold, and exit phase |
| S04 light | 336, 372, 414, 462 | beam/sweep changes independently of the camera without clipping the product |
| S05 impact | 480, 483, 490, 504, 540 | exposure accent, attack displacement, recoil, and settled frame are distinct; flash was reduced after preflight |
| S06 hero | 630, 654, 705, 786 | hero camera breath and letter choreography remain inside safe margins |
| S07 orbit/particles | 816, 852, 900, 948 | lateral camera arc and deterministic particles change independently |
| S08 typography | 960, 975, 1020, 1074 | intentional hard cut; word entrance, hold, and exit remain readable |
| S09 end card | 1080, 1095, 1140, 1170, 1188 | early camera settle and stable campaign-line hold; final ten frames fade to black |
| Selected boundaries | 204–216, 324–336, 474–486, 1068–1092 | mist, aurora, and impact accents form a selective grammar; boundaries at 3s, 27s, and 32s remain intentional hard cuts |

Two unsafe image-duplication approaches were rejected during QA. A feathered subject duplicate repeated can lettering, and a masked foreground duplicate leaked opacity into baked bottom copy. The final `LayeredScene` never duplicates or translates source pixels; the canonical image remains untouched while procedural glow/veils, mist, droplets, sparkle, and light provide independent depth motion.

The final MP4 was decoded in full with FFmpeg: all video and audio streams completed with no decode errors. A 1200-frame freeze/black scan found no black segment of 0.3 seconds or longer. It identified intentional low-change holds at 18.2–20.733 seconds (post-impact settle), 25.733–26.767 seconds (hero breathing room), and 38.567–39.700 seconds (end-card stability).

## Before/after assessment

| Dimension | v1.0 | v1.1 |
|---|---|---|
| Timeline | duplicated constants in composition/audio | storyboard-derived beat and cue frames |
| Camera | linear zoom/pan | reusable cubic-bezier camera arcs and early-settle recipes |
| Depth | none | artifact-safe procedural background/foreground differential movement |
| Atmosphere | source pixels only | seeded mist, droplets, sparkle, and screen-space depth |
| Lighting | one linear sweep | beams, breathing glow, selected scans, and cue accents |
| Transitions | hard cuts only | five intentional overlays plus three retained hard cuts |
| Typography | one fixed card animation | character/word choreography with beat-relative entrance, hold, exit, and end-card hold |
| Impact | short shake | exposure attack, directional shake, recoil, and stable settle |
| Validation | contiguity and file existence | governed semantics, hashes, deterministic math, and strict TypeScript |

This is a material architectural and temporal improvement over the v1.0 Ken Burns pipeline. It remains a still-asset commercial: motion depth is created around the canonical images rather than by true product rotoscoping or 3D reconstruction.

## Exact commands used

```powershell
npm install
npm run validate
npx tsc --noEmit
node scripts/validate.mjs
npm run test:motion
npx remotion compositions src/index.ts
$qaDir = Join-Path ([System.IO.Path]::GetTempPath()) 'ecko-aurora-v1-1-preflight'
$frames = @(30,105,225,345,477,483,510,675,825,975,1085,1170)
foreach ($frame in $frames) { npx remotion still src/index.ts AuroraColdBrew (Join-Path $qaDir ("frame-{0:D4}.png" -f $frame)) --frame=$frame --scale=0.25 --log=error }
npx remotion still src/index.ts AuroraColdBrew (Join-Path ([System.IO.Path]::GetTempPath()) 'ecko-aurora-corner-mask.png') --frame=156 --scale=0.5 --log=error
npx remotion still src/index.ts AuroraColdBrew (Join-Path ([System.IO.Path]::GetTempPath()) 'ecko-aurora-safe-depth.png') --frame=156 --scale=0.5 --log=error
npx remotion still src/index.ts AuroraColdBrew (Join-Path ([System.IO.Path]::GetTempPath()) 'ecko-aurora-safe-depth-v2.png') --frame=156 --scale=0.5 --log=error
npx remotion still src/index.ts AuroraColdBrew (Join-Path ([System.IO.Path]::GetTempPath()) 'ecko-aurora-procedural-depth.png') --frame=156 --scale=0.5 --log=error
npm run render:aurora
npm run qa:temporal
ffprobe -v error -show_entries stream=index,codec_type,codec_name,width,height,r_frame_rate,avg_frame_rate,duration,nb_frames -show_entries format=duration,size,bit_rate -of json commercials/aurora-cold-brew/output/aurora-cold-brew-v1-1.mp4
ffmpeg -v error -i commercials/aurora-cold-brew/output/aurora-cold-brew-v1-1.mp4 -map 0 -f null NUL
ffmpeg -hide_banner -nostats -i commercials/aurora-cold-brew/output/aurora-cold-brew-v1-1.mp4 -vf "freezedetect=n=-50dB:d=1,blackdetect=d=0.3:pix_th=0.05" -an -f null NUL
Get-ChildItem -Path .\commercials\aurora-cold-brew\assets\*.png | Get-FileHash -Algorithm SHA256
```

`npm run render:aurora` itself executed `npm run prepare:aurora`, which regenerated the deterministic procedural audio, synchronized public assets, and ran the complete validator before Remotion rendered. The procedure is reproducible, but a single recorded MP4 hash is artifact evidence rather than proof that future encoder runs will be byte-identical.

## Remaining production limitations

- Flattened stills cannot provide true occlusion-aware product/background parallax; duplicated-image separation was removed after it failed visual QA.
- Canonical images already contain small baked promotional phrases that are not independently editable. v1.1 adds no such claims but cannot remove source pixels without new approved assets.
- The generated mono audio bed is a deterministic benchmark cue track, not a professionally mixed/mastered or rights-cleared commercial score.
- Typography uses system Arial rather than an approved brand font package.
- No continuous real-time playback surface was available to this agent; a Human should watch the rendered MP4 with sound before publication.
- There is no color-managed mastering, broadcast loudness pass, device testing, compression ladder, accessibility review, or legal/brand approval.
- Procedural CSS atmosphere is intentionally restrained and is not a physical liquid, condensation, or volumetric simulation.

## Acceptance status

All machine-verifiable Issue #2 criteria are satisfied: validation, strict TypeScript, exact visual duration/frame count/dimensions/rate, nine governed beats, reusable deterministic motion primitives and procedural systems, a reproducible rendering procedure, local MP4, documentation, temporal evidence, and clean artifact policy. The continuous full-speed audiovisual viewing criterion remains pending Human playback because the execution environment exposed no usable media surface. Therefore the complete Issue #2 acceptance set is not claimed as fully satisfied.
