# Benchmark #001 — Lessons for Factory v1.2

## Scope

This document records only the lessons selected for generalization from the Sol/Codex v1.1 vs Astra #001 A/B benchmark.

It is not a copy of the Astra implementation and does not make the benchmark branch part of the Factory runtime.

## What Astra demonstrated well

### Campaign-specific design judgment

Astra produced stronger product hierarchy, more deliberate negative space, clearer editorial typography, stronger hero holds, and a more directed commercial arc.

### Source-aware treatment

Astra treated the flattened source images as design material rather than merely backgrounds. Product isolation and same-source optical cleanup improved product focus when applied safely.

### Audio direction

Astra used a shared frame clock to author stereo musical sections and accents, then measured loudness and true peak.

### Media finishing

Astra explicitly verified yuv420p and BT.709 metadata and used stream-copy metadata correction instead of unnecessary re-encoding.

### Adversarial validation

Astra tested contract mutations such as timing gaps, overlaps, copy drift, scene drift, bad cues, wrong assets, source corruption, changed runtime settings, and unsupported claims.

### Autonomous planning

Creative corrections were made internally without human creative direction changes. This supports Astra's use as a design/planning agent.

## What Sol/Codex demonstrated well

### Reusable engineering primitives

Sol/Codex created generic camera, depth, atmosphere, lighting, transition, typography, impact, and timeline abstractions that are more reusable across campaigns.

### Source-of-truth discipline

The Factory v1.1 implementation strengthened governed timing, asset hashes, cue derivation, fail-closed validation, and fresh-clone QA behavior.

### Architectural portability

The implementation is less dependent on AURORA-specific geometry and therefore better suited as the canonical Factory core.

## Selected v1.2 integration lessons

Generalize:

1. explicit Creative Direction Contract;
2. product-isolation adapter boundary;
3. scene-family and beat-treatment planning;
4. stronger editorial hierarchy / hero-hold planning;
5. stereo cue-driven audio architecture;
6. loudness and true-peak evidence;
7. BT.709/yuv420p mastering verification;
8. adversarial contract mutation tests;
9. all-frame and beat/transition temporal QA;
10. publication playback as a release gate.

Do not generalize:

- AURORA-specific matte coordinates;
- source-specific texture-patch coordinates;
- Astra's exact visual style;
- any assumption that every campaign needs isolation, serif typography, aurora light, or the same pacing;
- campaign-specific scene implementations as generic Factory primitives.

## Role conclusion

The preferred operating model is:

- **Astra:** Designer / Planner / Creative Systems Architect
- **Sol/Codex:** Implementer / Engineering Core / Production Executor

This role separation is itself a benchmark result and is part of the v1.2 architecture.
