import assert from 'node:assert/strict';
import crypto from 'node:crypto';

export function validateContract(brief, story, manifest, assets) {
  assert.equal(brief.campaignId, 'ACB-001');
  assert.equal(story.campaignId, 'ACB-001');
  assert.equal(brief.durationSec, 40);
  assert.equal(story.durationSec, 40);
  assert.equal(brief.resolution, '1080x1920');
  assert.equal(brief.fps, 30);
  assert.equal(brief.format, 'vertical');
  assert.equal(brief.product, 'AURORA Cold Brew Coffee (fictional benchmark brand)');
  assert.equal(brief.campaignLine, 'AWAKEN THE COLD.');
  assert.deepEqual(brief.supportCopy, ['COLD.', 'BOLD. SMOOTH. READY.']);
  assert.deepEqual(brief.claims, []);
  assert.equal(story.shots.length, 9);
  const ends = [3,7,11,16,21,27,32,36,40];
  const copies = ['', '', 'COLD.', '', '', 'AURORA', '', 'BOLD. SMOOTH. READY.', 'AWAKEN THE COLD.'];
  const scenes = ['reveal','detail','cold','scan','impact','hero','orbit','character','close'];
  const primary = [0,1,2,0,3,4,1,3,4];
  const names = ['shot-01-hero.png','shot-02-macro.png','shot-03-portrait.png','shot-04-impact.png','shot-05-endcard.png'];
  assert.deepEqual(Object.keys(manifest).sort(), [...names].sort());
  for (const name of names) {
    assert.ok(assets[name], `Missing asset ${name}`);
    const hash = crypto.createHash('sha256').update(assets[name]).digest('hex');
    assert.equal(hash.toUpperCase(), manifest[name], `SHA-256 mismatch ${name}`);
  }
  let cursor = 0;
  for (const [i,s] of story.shots.entries()) {
    assert.equal(s.id, `S${String(i+1).padStart(2,'0')}`);
    assert.equal(s.startSec, cursor, `Gap/overlap before ${s.id}`);
    assert.equal(s.endSec, ends[i]);
    assert.equal(s.copy, copies[i]);
    assert.equal(s.scene, scenes[i]);
    assert.equal(s.asset, names[primary[i]]);
    assert.ok(['shutter','iris','cut','dissolve'].includes(s.transition));
    if (s.secondaryAsset) assert.ok(names.includes(s.secondaryAsset));
    const n = (s.endSec-s.startSec)*30;
    assert.equal(s.camera[0][0],0);
    assert.equal(s.camera.at(-1)[0],n-1);
    let last = -1;
    for (const k of s.camera) {
      assert.equal(k.length,5);
      assert.ok(k.every(Number.isFinite));
      assert.ok(Number.isInteger(k[0]) && k[0]>last && k[0]<n);
      assert.ok(k[1]>0);
      last=k[0];
    }
    for (const key of ['cues','typeFrames','scanFrames','impactSwitchFrames']) {
      let previous=-1;
      for (const f of s[key] ?? []) {
        assert.ok(Number.isInteger(f) && f>=0 && f<n && f>previous, `${s.id} invalid ${key}`);
        previous=f;
      }
    }
    assert.ok(s.cues?.length);
    if (s.copy) assert.ok(s.typeFrames?.length);
    if (s.scene==='scan') assert.equal(s.scanFrames?.length,2);
    if (s.scene==='impact') {
      assert.equal(s.secondaryAsset,'shot-02-macro.png');
      assert.equal(s.impactSwitchFrames?.length,2);
      assert.ok(Number.isInteger(s.burstFrames) && s.burstFrames>0 && s.burstFrames<n);
    }
    assert.ok(Number.isInteger(s.revealFrames) && s.revealFrames>=0 && s.revealFrames<n);
    assert.ok(Number.isInteger(s.exitFrames) && s.exitFrames>0 && s.exitFrames<n);
    cursor=s.endSec;
  }
  assert.deepEqual([...new Set(story.shots.map(s=>s.asset))].sort(),[...names].sort());
  return {campaign:'ACB-001',shots:9,frames:1200,duration:40,hashes:5};
}
