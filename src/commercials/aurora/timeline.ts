import storyboard from '../../../commercials/aurora-cold-brew/storyboard/storyboard.json';

export const AURORA_CONTRACT = {
  campaignId: 'ACB-001',
  durationSec: 40,
  fps: 30,
  width: 1080,
  height: 1920,
} as const;

export const sec = (seconds: number) => Math.round(seconds * AURORA_CONTRACT.fps);

export type BeatId = 'S01' | 'S02' | 'S03' | 'S04' | 'S05' | 'S06' | 'S07' | 'S08' | 'S09';
export type TransitionKind = 'mist' | 'aurora' | 'flash';

export type CameraRecipe = {
  scale: readonly [number, number];
  x: readonly [number, number];
  y: readonly [number, number];
  rotate?: readonly [number, number];
  settleAt?: number;
};

export type DepthRecipe = {
  amount: number;
  focusX: number;
  focusY: number;
  radius: number;
  foreground?: boolean;
};

export type AtmosphereRecipe = {
  mist: number;
  droplets: number;
  sparkle: number;
  direction?: -1 | 1;
};

export type LightRecipe = {
  intensity: number;
  sweep?: boolean;
  beamAngle?: number;
};

export type TypographyRecipe = {
  mode: 'word' | 'characters';
  align: 'center' | 'bottom';
  size: number;
  bottomOffset?: number;
  holdToEnd?: boolean;
};

export type BeatRecipe = {
  id: BeatId;
  startSec: number;
  endSec: number;
  startFrame: number;
  durationFrames: number;
  purpose: string;
  asset: string;
  copy: string;
  sfx?: string;
  camera: CameraRecipe;
  depth: DepthRecipe;
  atmosphere: AtmosphereRecipe;
  light: LightRecipe;
  typography?: TypographyRecipe;
  impact?: boolean;
};

type MotionRecipe = Pick<
  BeatRecipe,
  'camera' | 'depth' | 'atmosphere' | 'light' | 'typography' | 'impact'
>;

const recipes: Record<BeatId, MotionRecipe> = {
  S01: {
    camera: {scale: [1.12, 1.035], x: [-8, 3], y: [18, -5]},
    depth: {amount: 0.32, focusX: 50, focusY: 48, radius: 29, foreground: true},
    atmosphere: {mist: 0.78, droplets: 0.28, sparkle: 0.16, direction: 1},
    light: {intensity: 0.58, beamAngle: -7},
  },
  S02: {
    camera: {scale: [1.075, 1.16], x: [18, -24], y: [12, -18]},
    depth: {amount: 0.42, focusX: 50, focusY: 46, radius: 31, foreground: true},
    atmosphere: {mist: 0.28, droplets: 0.72, sparkle: 0.42, direction: -1},
    light: {intensity: 0.48, sweep: true, beamAngle: 8},
  },
  S03: {
    camera: {scale: [1.075, 1.035], x: [8, -5], y: [30, -18]},
    depth: {amount: 0.18, focusX: 57, focusY: 45, radius: 34},
    atmosphere: {mist: 0.62, droplets: 0.25, sparkle: 0.12, direction: 1},
    light: {intensity: 0.42, beamAngle: -10},
    typography: {mode: 'characters', align: 'center', size: 132},
  },
  S04: {
    camera: {scale: [1.085, 1.025], x: [6, -8], y: [-10, 5]},
    depth: {amount: 0.28, focusX: 50, focusY: 48, radius: 30, foreground: true},
    atmosphere: {mist: 0.55, droplets: 0.32, sparkle: 0.22, direction: -1},
    light: {intensity: 0.82, sweep: true, beamAngle: 4},
  },
  S05: {
    camera: {scale: [1.18, 1.04], x: [0, 0], y: [0, -5], settleAt: 0.32},
    depth: {amount: 0.08, focusX: 64, focusY: 46, radius: 42},
    atmosphere: {mist: 0.46, droplets: 0.75, sparkle: 0.5, direction: 1},
    light: {intensity: 0.7, beamAngle: -5},
    impact: true,
  },
  S06: {
    camera: {scale: [1.055, 1.095], x: [-5, 5], y: [10, -8]},
    depth: {amount: 0.24, focusX: 50, focusY: 51, radius: 29, foreground: true},
    atmosphere: {mist: 0.66, droplets: 0.3, sparkle: 0.2, direction: -1},
    light: {intensity: 0.58, beamAngle: 6},
    typography: {mode: 'characters', align: 'bottom', size: 92, bottomOffset: 330},
  },
  S07: {
    camera: {scale: [1.09, 1.135], x: [-30, 24], y: [8, -12]},
    depth: {amount: 0.36, focusX: 50, focusY: 46, radius: 31, foreground: true},
    atmosphere: {mist: 0.3, droplets: 0.68, sparkle: 0.4, direction: 1},
    light: {intensity: 0.5, sweep: true, beamAngle: -8},
  },
  S08: {
    camera: {scale: [1.07, 1.025], x: [7, -4], y: [-4, 6]},
    depth: {amount: 0.06, focusX: 64, focusY: 46, radius: 42},
    atmosphere: {mist: 0.38, droplets: 0.45, sparkle: 0.24, direction: -1},
    light: {intensity: 0.54, beamAngle: 6},
    typography: {mode: 'word', align: 'bottom', size: 76, bottomOffset: 170},
  },
  S09: {
    camera: {scale: [1.035, 1.055], x: [0, 0], y: [4, 0], settleAt: 0.55},
    depth: {amount: 0.12, focusX: 50, focusY: 51, radius: 29},
    atmosphere: {mist: 0.48, droplets: 0.18, sparkle: 0.26, direction: 1},
    light: {intensity: 0.68, beamAngle: 0},
    typography: {mode: 'word', align: 'bottom', size: 70, bottomOffset: 170, holdToEnd: true},
  },
};

export const AURORA_BEATS: readonly BeatRecipe[] = storyboard.shots.map((shot) => {
  const id = shot.id as BeatId;
  return {
    ...shot,
    id,
    startFrame: sec(shot.startSec),
    durationFrames: sec(shot.endSec - shot.startSec),
    ...recipes[id],
  };
});

export const AURORA_CUES = AURORA_BEATS.filter((beat) => beat.sfx).map((beat) => ({
  id: beat.id,
  name: beat.sfx as string,
  frame: beat.startFrame,
}));

export const AURORA_TRANSITIONS: readonly {
  into: BeatId;
  kind: TransitionKind;
  durationFrames: number;
}[] = [
  {into: 'S03', kind: 'mist', durationFrames: 18},
  {into: 'S04', kind: 'aurora', durationFrames: 22},
  {into: 'S05', kind: 'flash', durationFrames: 10},
  {into: 'S06', kind: 'mist', durationFrames: 18},
  {into: 'S09', kind: 'aurora', durationFrames: 20},
];
