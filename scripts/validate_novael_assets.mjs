import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ASSET_DIR = path.join(ROOT, 'commercials', 'novael-arc', 'assets');
const MANIFEST = path.join(ASSET_DIR, 'ASSET_SHA256.txt');

const REQUIRED = [
  'shot-01-hero.png',
  'shot-02-detail.png',
  'shot-03-profile.png',
  'shot-04-lit.png',
  'shot-05-endcard.png',
];

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex').toUpperCase();

const parsePngDimensions = (bytes, file) => {
  if (bytes.length < 24 || !bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error(`${file}: not a decodable PNG signature`);
  }
  const chunkType = bytes.subarray(12, 16).toString('ascii');
  if (chunkType !== 'IHDR') throw new Error(`${file}: missing PNG IHDR`);
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (!width || !height) throw new Error(`${file}: invalid PNG dimensions`);
  return {width, height};
};

if (!fs.existsSync(ASSET_DIR)) throw new Error(`Missing NOVAEL asset directory: ${ASSET_DIR}`);

const canonicalPngs = fs.readdirSync(ASSET_DIR)
  .filter((name) => /^shot-.*\.png$/i.test(name))
  .sort();

if (JSON.stringify(canonicalPngs) !== JSON.stringify([...REQUIRED].sort())) {
  throw new Error(`Canonical NOVAEL PNG set mismatch. Expected exactly: ${REQUIRED.join(', ')}`);
}

if (!fs.existsSync(MANIFEST)) throw new Error('Missing commercials/novael-arc/assets/ASSET_SHA256.txt');

const manifestLines = fs.readFileSync(MANIFEST, 'utf8').trim().split(/\r?\n/).filter(Boolean);
if (manifestLines.length !== REQUIRED.length) {
  throw new Error(`NOVAEL asset manifest must contain exactly ${REQUIRED.length} entries`);
}

const manifest = new Map();
for (const line of manifestLines) {
  const match = /^([A-F0-9]{64})\s+(.+)$/.exec(line);
  if (!match) throw new Error(`Invalid manifest line; require uppercase SHA-256 + filename: ${line}`);
  const [, hash, name] = match;
  if (!REQUIRED.includes(name)) throw new Error(`Unexpected manifest filename: ${name}`);
  if (manifest.has(name)) throw new Error(`Duplicate manifest filename: ${name}`);
  manifest.set(name, hash);
}

const auroraHashes = new Set();
const auroraManifest = path.join(ROOT, 'commercials', 'aurora-cold-brew', 'assets', 'ASSET_SHA256.txt');
if (fs.existsSync(auroraManifest)) {
  for (const line of fs.readFileSync(auroraManifest, 'utf8').trim().split(/\r?\n/)) {
    const match = /^([A-Fa-f0-9]{64})\s+/.exec(line);
    if (match) auroraHashes.add(match[1].toUpperCase());
  }
}

const report = [];
for (const name of REQUIRED) {
  const file = path.join(ASSET_DIR, name);
  if (!fs.existsSync(file)) throw new Error(`Missing canonical NOVAEL asset: ${name}`);
  const bytes = fs.readFileSync(file);
  const {width, height} = parsePngDimensions(bytes, name);
  if (width < 1080 || height < 1920) {
    throw new Error(`${name}: insufficient source dimensions ${width}x${height}; require at least 1080x1920`);
  }
  const actual = sha256(bytes);
  const expected = manifest.get(name);
  if (!expected) throw new Error(`Missing manifest entry for ${name}`);
  if (actual !== expected) throw new Error(`${name}: SHA-256 mismatch`);
  if (auroraHashes.has(actual)) throw new Error(`${name}: asset bytes/hash reuse an AURORA canonical source`);
  report.push({name, width, height, sha256: actual});
}

console.log('PASS: NOVAEL canonical asset machine gate');
for (const item of report) {
  console.log(`${item.name} ${item.width}x${item.height} ${item.sha256}`);
}
console.log('NOTE: machine PASS does not replace side-by-side visual identity review.');
