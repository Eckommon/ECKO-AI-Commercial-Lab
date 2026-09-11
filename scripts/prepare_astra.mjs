import fs from 'node:fs';
import path from 'node:path';
const root='commercials/aurora-cold-brew/';
const files=['assets/shot-01-hero.png','assets/shot-02-macro.png','assets/shot-03-portrait.png','assets/shot-04-impact.png','assets/shot-05-endcard.png','audio/astra-score.wav'];
for(const name of files){
  const src=root+name,dst='public/'+src;
  if(!fs.existsSync(src))throw new Error(`Missing prepared input ${src}`);
  fs.mkdirSync(path.dirname(dst),{recursive:true});
  fs.copyFileSync(src,dst);
}
console.log('PASS: five canonical sources and Astra stereo score synchronized');
