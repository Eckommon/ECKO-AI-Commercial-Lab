# Benchmark 001-ASTRA command record

Working directory throughout: `C:\ECKO-AI-Commercial-Lab` (PowerShell).
Source/document edits were made through `apply_patch`, not through shell rewrites.
Repeated successful invocations are grouped. No fetch, history comparison,
checkout, commit, push, PR mutation or merge was performed.

## Initial audit

```powershell
git branch --show-current
git rev-parse HEAD
Get-Content AGENTS.md
Get-Content docs/BENCHMARK_001_ASTRA_PROTOCOL.md
Get-Content docs/ASTRA_BENCHMARK_MISSION.md
Get-Content docs/ASTRA_HUMAN_INTERVENTION_LOG.md
git status --short
rg --files -g '!package-lock.json' -g '!node_modules/**' -g '!out/**'
git ls-files
Get-Content README.md,package.json,tsconfig.json,.gitignore
Get-Content docs/FACTORY_ARCHITECTURE.md,docs/STORYBOARD_SPEC.md,docs/LOCAL_SETUP_WINDOWS.md
Get-Content commercials/aurora-cold-brew/brief/brief.json,commercials/aurora-cold-brew/storyboard/storyboard.json,commercials/aurora-cold-brew/assets/README.md,commercials/aurora-cold-brew/assets/ASSET_SHA256.txt
Get-Content src/Root.tsx,src/index.ts,src/commercials/aurora/AuroraCommercial.tsx,src/components/*.tsx
Get-Content scripts/validate.mjs,scripts/sync_aurora_assets.mjs,scripts/generate_aurora_audio.py
Get-Content factory/brief.schema.json,factory/storyboard.schema.json
Get-Content package-lock.json -TotalCount 65
Get-Command ffmpeg,ffprobe,python,npm | Select-Object Name,Source
Get-FileHash commercials/aurora-cold-brew/assets/*.png -Algorithm SHA256 | Format-List Path,Hash
python -c "import PIL,numpy; print(PIL.__version__,numpy.__version__)"
node -e "console.log(require('remotion/package.json').version)"
node -e "console.log(JSON.stringify({node:process.version,remotion:require('remotion/package.json').version,react:require('react/package.json').version,typescript:require('typescript/package.json').version}))"
```

All five canonical PNGs were opened with the local image-view tool. The initial
`rg --files` exposed names under pre-existing untracked `output/qa`; no file
contents there were read. Later discovery was restricted to this task's paths.
A narrow memory-registry search for `Commercial|AURORA|ECKO-AI` returned no hits;
no prior project implementation was used. Skill instructions were read from the
installed Remotion, brainstorming, writing-plans, execution, verification and
browser packages. They are generic workflow instructions, not benchmark source.

## Unmodified v1.0 baseline

```powershell
npm install
npm run validate
npm run prepare:aurora
npx remotion render src/index.ts AuroraColdBrew artifacts/astra-001/baseline.mp4 --codec=h264 --crf=18 --concurrency=4
ffmpeg -hide_banner -loglevel error -i artifacts/astra-001/baseline.mp4 -vf "fps=1,scale=216:384,tile=8x5" -frames:v 1 artifacts/astra-001/baseline-contact.png
ffprobe -v error -count_frames -show_entries stream=codec_type,codec_name,width,height,r_frame_rate,nb_read_frames,duration:format=duration,size -of json artifacts/astra-001/baseline.mp4
```

An early contact/probe attempt ran before encoding finished and returned file
not found. It made no media evidence. The successful commands above ran after
the renderer returned exit 0; all baseline observations use that completed MP4.
The earlier failed probe used `-show_streams -show_format -of json`.

## Implementation, validation and previews

```powershell
npm run preview:aurora
npm install --save-dev --save-exact @types/react@19 @types/react-dom@19
npm run preview:aurora
ffmpeg -hide_banner -loglevel error -i artifacts/astra-001/preview.mp4 -vf "fps=1,scale=216:384,tile=8x5" -frames:v 1 artifacts/astra-001/preview-contact.png
ffmpeg -hide_banner -loglevel error -ss 24 -i artifacts/astra-001/preview.mp4 -frames:v 1 artifacts/astra-001/preview-hero.png
ffmpeg -hide_banner -loglevel error -ss 18 -i artifacts/astra-001/preview.mp4 -frames:v 1 artifacts/astra-001/preview-impact.png
npm run preview:aurora
python scripts/qa_astra.py artifacts/astra-001/preview.mp4 --label preview-02
npm run validate
npx remotion still src/index.ts AuroraColdBrew artifacts/astra-001/check-impact.png --frame=550 --scale=0.5 --log=error
npx remotion still src/index.ts AuroraColdBrew artifacts/astra-001/check-hero.png --frame=720 --scale=0.5 --log=error
```

First preview was correctly blocked by TypeScript: the baseline had no React
declarations. The exact installed development versions are 19.2.18 and 19.2.7.
Runtime dependency versions did not change. A preview QA extraction failed on
unescaped FFmpeg expression commas; the filter was corrected to `eq(n\,frame)`.
This failure did not invalidate the successful earlier full-stream decode and
overview generation, but the partial QA run is not treated as a final pass.

## Full render and final verification

```powershell
npm run render:aurora
python scripts/qa_astra.py artifacts/astra-001/baseline.mp4 --label baseline
python scripts/qa_astra.py artifacts/astra-001/aurora-astra.mp4 --label final
```

The first full render was reviewed, then retained before the final silhouette
and color correction:

```powershell
if (Test-Path -LiteralPath 'C:\ECKO-AI-Commercial-Lab\artifacts\astra-001\iteration-01.mp4') { throw 'Evidence destination already exists' }
Move-Item -LiteralPath 'C:\ECKO-AI-Commercial-Lab\artifacts\astra-001\aurora-astra.mp4' -Destination 'C:\ECKO-AI-Commercial-Lab\artifacts\astra-001\iteration-01.mp4'
Rename-Item -LiteralPath 'C:\ECKO-AI-Commercial-Lab\artifacts\astra-001\final' -NewName 'iteration-01-qa'
npm run render:aurora
npm run validate 2>&1 | Tee-Object -FilePath artifacts/astra-001/validation.log
```

Final render expansion (after preparation and passing validation):

```powershell
remotion render src/index.ts AuroraColdBrew artifacts/astra-001/aurora-astra.mp4 --codec=h264 --crf=18 --image-format=png --color-space=bt709 --pixel-format=yuv420p --concurrency=4 --log=error
```

`prepare:aurora` expands to `python scripts/generate_astra_audio.py`,
`node scripts/prepare_astra.mjs`, `npm run validate`, then
`node scripts/validate.mjs --prepared`. Validation expands to
`node scripts/validate.mjs`, `node --test scripts/test_astra_contract.mjs`, and
`tsc --noEmit`. Exact FFmpeg/ffprobe calls emitted by QA are recorded separately
in `docs/astra-evidence/final-commands.txt` and `baseline-commands.txt`.

Local installed implementation was inspected to verify color handling:

```powershell
Get-Content node_modules/@remotion/renderer/dist/options/color-space.js
Get-Content node_modules/@remotion/renderer/dist/ffmpeg-args.js -TotalCount 96
```

The optional playback attempt used a localhost-only server:

```powershell
python -m http.server 8765 --bind 127.0.0.1 --directory artifacts/astra-001
```

Browser runtime setup succeeded but selection reported `No browser is available`;
documented discovery returned `[]`. No actual playback or listening pass is
claimed. No external browser session, service or account was used.

Routine inspection during implementation also used scoped `Get-Content`,
`git diff --check`, `git diff --stat`, `git status --short`, and
`Get-Process -Name chrome-headless-shell,ffmpeg` to check render activity.

## Final color tagging, repeatability and handoff

The PNG/BT.709 render completed successfully. ffprobe showed the matrix and
limited range but missing H.264 transfer/primaries. The final pipeline now
renders to `aurora-astra-master.mp4` and runs `node scripts/finalize_astra.mjs`.
For the already completed render, the exact handoff commands were:

```powershell
if (Test-Path -LiteralPath 'C:\ECKO-AI-Commercial-Lab\artifacts\astra-001\aurora-astra-master.mp4') { throw 'Master destination already exists' }
Move-Item -LiteralPath 'C:\ECKO-AI-Commercial-Lab\artifacts\astra-001\aurora-astra.mp4' -Destination 'C:\ECKO-AI-Commercial-Lab\artifacts\astra-001\aurora-astra-master.mp4'
node scripts/finalize_astra.mjs
python scripts/qa_astra.py artifacts/astra-001/aurora-astra.mp4 --label final
```

Finalization invokes:

```powershell
ffprobe -v error -show_streams -of json artifacts/astra-001/aurora-astra-master.mp4
ffmpeg -hide_banner -v error -y -i artifacts/astra-001/aurora-astra-master.mp4 -map 0:v:0 -map 0:a:0 -c copy -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0 -movflags +faststart artifacts/astra-001/aurora-astra.mp4
```

Repeatability and packaging invariance:

```powershell
npx remotion still src/index.ts AuroraColdBrew artifacts/astra-001/repeat-a.png --frame=720 --log=error
npx remotion still src/index.ts AuroraColdBrew artifacts/astra-001/repeat-b.png --frame=720 --log=error
Get-FileHash artifacts/astra-001/repeat-a.png,artifacts/astra-001/repeat-b.png -Algorithm SHA256 | Format-List Path,Hash
ffmpeg -hide_banner -v error -y -i artifacts/astra-001/aurora-astra-master.mp4 -map 0:v:0 -f framemd5 artifacts/astra-001/master-frames.md5
ffmpeg -hide_banner -v error -y -i artifacts/astra-001/aurora-astra.mp4 -map 0:v:0 -f framemd5 artifacts/astra-001/delivery-frames.md5
Compare-Object (Get-Content artifacts/astra-001/master-frames.md5) (Get-Content artifacts/astra-001/delivery-frames.md5)
```

Both repeat-frame hashes match. Frame-MD5 comparison returned no differences.
Final verification/evidence commands:

```powershell
npm run validate 2>&1 | Tee-Object -FilePath artifacts/astra-001/validation.log
node scripts/validate.mjs --prepared
python scripts/qa_astra.py artifacts/astra-001/aurora-astra.mp4 --label final
python scripts/package_astra_evidence.py
node scripts/snapshot_astra.mjs
Get-FileHash commercials/aurora-cold-brew/assets/*.png -Algorithm SHA256 | Format-List Path,Hash
git diff --check
git status --short
```

Packaging copies compact evidence byte-for-byte from this run's own artifact
directories. The temporary playback server is stopped at handoff.
