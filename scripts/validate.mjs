import fs from 'node:fs';
import assert from 'node:assert/strict';
import {validateContract} from './astra_contract.mjs';
const root='commercials/aurora-cold-brew/';
const brief=JSON.parse(fs.readFileSync(root+'brief/brief.json'));
const story=JSON.parse(fs.readFileSync(root+'storyboard/storyboard.json'));
const manifest=Object.fromEntries(fs.readFileSync(root+'assets/ASSET_SHA256.txt','utf8').trim().split(/\r?\n/).map(line=>{const [h,n]=line.trim().split(/\s+/);return [n,h];}));
const assets=Object.fromEntries(Object.keys(manifest).map(n=>[n,fs.readFileSync(root+'assets/'+n)]));
console.log('PASS:',validateContract(brief,story,manifest,assets));
if(process.argv.includes('--prepared')){
 for(const [name,bytes] of Object.entries(assets)) assert.ok(bytes.equals(fs.readFileSync('public/'+root+'assets/'+name)), 'Stale public asset '+name);
 const wav=fs.readFileSync(root+'audio/astra-score.wav');
 assert.equal(wav.toString('ascii',0,4),'RIFF');
 assert.equal(wav.readUInt16LE(22),2);
 assert.equal(wav.readUInt32LE(24),48000);
 assert.equal(wav.readUInt32LE(40),1920000*4);
 assert.ok(wav.equals(fs.readFileSync('public/'+root+'audio/astra-score.wav')),'Stale public score');
 console.log('PASS: prepared asset bytes and exact 40s stereo PCM');
}
