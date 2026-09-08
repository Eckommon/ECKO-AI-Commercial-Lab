# Codex operating contract

## Role

You are the motion implementation agent for AI Commercial Factory v1.0.

## Source of truth order

1. commercial brief
2. storyboard JSON
3. asset manifest
4. reusable motion components
5. composition implementation

## Rules

- Do not change approved campaign copy silently.
- Do not invent factual product claims.
- Preserve exact campaign duration and target dimensions.
- Prefer reusable components over one-off effects.
- Keep typography editable in code.
- Run `npm run validate` before rendering.
- Render only after validation passes.
- Treat missing assets or timing gaps as blocking errors.
- When changing visual timing, update storyboard and code together.

## Benchmark command

```bash
npm install
npm run validate
npm run render:aurora
```


## Benchmark #001-ASTRA independence contract

This branch is an independent benchmark starting from the pre-v1.1 baseline.

When working on GitHub Issue #4:

- Read `docs/BENCHMARK_001_ASTRA_PROTOCOL.md`.
- Read `docs/ASTRA_BENCHMARK_MISSION.md`.
- Record material human interventions in `docs/ASTRA_HUMAN_INTERVENTION_LOG.md`.
- Do not inspect, fetch, compare, cherry-pick, merge, or copy from:
  - `factory/v1.1-motion-quality-upgrade`
  - PR #3
  - commit `163f49f...`
  - commit `25c2807...`
  - any Sol/Codex v1.1 source, architecture, validation, or QA artifacts.
- Solve the commercial independently from this branch's repository truth.
- The same canonical five source assets and governed ACB-001 campaign contract must be preserved.
- External generative-video services are excluded from this benchmark.
- Do not merge this branch.
