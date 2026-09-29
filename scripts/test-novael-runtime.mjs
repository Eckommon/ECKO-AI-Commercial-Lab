import assert from 'node:assert/strict';
import {NOVAEL_BEATS, NOVAEL_CONTRACT, NOVAEL_CUES} from '../src/commercials/novael/timeline.ts';
import {NOVAEL_RECIPES} from '../src/commercials/novael/recipe.ts';

assert.deepEqual(NOVAEL_CONTRACT, {campaignId:'NVA-002', durationSec:30, fps:30, width:1080, height:1920});
assert.equal(NOVAEL_BEATS.length, 7);
assert.equal(NOVAEL_BEATS.reduce((sum, beat) => sum + beat.durationFrames, 0), 900);
assert.deepEqual(NOVAEL_CUES.map(({id, name, frame}) => [id, name, frame]), [
  ['S01','sub-hit',0], ['S03','sub-hit',240], ['S04','light-rise',360], ['S06','sub-hit',660], ['S07','sub-hit',780],
]);
assert.equal(NOVAEL_RECIPES.S01.settleFrame, 30);
assert.equal(NOVAEL_RECIPES.S02.settleFrame, 60);
assert.equal(NOVAEL_RECIPES.S03.typeCompleteFrame, 15);
assert.equal(NOVAEL_RECIPES.S04.settleFrame, 60);
assert.equal(NOVAEL_RECIPES.S05.settleFrame, 0);
assert.equal(NOVAEL_RECIPES.S06.typeCompleteFrame, 15);
assert.equal(NOVAEL_RECIPES.S07.typeCompleteFrame, 15);
assert.equal(NOVAEL_RECIPES.S05.motion, 'still');
assert.ok(Object.values(NOVAEL_RECIPES).every((recipe) => recipe.surface.mode === 'whole-source'));
assert.ok(Object.values(NOVAEL_RECIPES).every((recipe) => recipe.surface.allowMask === false && recipe.surface.allowSourceDerivedCleanup === false));
assert.ok(NOVAEL_BEATS.every((beat) => beat.transition === 'hard-cut'));
assert.equal(NOVAEL_BEATS.at(-1).startFrame + NOVAEL_BEATS.at(-1).durationFrames - 1, 899);

console.log('PASS: NOVAEL 900-frame hard-cut runtime and treatment deadlines');
