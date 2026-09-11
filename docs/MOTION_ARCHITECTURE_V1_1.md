# Factory v1.1 Motion Architecture

## Scope

Factory v1.1 upgrades ACB-001 without changing its governed campaign identity, nine beat IDs, beat purposes, start/end timing, approved copy, 1080x1920 format, 30 fps rate, or 40-second duration. The five SHA-256-pinned source images remain canonical. Motion descriptions may be clarified in the storyboard, but campaign semantics may not change.

## Baseline

The v1.0 renderer places one flattened image in each `Sequence`, applies a linear whole-frame scale/translation, adds a fixed-lifecycle type card, and cuts directly to the next beat. Its only specialized effects are a linear gradient sweep and a short sinusoidal shake. The audio generator encodes beat hits separately from the composition, and validation checks only timing contiguity, positive durations, asset existence, and final storyboard duration. The baseline TypeScript check fails because React declarations are absent.

## Design

### Governed timeline

`src/commercials/aurora/timeline.ts` is the single runtime choreography source. It mirrors the governed storyboard boundaries and copy and defines scene recipes, named cues, and selective transition accents. Validation compares it with the brief and storyboard so drift fails closed. The audio generator reads governed storyboard boundaries instead of maintaining a second list of hit times.

### Reusable primitives

- `CinematicCamera` converts an eased camera recipe into deterministic scale, translation, rotation, and optional impact displacement.
- `LayeredScene` renders a protected full-bleed canonical image plus procedural background glow and foreground veils. Early masked-image tests exposed baked-text ghosting, so duplicated source-image depth was removed; each recipe can still reduce procedural depth to zero.
- `AtmosphericParticles` creates seeded mist, droplets, and fine sparkle without runtime randomness.
- `AuroraLight` provides restrained volumetric beams, glow breathing, and directional scans.
- `ImpactMotion` exposes deterministic attack, recoil, shake decay, and settle values.
- `KineticTypography` keeps approved copy editable and choreographs token or character entrance, hold, and exit within the owning beat.
- `CinematicTransition` renders only named timeline accents. Hard cuts remain valid and are used where impact is stronger than overlap.
- `AudioCueTimeline` derives cue proximity from the same governed beat boundaries used by visual accents.

### Scene composition

Nine scene recipes map one-to-one to S01-S09. Each scene establishes a single visual priority and combines only primitives that support it. Depth is intentionally strongest on spacious hero/macro frames and minimal on close product crops. S05 uses impact/recoil/settle; S03 and S08 use kinetic copy; S09 settles into a stable hero end card with no late positional drift.

### Transition grammar

Transitions are overlays around selected exact beat boundaries, so the nine semantic durations still total 1200 frames. The grammar uses: cold black veil for reveal/close, emerald luminous bridge for related aurora imagery, and a short exposure flash for the S05 impact. Boundaries whose energy benefits from an immediate cut remain hard cuts.

### Determinism and visual safety

No primitive uses unseeded randomness, wall-clock time, CSS animations, or asynchronous external data. Particle placement is derived from stable integer hashes. The canonical image always covers the frame. Depth is restricted to procedural veils, light, mist, droplets, and sparkle after masked source-image duplicates proved unsafe in temporal QA. Temporal QA samples several frames in every affected beat and on both sides of selected boundaries. Any visible halo, seam, uncovered edge, or implausible separation is resolved by reducing or disabling that depth layer.

## Validation

`npm run validate` must verify:

- brief, storyboard, and runtime contract agree on ACB-001, 40 seconds, 30 fps, and 1080x1920;
- exactly S01-S09 are contiguous and preserve their governed purposes, times, assets, and approved copy;
- canonical assets exist and match `ASSET_SHA256.txt`;
- timeline cues are derived from governed boundaries;
- audio is generated at exactly 40 seconds from governed timing;
- TypeScript compiles under `npm run typecheck`.

The final render is inspected with `ffprobe` for visual duration, frame count, rate, dimensions, codecs, and separate container duration. Temporal frame strips cover layer movement, depth edges, atmosphere, lighting, transitions, typography phases, impact phases, and end-card stability.

## Output policy

The v1.0 conceptual contract and existing renderer history remain intact in Git. The v1.1 render is written to `commercials/aurora-cold-brew/output/aurora-cold-brew-v1-1.mp4`, which remains ignored by repository policy.
