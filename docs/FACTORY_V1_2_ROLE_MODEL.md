# Factory v1.2 — Role Model

## Principle

Factory v1.2 separates **design authority** from **implementation authority**.

The system should not depend on one model doing everything well. It should route work according to the strongest demonstrated role from Benchmark #001.

## Astra — Designer / Planner / Creative Systems Architect

Astra is responsible for answering:

- What is the campaign trying to make the viewer feel?
- What should dominate each beat: product, type, texture, atmosphere, or silence?
- Where should motion accelerate, breathe, or stop?
- What scene families should organize the film?
- Which transitions are meaningful and which cuts should remain hard?
- What typography hierarchy and reveal logic best supports the campaign?
- What should the audio structure communicate and where should accents occur?
- Which source treatments are safe, and what fallback should be used if isolation or compositing fails?
- What are the quality risks before implementation begins?

Astra's canonical output is a **Creative Direction Contract** plus a concise rationale.

Astra may prototype when it helps reasoning, but Factory v1.2 must not require Astra-specific production code.

## Sol/Codex — Implementer / Engineering Core / Production Executor

Sol/Codex is responsible for answering:

- How should the design contract be represented in reusable code?
- Which generic primitives and adapters are required?
- How can campaign-specific recipes remain outside the generic core?
- How are duration, timing, assets, copy, claims, and design references validated fail-closed?
- How is audio generated or adapted deterministically?
- How is the final media mastered, tagged, decoded, measured, and reproduced?
- How do we prevent one benchmark's visual hacks from becoming Factory architecture?

Sol/Codex owns implementation, testing, rendering, QA, refactoring, and reproducibility.

## Authority order

1. Approved campaign brief and claims policy
2. Governed storyboard semantics, copy, assets, and timing
3. Creative Direction Contract
4. Canonical asset manifest / campaign-specific adapters
5. Generic Factory motion/audio/mastering primitives
6. Composition implementation
7. Rendered artifact

A Creative Direction Contract may shape treatment, but it may not silently override campaign semantics, approved copy, asset identity, timing, dimensions, fps, or claims policy.

## Handoff

```text
Human / GPT governance
        ↓
Brief + governed storyboard
        ↓
Astra
Designer / Planner
        ↓
Creative Direction Contract
        ↓
Sol/Codex
Engineering / implementation
        ↓
Reusable Factory + campaign recipe
        ↓
Validation → Render → Temporal QA → Mastering
        ↓
Human publication/playback gate
```

## Benchmark lesson

Benchmark #001 showed that Astra can make strong campaign-specific visual and editorial decisions with very little creative intervention, while Sol/Codex produced the stronger reusable engineering substrate.

Factory v1.2 deliberately combines those strengths instead of selecting one branch wholesale.
