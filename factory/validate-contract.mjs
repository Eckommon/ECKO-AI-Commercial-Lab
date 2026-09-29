import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

const validateManifest = ({root, campaign}) => {
  const manifest = fs.readFileSync(path.join(root, campaign.assetsManifest), 'utf8').trim().split(/\r?\n/).map((line) => {
    const match = /^([A-Fa-f0-9]{64})\s+(.+)$/.exec(line);
    if (!match) throw new Error(`Invalid asset manifest line: ${line}`);
    return {hash: match[1].toUpperCase(), name: match[2]};
  });
  const expectedAssets = [...new Set(campaign.expectedBeats.map((row) => row[4]))].sort();
  if (manifest.length !== expectedAssets.length || JSON.stringify(manifest.map((x) => x.name).sort()) !== JSON.stringify(expectedAssets)) throw new Error(`Asset manifest must contain exactly the ${expectedAssets.length} canonical sources`);
  for (const {hash, name} of manifest) {
    const source = path.join(root, campaign.assetsDirectory, name);
    if (!fs.existsSync(source)) throw new Error(`Missing asset ${name}`);
    const actual = crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex').toUpperCase();
    if (actual !== hash) throw new Error(`Asset SHA-256 mismatch ${name}`);
  }
};

export const validateCampaign = ({root=process.cwd(), campaign}) => {
  const brief = readJson(path.join(root, campaign.brief));
  const story = readJson(path.join(root, campaign.storyboard));
  const designBytes = fs.readFileSync(path.join(root, campaign.creativeDirection));
  const design = JSON.parse(designBytes.toString('utf8'));
  const binding = readJson(path.join(root, campaign.implementationLock));
  const schema = readJson(path.join(root, 'factory/creative_direction.schema.json'));
  const validateSchema = new Ajv2020({allErrors:true, strict:true}).compile(schema);
  if (!validateSchema(design)) throw new Error(`Creative direction schema invalid: ${validateSchema.errors.map((e)=>`${e.instancePath} ${e.message}`).join('; ')}`);
  if (brief.campaignId!==campaign.campaignId || story.campaignId!==brief.campaignId || design.campaignId!==brief.campaignId) throw new Error('Campaign identity mismatch');
  if (brief.durationSec!==campaign.durationSec || story.durationSec!==campaign.durationSec) throw new Error('Campaign duration contract mismatch');
  if (brief.fps!==campaign.fps) throw new Error('Format fps contract mismatch');
  if (brief.resolution!==campaign.resolution) throw new Error('Format resolution contract mismatch');
  if (brief.campaignLine!==campaign.campaignLine || JSON.stringify(brief.supportCopy)!==JSON.stringify(campaign.supportCopy)) throw new Error('Supporting copy and campaign line contract mismatch');
  if (!Array.isArray(brief.claims) || JSON.stringify(brief.claims)!==JSON.stringify(campaign.expectedClaims)) throw new Error('Approved claims policy mismatch');
  if (story.shots.length!==campaign.expectedBeats.length) throw new Error(`Storyboard must contain exactly ${campaign.expectedBeats.length} beats`);
  let cursor=0;
  const seen=new Set();
  for (const [index,shot] of story.shots.entries()) {
    const expected=campaign.expectedBeats[index];
    if (seen.has(shot.id)) throw new Error(`Duplicate storyboard beat ${shot.id}`);
    seen.add(shot.id);
    if (!campaign.expectedBeats.some(([id])=>id===shot.id)) throw new Error(`Unknown storyboard beat ${shot.id}`);
    if (shot.startSec<cursor) throw new Error(`Timing overlap before ${shot.id}`);
    if (shot.startSec>cursor) throw new Error(`Timing gap before ${shot.id}`);
    if (shot.endSec<=shot.startSec) throw new Error(`Invalid timing range ${shot.id}`);
    const actual=[shot.id,shot.startSec,shot.endSec,shot.purpose,shot.asset,shot.copy,shot.sfx];
    if (JSON.stringify(actual)!==JSON.stringify(expected)) throw new Error(`Governed storyboard semantics changed at ${expected[0]}`);
    cursor=shot.endSec;
  }
  if (cursor!==campaign.durationSec) throw new Error('Storyboard duration mismatch');
  const families=new Set();
  for (const family of design.sceneFamilies) { if (families.has(family.id)) throw new Error(`Duplicate scene-family ID ${family.id}`); families.add(family.id); }
  const treatments=new Map();
  for (const treatment of design.beatTreatments) {
    if (treatments.has(treatment.beatId)) throw new Error(`Duplicate creative treatment ${treatment.beatId}`);
    if (!seen.has(treatment.beatId)) throw new Error(`Unknown creative treatment ${treatment.beatId}`);
    if (!families.has(treatment.sceneFamily)) throw new Error(`Invalid scene-family reference ${treatment.sceneFamily}`);
    campaign.validateTreatment?.({treatment,shot:story.shots.find((candidate)=>candidate.id===treatment.beatId)});
    treatments.set(treatment.beatId,treatment);
  }
  if (treatments.size!==campaign.expectedBeats.length || story.shots.some((shot)=>!treatments.has(shot.id))) throw new Error('Creative treatment coverage must be exactly one per governed beat');
  const designSha256=crypto.createHash('sha256').update(designBytes).digest('hex').toUpperCase();
  if (binding.schemaVersion!==1 || binding.campaignId!==brief.campaignId || binding.creativeDirection!==campaign.creativeDirection || binding.implementationRecipe!==campaign.implementationRecipe || binding.creativeDirectionSha256!==designSha256) throw new Error('Creative-direction SHA-256 does not match the reviewed implementation binding');
  if (!fs.existsSync(path.join(root,campaign.implementationRecipe))) throw new Error(`Missing bound ${campaign.campaignId} implementation recipe`);
  for (const runtimePath of campaign.requiredRuntimePaths??[]) if (!fs.existsSync(path.join(root,runtimePath))) throw new Error(`Missing campaign runtime ${runtimePath}`);
  validateManifest({root,campaign});
  return {runtime:{campaignId:brief.campaignId,durationSec:brief.durationSec,fps:brief.fps,resolution:brief.resolution,beats:story.shots.map((shot)=>({...shot,treatment:treatments.get(shot.id)})),sceneFamilies:design.sceneFamilies,typographyDirection:design.typographyDirection,audioDirection:design.audioDirection,masteringIntent:design.masteringIntent,riskFallbacks:design.riskFallbacks},review:{thesis:design.thesis,productPriority:design.productPriority,visualHierarchy:design.visualHierarchy},implementationBinding:binding};
};
