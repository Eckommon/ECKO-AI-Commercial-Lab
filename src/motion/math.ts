export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export const hashUnit = (seed: number, index: number) => {
  let value = (seed ^ Math.imul(index + 1, 0x9e3779b9)) >>> 0;
  value = (value ^ (value >>> 16)) >>> 0;
  value = Math.imul(value, 0x7feb352d) >>> 0;
  value = (value ^ (value >>> 15)) >>> 0;
  value = Math.imul(value, 0x846ca68b) >>> 0;
  value = (value ^ (value >>> 16)) >>> 0;
  return value / 4294967295;
};

export const cuePulse = (
  frame: number,
  cueFrame: number,
  attackFrames = 3,
  decayFrames = 18,
) => {
  const distance = frame - cueFrame;
  if (distance <= -attackFrames || distance >= decayFrames) return 0;
  if (distance < 0) return clamp01((distance + attackFrames) / attackFrames);
  return clamp01(1 - distance / decayFrames);
};

export const impactEnvelope = (frame: number) => {
  if (frame <= 0 || frame >= 24) return 0;
  if (frame <= 3) return frame / 3;
  if (frame <= 10) return 1 - ((frame - 3) / 7) * 1.25;
  return -0.25 * (1 - (frame - 10) / 14);
};

export const depthOffset = (progress: number, amount: number, travel: number) => {
  if (amount <= 0) return 0;
  return (clamp01(progress) * 2 - 1) * amount * travel;
};

export const smoothstep = (value: number) => {
  const clamped = clamp01(value);
  return clamped * clamped * (3 - 2 * clamped);
};
