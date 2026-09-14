# NOVAEL ARC — Canonical Asset Generation Specification

Campaign: `NVA-002`  
Purpose: create the five canonical source images for Benchmark #002 before Astra design begins.

## Product identity lock

Every source image must depict the same fictional product:

- Product name: NOVAEL ARC Lamp.
- Geometry: one continuous asymmetrical arch / crescent body rising from a low circular base.
- Main body: matte graphite, smooth and minimally faceted.
- Inner light surface: frosted translucent diffuser following the inner arc.
- Base: low circular dark stone / graphite pedestal, visually integral to the lamp.
- Emission: warm amber only when lit.
- No visible cable, app UI, buttons, screen, specification text or real-world brand mark.
- No baked campaign copy.
- No product redesign between images.

The five images are one product photographed in different compositions, not five stylistic reinterpretations.

## Global visual rules

- Premium architectural-product photography, not fantasy concept art.
- Dark neutral studio/interior environment.
- Warm amber light is the only dominant accent color.
- No emerald/aurora look, beverage condensation, coffee, ice or AURORA visual motifs.
- Maintain physically plausible contact shadow and base placement.
- Keep useful negative space for editable code typography.
- Avoid hands, people, text, logos, UI overlays and unrelated props.
- Avoid blown highlights on the diffuser.
- Preserve sharp product edges and material continuity.
- Portrait composition must be crop-safe for final 9:16 use.
- Source resolution should be at least sufficient for 1080×1920 delivery after crop/scale.

## Canonical files

### `shot-01-hero.png`

Purpose: sculptural reveal and later breathing room.

- Three-quarter hero view.
- Full product visible from base to top of arc.
- Lamp either unlit or carrying only a very faint warm residual glow.
- Dark charcoal background with a soft stone surface.
- Strong silhouette separation and generous negative space.
- Product centered slightly below vertical midpoint.

### `shot-02-detail.png`

Purpose: material/form study.

- Close crop of the junction between graphite shell and frosted inner diffuser.
- Same geometry/materials as hero.
- Macro-level material clarity without inventing seams or controls.
- Warm reflection may be present but the lamp is not fully active.
- Enough recognizable curvature to prove it is the same object.

### `shot-03-profile.png`

Purpose: editorial `FORM.` beat.

- Clean side/profile composition.
- Full lamp readable as one sculptural object.
- Mostly unlit.
- Strong dark negative space suitable for editable copy that does not cross the product.
- No source text.

### `shot-04-lit.png`

Purpose: activation and `GLOW.` beat.

- Same product and view family as the canonical hero, but clearly illuminated.
- Inner diffuser emits controlled warm amber light.
- Plausible light spill on adjacent wall/surface.
- Product geometry remains unchanged.
- No exaggerated volumetric beam, neon tube look or fantasy bloom.

### `shot-05-endcard.png`

Purpose: final brand memory / campaign-line close.

- Stable centered hero composition.
- Lamp lit with restrained warm amber output.
- Clean negative space reserved for editable `HOLD THE LIGHT.` and NOVAEL branding in code.
- No baked copy or source-generated wordmark.
- Composition should remain legible at phone size.

## Consistency review before hashing

Before any image enters the canonical asset pack, visually verify:

1. The outer arch shape is the same across all images.
2. Base diameter/height and product proportions match.
3. Diffuser follows the same inner-arc geometry.
4. Materials remain matte graphite + frosted translucent diffuser.
5. Lit/unlit state changes do not change physical geometry.
6. No unintended text/logo/claims appear.
7. No image depends on AURORA-specific motifs.
8. Each image is source-safe for whole-image treatment if masking is not approved.

If consistency is doubtful, regenerate rather than rationalize the mismatch.

## Canonicalization procedure

After the five images pass visual review:

1. Save exactly under `commercials/novael-arc/assets/` with the governed filenames.
2. Compute SHA-256 for every file.
3. Create `commercials/novael-arc/assets/ASSET_SHA256.txt` with one uppercase hash + filename per line.
4. Commit images and manifest together as a dedicated asset checkpoint.
5. Do not begin Astra design until the asset checkpoint is independently confirmed.

## State

`SPEC_READY / ASSETS_NOT_YET_MATERIALIZED`
