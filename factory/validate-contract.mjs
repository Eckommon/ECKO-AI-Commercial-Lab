import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';

const EXPECTED = [
  ['S01', 0, 3, 'cold open and curiosity', 'shot-01-hero.png', '', 'sub-hit'],
  ['S02', 3, 7, 'premium tactile detail', 'shot-02-macro.png', '', undefined],
  ['S03', 7, 11, 'name the sensation', 'shot-03-portrait.png', 'COLD.', 'sub-hit'],
  ['S04', 11, 16, 'establish aurora signature', 'shot-01-hero.png', '', 'sub-hit'],
  ['S05', 16, 21, 'energy peak', 'shot-04-impact.png', '', 'impact-hit'],
  ['S06', 21, 27, 'hero product recognition', 'shot-05-endcard.png', 'AURORA', 'sub-hit'],
  ['S07', 27, 32, 'premium breathing room', 'shot-02-macro.png', '', 'sub-hit'],
  ['S08', 32, 36, 'product character', 'shot-04-impact.png', 'BOLD. SMOOTH. READY.', 'sub-hit'],
  ['S09', 36, 40, 'brand memory and close', 'shot-05-endcard.png', 'AWAKEN THE COLD.', 'sub-hit'],
];

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

export const validateAuroraCampaign = ({root = process.cwd()} = {}) => {
  const campaign = path.join(root, 'commercials/aurora-cold-brew');
  const brief = readJson(path.join(campaign, 'brief/brief.json'));
  const story = readJson(path.join(campaign, 'storyboard/storyboard.json'));
  const design = readJson(path.join(campaign, 'design/creative-direction.v1.2.json'));
  const schema = readJson(path.join(root, 'factory/creative_direction.schema.json'));
  const validateSchema = new Ajv2020({allErrors: true, strict: true}).compile(schema);
  if (!validateSchema(design)) {
    throw new Error(`Creative direction schema invalid: ${validateSchema.errors.map((e) => `${e.instancePath} ${e.message}`).join('; ')}`);
  }

  if (brief.campaignId !== 'ACB-001' || story.campaignId !== brief.campaignId || design.campaignId !== brief.campaignId) {
    throw new Error('Campaign identity mismatch');
  }
  if (brief.durationSec !== 40 || story.durationSec !== 40) throw new Error('Campaign duration contract mismatch');
  if (brief.fps !== 30 || brief.resolution !== '1080x1920') throw new Error('Format fps/resolution contract mismatch');
  if (brief.campaignLine !== 'AWAKEN THE COLD.' || JSON.stringify(brief.supportCopy) !== JSON.stringify(['COLD.', 'BOLD. SMOOTH. READY.'])) {
    throw new Error('Supporting copy and campaign line contract mismatch');
  }
  if (!Array.isArray(brief.claims) || brief.claims.length !== 0) throw new Error('Unsupported claim in approved brief');
  if (story.shots.length !== EXPECTED.length) throw new Error('Storyboard must contain exactly 9 beats');

  let cursor = 0;
  const seen = new Set();
  for (const [index, shot] of story.shots.entries()) {
    const expected = EXPECTED[index];
    if (seen.has(shot.id)) throw new Error(`Duplicate storyboard beat ${shot.id}`);
    seen.add(shot.id);
    if (!EXPECTED.some(([id]) => id === shot.id)) throw new Error(`Unknown storyboard beat ${shot.id}`);
    if (shot.startSec < cursor) throw new Error(`Timing overlap before ${shot.id}`);
    if (shot.startSec > cursor) throw new Error(`Timing gap before ${shot.id}`);
    if (shot.endSec <= shot.startSec) throw new Error(`Invalid timing range ${shot.id}`);
    const actual = [shot.id, shot.startSec, shot.endSec, shot.purpose, shot.asset, shot.copy, shot.sfx];
    if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Governed storyboard semantics changed at ${expected[0]}`);
    cursor = shot.endSec;
  }
  if (cursor !== 40) throw new Error('Storyboard duration mismatch');

  const families = new Set();
  for (const family of design.sceneFamilies) {
    if (families.has(family.id)) throw new Error(`Duplicate scene-family ID ${family.id}`);
    families.add(family.id);
  }
  const treatments = new Map();
  for (const treatment of design.beatTreatments) {
    if (treatments.has(treatment.beatId)) throw new Error(`Duplicate creative treatment ${treatment.beatId}`);
    if (!seen.has(treatment.beatId)) throw new Error(`Unknown creative treatment ${treatment.beatId}`);
    if (!families.has(treatment.sceneFamily)) throw new Error(`Invalid scene-family reference ${treatment.sceneFamily}`);
    if (treatment.sourceTreatment.allowMask !== false) throw new Error(`AURORA mask conflict at ${treatment.beatId}`);
    const shot = story.shots.find((candidate) => candidate.id === treatment.beatId);
    const audio = treatment.audioIntent.toLowerCase();
    if (!shot.sfx && /(?:add|use|retain).*\b(?:sub-hit|impact-hit)\b/i.test(audio)) {
      throw new Error(`Design cue conflict at ${shot.id}`);
    }
    if (shot.sfx === 'impact-hit' && !audio.includes('impact-hit')) throw new Error(`Design cue conflict at ${shot.id}`);
    if (shot.sfx === 'sub-hit' && !audio.includes('sub-hit')) throw new Error(`Design cue conflict at ${shot.id}`);
    treatments.set(treatment.beatId, treatment);
  }
  if (treatments.size !== EXPECTED.length || story.shots.some((shot) => !treatments.has(shot.id))) {
    throw new Error('Creative treatment coverage must be exactly one per governed beat');
  }

  const manifestPath = path.join(campaign, 'assets/ASSET_SHA256.txt');
  const manifest = fs.readFileSync(manifestPath, 'utf8').trim().split(/\r?\n/).map((line) => {
    const match = /^([A-Fa-f0-9]{64})\s+(.+)$/.exec(line);
    if (!match) throw new Error(`Invalid asset manifest line: ${line}`);
    return {hash: match[1].toUpperCase(), name: match[2]};
  });
  const expectedAssets = [...new Set(EXPECTED.map((row) => row[4]))].sort();
  if (manifest.length !== expectedAssets.length || JSON.stringify(manifest.map((x) => x.name).sort()) !== JSON.stringify(expectedAssets)) {
    throw new Error('Asset manifest must contain exactly the five canonical sources');
  }
  for (const {hash, name} of manifest) {
    const source = path.join(campaign, 'assets', name);
    if (!fs.existsSync(source)) throw new Error(`Missing asset ${name}`);
    const actual = crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex').toUpperCase();
    if (actual !== hash) throw new Error(`Asset SHA-256 mismatch ${name}`);
  }
  if (!fs.existsSync(path.join(root, 'src/commercials/aurora/timeline.ts'))) throw new Error('Missing shared runtime timeline');

  return {
    runtime: {
      campaignId: brief.campaignId,
      durationSec: brief.durationSec,
      fps: brief.fps,
      resolution: brief.resolution,
      beats: story.shots.map((shot) => ({...shot, treatment: treatments.get(shot.id)})),
      sceneFamilies: design.sceneFamilies,
      typographyDirection: design.typographyDirection,
      audioDirection: design.audioDirection,
      masteringIntent: design.masteringIntent,
      riskFallbacks: design.riskFallbacks,
    },
    review: {thesis: design.thesis, productPriority: design.productPriority, visualHierarchy: design.visualHierarchy},
  };
};
