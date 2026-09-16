# NOVAEL ARC — Asset Generation Mission

Campaign: `NVA-002`
Parent: Issue #10

This mission materializes the five canonical source images for Benchmark #002. It is deliberately **reference-first**: the pack must depict one physical fictional lamp across all views, not five loosely similar concepts.

## Authority

1. `commercials/novael-arc/brief/brief.json`
2. `commercials/novael-arc/storyboard/storyboard.json`
3. `commercials/novael-arc/assets/ASSET_GENERATION_SPEC.md`
4. this mission

If any prompt wording conflicts with the governed brief/spec, the governed files win.

## Product identity lock

NOVAEL ARC is one sculptural ambient lamp:

- one continuous asymmetrical arch / crescent body;
- matte graphite outer shell;
- frosted translucent diffuser following the inner arc;
- low circular dark-stone / graphite base;
- no visible cable, controls, screen, app UI, ports or buttons;
- no real-world trademark or generated wordmark;
- no baked advertising copy;
- warm amber emission only when lit;
- physically plausible studio/interior photography.

The geometry is immutable after `shot-01-hero.png` is accepted.

## Generation policy

### Stage A — identity anchor

Generate **only** `shot-01-hero.png` first.

Do not generate the other four canonical views until the hero passes identity review.

### Stage B — reference-guided views

Use the accepted hero as the visual/product reference for the remaining views whenever the image system supports reference-guided generation or image editing.

The instruction for every derivative view is:

> Preserve the exact physical identity of the reference lamp: same outer arch curvature, same base diameter and height, same diffuser path, same shell thickness, same material boundaries and same proportions. Change only camera position, crop, lighting state and studio composition requested below. Do not redesign or reinterpret the product.

If the image system cannot preserve a stable reference identity, do not silently accept approximate lookalikes. Keep Issue #10 at `ASSET_PACK_HOLD`.

## Negative lock — applies to all five images

Do not include:

- text, labels, campaign copy or logos;
- AURORA branding or emerald/green aurora motifs;
- beverage, coffee, condensation, ice, cans or food styling;
- neon-tube styling;
- fantasy volumetric beams;
- floating product or missing contact shadow;
- people, hands or unrelated decorative props;
- invented seams, switches, ports, screens or controls;
- changed product proportions between views.

## Prompt 01 — `shot-01-hero.png`

**Role:** canonical identity anchor / sculptural reveal.

Create a premium architectural-product photograph in a vertical portrait composition suitable for 9:16 delivery. Show one fictional NOVAEL ARC ambient lamp in a three-quarter hero view, full object visible from low circular base to top of the asymmetrical arch. The body is matte graphite with restrained smooth faceting; a frosted translucent diffuser follows the inner curve of the arch. The lamp is unlit or carries only an extremely faint warm residual glow. Place it on a dark stone surface against a charcoal studio/interior background. Use soft directional light, physically plausible contact shadow, crisp product edges and generous negative space. Center the product slightly below the vertical midpoint. No text, no logo, no cable, no controls, no people, no decorative props, no neon aesthetic, no emerald light.

**Acceptance focus:** this image establishes the immutable product geometry for all remaining shots.

## Prompt 02 — `shot-02-detail.png`

**Reference:** approved `shot-01-hero.png` is mandatory.

Preserve the exact lamp geometry and materials from the reference. Create a close material-study crop focused on the junction between the matte graphite shell and the frosted inner diffuser. The curvature must unmistakably belong to the same NOVAEL ARC lamp. Show premium macro clarity in the graphite surface and frosted diffuser without inventing seams, controls or construction details. The lamp remains mostly unlit; a subtle warm reflection is allowed but not a full active glow. Use controlled shallow depth cues while keeping the material boundary sharp enough for product recognition. Dark neutral environment, no text, no logo, no props.

**Acceptance focus:** same shell thickness, diffuser path and curvature as the hero.

## Prompt 03 — `shot-03-profile.png`

**Reference:** approved `shot-01-hero.png` is mandatory.

Preserve the exact physical lamp from the reference and rotate only the camera to a clean side/profile composition. Show the complete lamp and base as one coherent sculptural object. Keep it mostly unlit. Maintain the same asymmetrical outer arch, base proportions, graphite shell thickness and frosted inner diffuser geometry. Place the product so that substantial dark negative space remains available for editable code typography without crossing the lamp. Premium editorial product photography, charcoal/stone environment, physically plausible contact shadow, no text or logos.

**Acceptance focus:** profile view must not redesign the arch or base.

## Prompt 04 — `shot-04-lit.png`

**Reference:** approved `shot-01-hero.png` is mandatory.

Preserve the exact same NOVAEL ARC lamp geometry and three-quarter view family from the reference. Change only the illumination state: the inner frosted diffuser now emits a controlled warm amber light. Keep the graphite shell, arch curvature, diffuser path, base dimensions and object proportions identical to the hero. Add restrained physically plausible amber spill on the adjacent wall/surface. Protect diffuser detail from clipping; avoid fantasy bloom, neon-tube appearance and volumetric beams. Dark neutral architectural environment, no text, no logos, no people or props.

**Acceptance focus:** lighting state changes; product geometry does not.

## Prompt 05 — `shot-05-endcard.png`

**Reference:** approved `shot-01-hero.png` is mandatory.

Preserve the exact same NOVAEL ARC lamp geometry and materials from the reference. Create a stable centered hero/endcard composition for vertical 9:16 delivery. The inner diffuser emits restrained warm amber light with realistic soft spill. Keep the product fully legible at phone size and reserve clean negative space for later editable NOVAEL branding and the campaign line `HOLD THE LIGHT.` in code; do not bake any words into the source image. Matte graphite shell, frosted diffuser, low circular base, dark stone/charcoal environment, physically plausible contact shadow, no logos, no controls, no people or unrelated props.

**Acceptance focus:** stable closing composition with source-safe negative space and unchanged product identity.

## Side-by-side acceptance checklist

Before hashing, place all five images side by side and verify:

1. identical outer-arch identity;
2. consistent shell thickness and material boundary;
3. consistent diffuser path and width;
4. consistent base diameter/height;
5. unchanged product proportions across hero/profile/lit/endcard;
6. detail image can be mapped back to the hero geometry;
7. lit/unlit changes affect illumination only;
8. no unintended text/logo/claims;
9. no AURORA visual leakage;
10. enough image resolution and composition for 1080×1920 delivery.

Any material inconsistency means regenerate the offending image. Do not rationalize it as an alternative product variant.

## Canonicalization

Only after visual acceptance:

1. save the five governed filenames under `commercials/novael-arc/assets/`;
2. run `node scripts/validate_novael_assets.mjs` after creating `ASSET_SHA256.txt`;
3. commit the five PNGs + manifest together as one dedicated asset checkpoint;
4. request independent GPT verification;
5. start Astra design-only work only after `ASSET_PACK_PASS`.

## Materialization provenance

For Benchmark #002, the accepted source Hero and derivative canonical views were created in the ChatGPT image-generation / GPT working environment, **not by Codex**. The five candidate canonical PNGs were normalized to 1080×1920 and packaged outside the repository before local materialization. The repository becomes canonical only after those exact bytes are copied into `commercials/novael-arc/assets/`, the hash manifest is validated locally, and a dedicated checkpoint commit is pushed.

## State

`GPT_SANDBOX_ASSET_PACK_READY / LOCAL_REPO_MATERIALIZATION_PENDING`
