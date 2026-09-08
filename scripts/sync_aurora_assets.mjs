import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const src = path.join(root, 'commercials/aurora-cold-brew/assets');
const dst = path.join(root, 'public/commercials/aurora-cold-brew/assets');
fs.mkdirSync(dst, {recursive: true});

for (const file of fs.readdirSync(src)) {
  if (file.endsWith('.png')) {
    fs.copyFileSync(path.join(src, file), path.join(dst, file));
  }
}

const audioSrc = path.join(root, 'commercials/aurora-cold-brew/audio/aurora-bed.wav');
const audioDst = path.join(root, 'public/commercials/aurora-cold-brew/audio/aurora-bed.wav');
fs.mkdirSync(path.dirname(audioDst), {recursive: true});

if (fs.existsSync(audioSrc)) {
  fs.copyFileSync(audioSrc, audioDst);
}

console.log('PASS: public assets synchronized');
