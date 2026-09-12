import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {validateAuroraCampaign} from '../factory/validate-contract.mjs';

const projectRoot = process.cwd();
const required = [
  'commercials/aurora-cold-brew/brief/brief.json',
  'commercials/aurora-cold-brew/storyboard/storyboard.json',
  'commercials/aurora-cold-brew/design/creative-direction.v1.2.json',
  'commercials/aurora-cold-brew/assets',
  'factory/creative_direction.schema.json',
  'src/commercials/aurora/timeline.ts',
];

const cloneFixture = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-contract-'));
  for (const relative of required) {
    const source = path.join(projectRoot, relative);
    const destination = path.join(root, relative);
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.cpSync(source, destination, {recursive: true});
  }
  return root;
};

const jsonPath = (root, kind) => path.join(root, {
  brief: 'commercials/aurora-cold-brew/brief/brief.json',
  story: 'commercials/aurora-cold-brew/storyboard/storyboard.json',
  design: 'commercials/aurora-cold-brew/design/creative-direction.v1.2.json',
}[kind]);

const mutateJson = (root, kind, mutate) => {
  const target = jsonPath(root, kind);
  const value = JSON.parse(fs.readFileSync(target, 'utf8'));
  mutate(value);
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
};

const cases = [
  ['changed copy', 'story', (x) => { x.shots[2].copy = 'CHILLED.'; }, /copy|semantics/i],
  ['missing beat', 'story', (x) => { x.shots.splice(3, 1); }, /exactly 9|missing|coverage/i],
  ['duplicate beat', 'story', (x) => { x.shots[3].id = 'S03'; }, /duplicate|ordered|semantics/i],
  ['unknown beat', 'story', (x) => { x.shots[3].id = 'S10'; }, /unknown|ordered|semantics/i],
  ['timing gap', 'story', (x) => { x.shots[4].startSec += 0.1; }, /gap|semantics/i],
  ['timing overlap', 'story', (x) => { x.shots[4].startSec -= 0.1; }, /overlap|semantics/i],
  ['wrong purpose', 'story', (x) => { x.shots[4].purpose = 'quiet hold'; }, /purpose|semantics/i],
  ['wrong primary asset', 'story', (x) => { x.shots[4].asset = 'shot-01-hero.png'; }, /asset|semantics/i],
  ['wrong cue presence', 'story', (x) => { x.shots[1].sfx = 'sub-hit'; }, /cue|sfx|semantics/i],
  ['wrong cue name', 'story', (x) => { x.shots[4].sfx = 'sub-hit'; }, /cue|sfx|semantics/i],
  ['cue order drift', 'story', (x) => { [x.shots[2], x.shots[3]] = [x.shots[3], x.shots[2]]; }, /ordered|timing|semantics/i],
  ['cue range drift', 'story', (x) => { x.shots[2].endSec += 0.1; }, /gap|overlap|timing|semantics/i],
  ['duration drift', 'brief', (x) => { x.durationSec = 41; }, /duration/i],
  ['fps drift', 'brief', (x) => { x.fps = 24; }, /format|fps/i],
  ['resolution drift', 'brief', (x) => { x.resolution = '1920x1080'; }, /format|resolution/i],
  ['unsupported claim', 'brief', (x) => { x.supportCopy.push('BOOSTS ENERGY.'); }, /support|claim|copy/i],
  ['missing treatment', 'design', (x) => { x.beatTreatments.pop(); }, /treatment|coverage/i],
  ['duplicate treatment', 'design', (x) => { x.beatTreatments[8].beatId = 'S08'; }, /duplicate|treatment/i],
  ['unknown treatment', 'design', (x) => { x.beatTreatments[8].beatId = 'S10'; }, /unknown|treatment|coverage/i],
  ['invalid family reference', 'design', (x) => { x.beatTreatments[0].sceneFamily = 'missing'; }, /family/i],
  ['duplicate family id', 'design', (x) => { x.sceneFamilies[1].id = x.sceneFamilies[0].id; }, /family/i],
  ['design governed conflict', 'design', (x) => { x.beatTreatments[1].audioIntent = 'Add an impact-hit at entry.'; }, /design.*cue|conflict/i],
  ['schema violation', 'design', (x) => { delete x.masteringIntent.pixelFormat; }, /schema/i],
];

const valid = validateAuroraCampaign({root: projectRoot});
assert.equal(valid.runtime.campaignId, 'ACB-001');
assert.equal(valid.runtime.beats.length, 9);
assert.equal(valid.review.thesis.length > 0, true);

for (const [name, kind, mutate, message] of cases) {
  const root = cloneFixture();
  try {
    mutateJson(root, kind, mutate);
    assert.throws(() => validateAuroraCampaign({root}), message, name);
  } finally {
    fs.rmSync(root, {recursive: true, force: true});
  }
}

for (const [name, alter, message] of [
  ['missing source', (root) => fs.rmSync(path.join(root, 'commercials/aurora-cold-brew/assets/shot-01-hero.png')), /missing asset/i],
  ['corrupt source', (root) => fs.appendFileSync(path.join(root, 'commercials/aurora-cold-brew/assets/shot-01-hero.png'), 'corrupt'), /SHA-256/i],
  ['asset hash drift', (root) => {
    const manifest = path.join(root, 'commercials/aurora-cold-brew/assets/ASSET_SHA256.txt');
    const content = fs.readFileSync(manifest, 'utf8');
    fs.writeFileSync(manifest, content.replace(/^[A-F0-9]{64}/, '0'.repeat(64)));
  }, /SHA-256|hash/i],
]) {
  const root = cloneFixture();
  try {
    alter(root);
    assert.throws(() => validateAuroraCampaign({root}), message, name);
  } finally {
    fs.rmSync(root, {recursive: true, force: true});
  }
}

console.log(`PASS: ${cases.length + 3} adversarial contract mutations rejected`);
