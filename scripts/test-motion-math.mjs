import assert from 'node:assert/strict';
import {
  cuePulse,
  depthOffset,
  hashUnit,
  impactEnvelope,
} from '../src/motion/math.ts';

assert.equal(hashUnit(7, 0), 0.6526747659437067, 'seed sample 7/0 must remain stable');
assert.equal(hashUnit(7, 4), 0.7326406358584391, 'seed sample 7/4 must remain stable');
assert.equal(hashUnit(99, 2), 0.49951604881778267, 'seed sample 99/2 must remain stable');

assert.equal(cuePulse(-4, 0, 3, 18), 0, 'cue is inactive before attack window');
assert.equal(cuePulse(-3, 0, 3, 18), 0, 'cue attack begins at zero');
assert.equal(cuePulse(0, 0, 3, 18), 1, 'cue peaks exactly at its governed frame');
assert.equal(cuePulse(18, 0, 3, 18), 0, 'cue is clamped after decay');
assert.equal(cuePulse(200, 0, 3, 18), 0, 'cue stays clamped far after decay');

assert.equal(impactEnvelope(0), 0, 'impact begins at rest');
assert.equal(impactEnvelope(3), 1, 'impact reaches attack peak');
assert.equal(impactEnvelope(10), -0.25, 'impact reaches controlled recoil');
assert.equal(impactEnvelope(24), 0, 'impact settles fully');
assert.equal(impactEnvelope(90), 0, 'impact remains stable after settle');

assert.equal(depthOffset(0.75, 0, 40), 0, 'disabled depth produces zero displacement');
assert.equal(depthOffset(0.75, 0.5, 40), 10, 'depth displacement is predictable');

console.log('PASS: deterministic motion math / seed / cue / impact / depth safety');
