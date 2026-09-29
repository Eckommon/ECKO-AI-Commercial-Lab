import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {validateAuroraCampaign, validateNovaelCampaign} from '../factory/validate-campaigns.mjs';

const projectRoot = process.cwd();
const required = [
  'commercials/novael-arc/brief/brief.json',
  'commercials/novael-arc/storyboard/storyboard.json',
  'commercials/novael-arc/design/creative-direction.v1.2.json',
  'commercials/novael-arc/assets',
  'factory/creative_direction.schema.json',
  'src/commercials/novael/implementation-lock.v1.2.json',
  'src/commercials/novael/recipe.ts',
  'src/commercials/novael/timeline.ts',
];

const cloneFixture = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'novael-contract-'));
  for (const relative of required) {
    const source = path.join(projectRoot, relative);
    const destination = path.join(root, relative);
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.cpSync(source, destination, {recursive: true});
  }
  return root;
};

const jsonPath = (root, kind) => path.join(root, {
  brief: 'commercials/novael-arc/brief/brief.json',
  story: 'commercials/novael-arc/storyboard/storyboard.json',
  design: 'commercials/novael-arc/design/creative-direction.v1.2.json',
}[kind]);

const mutateJson = (root, kind, mutate) => {
  const target = jsonPath(root, kind);
  const value = JSON.parse(fs.readFileSync(target, 'utf8'));
  mutate(value);
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
};

const cases = [
  ['wrong campaign ID', 'brief', (x) => { x.campaignId = 'NVA-999'; }, /identity/i],
  ['duration drift', 'brief', (x) => { x.durationSec = 31; }, /duration/i],
  ['fps drift', 'brief', (x) => { x.fps = 24; }, /fps|format/i],
  ['resolution drift', 'brief', (x) => { x.resolution = '1920x1080'; }, /resolution|format/i],
  ['claims policy drift', 'brief', (x) => { x.claims = ['Emits measurable wellness energy.']; }, /claim/i],
  ['missing beat', 'story', (x) => { x.shots.pop(); }, /exactly 7|coverage/i],
  ['duplicate beat', 'story', (x) => { x.shots[1].id = 'S01'; }, /duplicate|semantics/i],
  ['unknown beat', 'story', (x) => { x.shots[1].id = 'S99'; }, /unknown|semantics/i],
  ['timing gap', 'story', (x) => { x.shots[2].startSec += .1; }, /gap/i],
  ['timing overlap', 'story', (x) => { x.shots[2].startSec -= .1; }, /overlap/i],
  ['wrong purpose', 'story', (x) => { x.shots[3].purpose = 'impact climax'; }, /semantics|purpose/i],
  ['wrong asset', 'story', (x) => { x.shots[3].asset = 'shot-01-hero.png'; }, /semantics|asset/i],
  ['wrong copy', 'story', (x) => { x.shots[2].copy = 'SHAPE.'; }, /semantics|copy/i],
  ['wrong cue', 'story', (x) => { x.shots[3].sfx = 'sub-hit'; }, /semantics|cue/i],
  ['unexpected S02 cue', 'story', (x) => { x.shots[1].sfx = 'sub-hit'; }, /semantics|cue/i],
  ['unexpected S05 cue', 'story', (x) => { x.shots[4].sfx = 'sub-hit'; }, /semantics|cue/i],
  ['impact grammar', 'story', (x) => { x.shots[3].sfx = 'impact-hit'; }, /semantics|cue/i],
  ['missing treatment', 'design', (x) => { x.beatTreatments.pop(); }, /coverage|treatment/i],
  ['duplicate treatment', 'design', (x) => { x.beatTreatments[6].beatId = 'S06'; }, /duplicate|treatment/i],
  ['unknown treatment', 'design', (x) => { x.beatTreatments[6].beatId = 'S99'; }, /unknown|treatment/i],
  ['unresolved family', 'design', (x) => { x.beatTreatments[0].sceneFamily = 'missing'; }, /family/i],
  ['mask enabled', 'design', (x) => { x.beatTreatments[0].sourceTreatment.allowMask = true; }, /mask/i],
  ['cleanup enabled', 'design', (x) => { x.beatTreatments[0].sourceTreatment.allowSourceDerivedCleanup = true; }, /cleanup/i],
];

const valid = validateNovaelCampaign({root: projectRoot});
assert.equal(valid.runtime.campaignId, 'NVA-002');
assert.equal(valid.runtime.beats.length, 7);
assert.equal(validateAuroraCampaign({root: projectRoot}).runtime.campaignId, 'ACB-001');

for (const [name, kind, mutate, expected] of cases) {
  const root = cloneFixture();
  try {
    mutateJson(root, kind, mutate);
    assert.throws(() => validateNovaelCampaign({root}), expected, name);
  } finally {
    fs.rmSync(root, {recursive: true, force: true});
  }
}

for (const [name, alter, expected] of [
  ['missing source', (root) => fs.rmSync(path.join(root, 'commercials/novael-arc/assets/shot-01-hero.png')), /missing asset/i],
  ['corrupt source', (root) => fs.appendFileSync(path.join(root, 'commercials/novael-arc/assets/shot-01-hero.png'), 'corrupt'), /SHA-256/i],
  ['manifest drift', (root) => {
    const manifest = path.join(root, 'commercials/novael-arc/assets/ASSET_SHA256.txt');
    fs.writeFileSync(manifest, fs.readFileSync(manifest, 'utf8').replace(/^[A-Fa-f0-9]{64}/, '0'.repeat(64)));
  }, /SHA-256|hash/i],
  ['design byte drift', (root) => fs.appendFileSync(jsonPath(root, 'design'), ' '), /binding|SHA-256/i],
  ['design line-ending byte drift', (root) => {
    const target=jsonPath(root,'design');
    fs.writeFileSync(target,fs.readFileSync(target,'utf8').replace(/\n/g,'\r\n'));
  }, /binding|SHA-256/i],
]) {
  const root = cloneFixture();
  try {
    alter(root);
    assert.throws(() => validateNovaelCampaign({root}), expected, name);
  } finally {
    fs.rmSync(root, {recursive: true, force: true});
  }
}

console.log(`PASS: NOVAEL contract and ${cases.length + 5} adversarial mutations`);
