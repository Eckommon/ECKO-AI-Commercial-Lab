import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const root = process.cwd();
const brief = JSON.parse(
  fs.readFileSync(
    path.join(root, 'commercials/aurora-cold-brew/brief/brief.json'),
    'utf8',
  ),
);
const story = JSON.parse(
  fs.readFileSync(
    path.join(root, 'commercials/aurora-cold-brew/storyboard/storyboard.json'),
    'utf8',
  ),
);

const expected = [
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

if (brief.campaignId !== 'ACB-001' || story.campaignId !== brief.campaignId) {
  throw new Error('Campaign identity mismatch');
}
if (brief.durationSec !== 40 || story.durationSec !== brief.durationSec) {
  throw new Error('Campaign duration contract mismatch');
}
if (brief.resolution !== '1080x1920' || brief.fps !== 30) {
  throw new Error('Format contract mismatch');
}
if (brief.campaignLine !== 'AWAKEN THE COLD.') {
  throw new Error('Campaign line contract mismatch');
}
if (JSON.stringify(brief.supportCopy) !== JSON.stringify(['COLD.', 'BOLD. SMOOTH. READY.'])) {
  throw new Error('Supporting copy contract mismatch');
}
if (story.shots.length !== expected.length) throw new Error('Storyboard must contain exactly 9 beats');

const checksumLines = fs
  .readFileSync(path.join(root, 'commercials/aurora-cold-brew/assets/ASSET_SHA256.txt'), 'utf8')
  .trim()
  .split(/\r?\n/);
const approvedHashes = new Map(
  checksumLines.map((line) => {
    const match = line.match(/^([A-Fa-f0-9]{64})\s+(.+)$/);
    if (!match) throw new Error(`Invalid checksum manifest line: ${line}`);
    return [match[2], match[1].toUpperCase()];
  }),
);

if (story.shots[0].startSec !== 0) throw new Error('Storyboard must start at 0');

let cursor = 0;
for (const [index, shot] of story.shots.entries()) {
  const [id, startSec, endSec, purpose, assetName, copy, sfx] = expected[index];
  if (
    shot.id !== id ||
    shot.startSec !== startSec ||
    shot.endSec !== endSec ||
    shot.purpose !== purpose ||
    shot.asset !== assetName ||
    shot.copy !== copy ||
    shot.sfx !== sfx
  ) {
    throw new Error(`Governed storyboard semantics changed at ${id}`);
  }
  if (shot.startSec !== cursor) throw new Error(`Gap/overlap before ${shot.id}`);
  if (shot.endSec <= shot.startSec) throw new Error(`Invalid duration ${shot.id}`);

  const asset = path.join(root, 'commercials/aurora-cold-brew/assets', shot.asset);
  if (!fs.existsSync(asset)) throw new Error(`Missing asset ${shot.asset}`);
  const digest = crypto.createHash('sha256').update(fs.readFileSync(asset)).digest('hex').toUpperCase();
  if (approvedHashes.get(shot.asset) !== digest) throw new Error(`Asset SHA-256 mismatch ${shot.asset}`);

  cursor = shot.endSec;
}

if (cursor !== story.durationSec) throw new Error('Storyboard duration mismatch');

const runtimeTimeline = path.join(root, 'src/commercials/aurora/timeline.ts');
if (!fs.existsSync(runtimeTimeline)) throw new Error('Missing shared runtime timeline');

console.log(
  `PASS: ${story.campaignId} / ${story.shots.length} governed beats and cue mapping / ${story.durationSec}s / ${brief.resolution} / ${brief.fps}fps / asset SHA-256 verified`,
);
