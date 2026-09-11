import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {deriveAuroraContract} from '../src/commercials/aurora/contract.ts';
import {runTemporalQa} from './temporal_qa.mjs';

const governedBrief = {
  campaignId: 'ACB-001',
  durationSec: 40,
  fps: 30,
  resolution: '1080x1920',
};

assert.deepEqual(deriveAuroraContract(governedBrief), {
  campaignId: 'ACB-001',
  durationSec: 40,
  fps: 30,
  width: 1080,
  height: 1920,
});
assert.throws(
  () => deriveAuroraContract({...governedBrief, resolution: '1080-by-1920'}),
  /Invalid governed resolution/,
);
assert.throws(
  () => deriveAuroraContract({...governedBrief, resolution: '0x1920'}),
  /positive dimensions/,
);
assert.throws(
  () => deriveAuroraContract({...governedBrief, resolution: `${'9'.repeat(400)}x1920`}),
  /positive dimensions/,
);

const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-temporal-qa-'));

try {
  const output = path.join(fixtureRoot, 'commercials/aurora-cold-brew/output');
  fs.mkdirSync(output, {recursive: true});
  const after = path.join(output, 'aurora-cold-brew-v1-1.mp4');
  fs.writeFileSync(after, 'after');

  const messages = [];
  const executedInputs = [];
  const execute = (command, args, options = {}) => {
    const inputIndex = args.indexOf('-i');
    if (inputIndex !== -1) executedInputs.push(args[inputIndex + 1]);
    if (command === 'ffprobe') return '{"streams":[],"format":{}}';
    const destination = args.at(-1);
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.writeFileSync(destination, 'evidence');
    return options.encoding ? '' : Buffer.alloc(0);
  };

  const afterOnly = runTemporalQa({root: fixtureRoot, execute, log: (message) => messages.push(message)});
  assert.equal(afterOnly.mode, 'after-only');
  assert.ok(messages.some((message) => message.includes('baseline comparison skipped')));
  assert.ok(executedInputs.every((input) => input === after));
  assert.ok(fs.existsSync(path.join(output, 'qa/after-only/after-full-1fps.png')));

  executedInputs.length = 0;
  fs.writeFileSync(path.join(output, 'aurora-cold-brew-v1.mp4'), 'before');
  const comparison = runTemporalQa({root: fixtureRoot, execute, log: () => {}});
  assert.equal(comparison.mode, 'before-after');
  assert.ok(executedInputs.some((input) => input.endsWith('aurora-cold-brew-v1.mp4')));
  assert.ok(executedInputs.some((input) => input.endsWith('aurora-cold-brew-v1-1.mp4')));
  assert.ok(fs.existsSync(path.join(output, 'qa/before-after/before-full-1fps.png')));
  assert.ok(fs.existsSync(path.join(output, 'qa/before-after/after-full-1fps.png')));

  fs.rmSync(after);
  assert.throws(
    () => runTemporalQa({root: fixtureRoot, execute, log: () => {}}),
    /Missing required v1\.1 QA input.*npm run render:aurora/,
  );
} finally {
  fs.rmSync(fixtureRoot, {recursive: true, force: true});
}

console.log('PASS: governed runtime contract and temporal QA reproducibility');

const validatorFixture = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-validator-'));

try {
  const projectRoot = process.cwd();
  for (const relativePath of [
    'commercials/aurora-cold-brew/brief/brief.json',
    'commercials/aurora-cold-brew/storyboard/storyboard.json',
    'commercials/aurora-cold-brew/assets',
    'src/commercials/aurora/timeline.ts',
  ]) {
    const source = path.join(projectRoot, relativePath);
    const destination = path.join(validatorFixture, relativePath);
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.cpSync(source, destination, {recursive: true});
  }

  const storyboardPath = path.join(
    validatorFixture,
    'commercials/aurora-cold-brew/storyboard/storyboard.json',
  );
  const storyboard = JSON.parse(fs.readFileSync(storyboardPath, 'utf8'));
  storyboard.shots[2].sfx = 'impact-hit';
  fs.writeFileSync(storyboardPath, `${JSON.stringify(storyboard, null, 2)}\n`);

  const result = spawnSync(process.execPath, [path.join(projectRoot, 'scripts/validate.mjs')], {
    cwd: validatorFixture,
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0, 'validator must reject a reassigned storyboard cue');
  assert.match(`${result.stdout}${result.stderr}`, /Governed storyboard semantics changed at S03/);
} finally {
  fs.rmSync(validatorFixture, {recursive: true, force: true});
}

console.log('PASS: governed storyboard cue mapping rejects reassignment');
