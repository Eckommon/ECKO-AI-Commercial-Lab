import assert from 'node:assert/strict';
import {resolveSourceSurface} from '../src/factory/source-surface.ts';
import {AURORA_V12_RECIPES, completionFrame, settledFrame} from '../src/commercials/aurora/recipe.ts';

assert.deepEqual(resolveSourceSurface({mode: 'whole-source', fallbackMode: 'whole-source'}), {
  mode: 'whole-source', fallbackMode: 'whole-source', mask: undefined, cleanup: undefined,
});
assert.throws(() => resolveSourceSurface({mode: 'mask', fallbackMode: 'whole-source'}), /mask adapter/i);
assert.throws(() => resolveSourceSurface({mode: 'cleanup', fallbackMode: 'whole-source'}), /cleanup adapter/i);
assert.equal(resolveSourceSurface({mode: 'mask', mask: {id: 'campaign-mask'}, fallbackMode: 'whole-source'}).mask.id, 'campaign-mask');

assert.equal(Object.keys(AURORA_V12_RECIPES).length, 9);
for (const recipe of Object.values(AURORA_V12_RECIPES)) assert.equal(recipe.surface.allowMask, false);
assert.equal(AURORA_V12_RECIPES.S08.layout.kind, 'split-panel');
assert.equal(AURORA_V12_RECIPES.S08.layout.sourcePanelRatio, 0.72);
assert.equal(AURORA_V12_RECIPES.S06.layout.kind, 'editorial-field');
assert.equal(AURORA_V12_RECIPES.S06.layout.color, '#06100d');
assert.equal(AURORA_V12_RECIPES.S09.layout.color, '#06100d');
assert.equal(AURORA_V12_RECIPES.S03.textPlacement, 'bottom');
assert.equal(settledFrame(150, 0.32), 48);
assert.equal(settledFrame(180, 0.30), 54);
assert.equal(completionFrame(120, 0.25), 30);
assert.equal(completionFrame(120, 0.40), 48);
assert.equal(AURORA_V12_RECIPES.S05.energyRank, 1);
assert.ok(AURORA_V12_RECIPES.S07.camera.travel < AURORA_V12_RECIPES.S02.camera.travel);
assert.deepEqual(AURORA_V12_RECIPES.S07.cameraRecipe.x, [-12, 10]);
assert.equal(AURORA_V12_RECIPES.S05.cameraRecipe.settleAt, .32);
assert.equal(AURORA_V12_RECIPES.S06.cameraRecipe.settleAt, .30);
assert.equal(AURORA_V12_RECIPES.S09.cameraRecipe.settleAt, .25);
console.log('PASS: generic source-surface policy and AURORA v1.2 recipe invariants');
