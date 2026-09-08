import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const story = JSON.parse(
  fs.readFileSync(
    path.join(root, 'commercials/aurora-cold-brew/storyboard/storyboard.json'),
    'utf8',
  ),
);

if (story.shots[0].startSec !== 0) throw new Error('Storyboard must start at 0');

let cursor = 0;
for (const shot of story.shots) {
  if (shot.startSec !== cursor) throw new Error(`Gap/overlap before ${shot.id}`);
  if (shot.endSec <= shot.startSec) throw new Error(`Invalid duration ${shot.id}`);

  const asset = path.join(root, 'commercials/aurora-cold-brew/assets', shot.asset);
  if (!fs.existsSync(asset)) throw new Error(`Missing asset ${shot.asset}`);

  cursor = shot.endSec;
}

if (cursor !== story.durationSec) throw new Error('Storyboard duration mismatch');

console.log(`PASS: ${story.campaignId} / ${story.shots.length} shots / ${story.durationSec}s`);
