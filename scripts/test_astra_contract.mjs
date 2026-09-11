import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateContract} from './astra_contract.mjs';
const root='commercials/aurora-cold-brew/';
const brief=JSON.parse(fs.readFileSync(root+'brief/brief.json'));
const story=JSON.parse(fs.readFileSync(root+'storyboard/storyboard.json'));
const manifest=Object.fromEntries(fs.readFileSync(root+'assets/ASSET_SHA256.txt','utf8').trim().split(/\r?\n/).map(line=>{const [h,n]=line.trim().split(/\s+/);return [n,h];}));
const assets=Object.fromEntries(Object.keys(manifest).map(n=>[n,fs.readFileSync(root+'assets/'+n)]));
test('canonical campaign passes',()=>assert.equal(validateContract(brief,story,manifest,assets).frames,1200));
for (const [name, mutate] of [
  ['gap',s=>s.shots[2].startSec+=1/30],
  ['overlap',s=>s.shots[2].startSec-=1/30],
  ['changed copy',s=>s.shots[2].copy='FAST.'],
  ['missing beat',s=>s.shots.pop()],
  ['fractional cue',s=>s.shots[0].cues=[1.5]],
  ['out of range cue',s=>s.shots[0].cues=[90]],
  ['unsorted camera',s=>s.shots[0].camera[1][0]=0],
  ['unknown scene',s=>s.shots[0].scene='missing'],
  ['wrong semantic scene',s=>s.shots[0].scene='hero'],
  ['changed primary asset',s=>s.shots[0].asset='shot-05-endcard.png'],
  ['missing type cues',s=>delete s.shots[2].typeFrames],
  ['reversed impact switch',s=>s.shots[4].impactSwitchFrames=[48,24]],
  ['missing impact layer',s=>delete s.shots[4].secondaryAsset],
  ['missing scan interval',s=>delete s.shots[3].scanFrames],
]) test(`reject ${name}`,()=>{const s=structuredClone(story);mutate(s);assert.throws(()=>validateContract(brief,s,manifest,assets));});
test('reject missing source',()=>{const a={...assets};delete a['shot-01-hero.png'];assert.throws(()=>validateContract(brief,story,manifest,a));});
test('reject corrupt source',()=>{const a={...assets,'shot-01-hero.png':Buffer.from('changed')};assert.throws(()=>validateContract(brief,story,manifest,a));});
for (const [key,value] of [['fps',24],['durationSec',39],['resolution','1920x1080'],['claims',['More energy']]]) test(`reject changed ${key}`,()=>assert.throws(()=>validateContract({...brief,[key]:value},story,manifest,assets)));
