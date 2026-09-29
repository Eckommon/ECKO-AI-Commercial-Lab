import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {runTemporalQa} from './temporal_qa_core.mjs';
import {NOVAEL_QA} from './temporal_qa_novael.mjs';

const root=fs.mkdtempSync(path.join(os.tmpdir(),'novael-qa-'));
try{
  const video=path.join(root,NOVAEL_QA.outputDirectory,NOVAEL_QA.afterFile);
  fs.mkdirSync(path.dirname(video),{recursive:true});fs.writeFileSync(video,'fixture');
  const destinations=[];
  const execute=(command,args,options={})=>{if(command==='ffprobe')return '{"streams":[],"format":{}}';const destination=args.at(-1);destinations.push(destination);fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,'evidence');return options.encoding?'':Buffer.alloc(0);};
  const capture=(command,args)=>args.some((item)=>String(item).includes('freezedetect'))
    ? 'lavfi.freezedetect.freeze_start: 17\nlavfi.freezedetect.freeze_duration: 5\nlavfi.freezedetect.freeze_end: 22\n'
    : 'metric evidence';
  const result=runTemporalQa({root,config:NOVAEL_QA,execute,capture,log:()=>{}});
  assert.equal(result.mode,'after-only');
  assert.ok(destinations.some((item)=>item.endsWith('after-hard-cut-boundaries.png')));
  assert.ok(destinations.some((item)=>item.endsWith('after-settle-holds.png')));
  assert.ok(destinations.some((item)=>item.endsWith('after-phone-readability.png')));
  const report=fs.readFileSync(path.join(result.qa,'after-frame-metrics.txt'),'utf8');
  assert.match(report,/S05.*intentional full-beat still/i);
  assert.match(report,/360x640/i);
  assert.match(report,/verified stillness[\s\S]*17\.000000s[\s\S]*5\.000000s/i);
}finally{fs.rmSync(root,{recursive:true,force:true});}
console.log('PASS: NOVAEL campaign-driven temporal QA samples and still/readability classification');
