import design from '../../../commercials/aurora-cold-brew/design/creative-direction.v1.2.json' with {type: 'json'};
import type {SourceSurfaceLayout} from '../../factory/SourceSurface';

export type AuroraBeatId = 'S01'|'S02'|'S03'|'S04'|'S05'|'S06'|'S07'|'S08'|'S09';
export const settledFrame = (durationFrames: number, progress: number) => Math.ceil(durationFrames * progress);
export const completionFrame = settledFrame;

type AuroraV12Recipe = Readonly<{
  treatment: (typeof design.beatTreatments)[number];
  surface: Readonly<{mode: 'whole-source'; fallbackMode: 'whole-source'|'editorial-field'|'split-panel'; allowMask: false}>;
  layout: SourceSurfaceLayout;
  objectPosition: string;
  camera: Readonly<{travel: number; settleAt?: number}>;
  cameraRecipe: Readonly<{scale: readonly [number,number]; x: readonly [number,number]; y: readonly [number,number]; rotate?: readonly [number,number]; settleAt?: number}>;
  typeCompleteAt?: number;
  textPlacement?: 'center'|'top'|'bottom';
  energyRank: number;
}>;

const treatment = (id: AuroraBeatId) => {
  const found = design.beatTreatments.find((item) => item.beatId === id);
  if (!found) throw new Error(`Missing approved creative treatment ${id}`);
  return found;
};
const full = {kind: 'full'} as const;
const whole = (fallbackMode: AuroraV12Recipe['surface']['fallbackMode']) => ({mode: 'whole-source', fallbackMode, allowMask: false} as const);

export const AURORA_V12_RECIPES: Record<AuroraBeatId, AuroraV12Recipe> = {
  S01: {treatment: treatment('S01'), surface: whole('whole-source'), layout: full, objectPosition: '50% 48%', camera: {travel: 16}, cameraRecipe:{scale:[1.12,1.035],x:[-8,3],y:[18,-5]}, energyRank: 4},
  S02: {treatment: treatment('S02'), surface: whole('whole-source'), layout: full, objectPosition: '53% 43%', camera: {travel: 22}, cameraRecipe:{scale:[1.075,1.16],x:[18,-24],y:[12,-18]}, energyRank: 5},
  S03: {treatment: treatment('S03'), surface: whole('editorial-field'), layout: full, objectPosition: '50% 48%', camera: {travel: 10}, cameraRecipe:{scale:[1.075,1.035],x:[8,-5],y:[30,-18]}, typeCompleteAt: .25, textPlacement: 'bottom', energyRank: 6},
  S04: {treatment: treatment('S04'), surface: whole('whole-source'), layout: full, objectPosition: '50% 48%', camera: {travel: 13}, cameraRecipe:{scale:[1.085,1.025],x:[6,-8],y:[-10,5]}, energyRank: 3},
  S05: {treatment: treatment('S05'), surface: whole('whole-source'), layout: full, objectPosition: '50% 47%', camera: {travel: 14, settleAt:.32}, cameraRecipe:{scale:[1.18,1.04],x:[0,0],y:[0,-5],settleAt:.32}, energyRank: 1},
  S06: {treatment: treatment('S06'), surface: whole('editorial-field'), layout: {kind: 'editorial-field', top: 0, height: .20, color: '#06100d'}, objectPosition: '50% 52%', camera: {travel: 8, settleAt:.30}, cameraRecipe:{scale:[1.055,1.095],x:[-5,5],y:[10,-8],settleAt:.30}, typeCompleteAt: .30, textPlacement: 'top', energyRank: 7},
  S07: {treatment: treatment('S07'), surface: whole('whole-source'), layout: full, objectPosition: '51% 44%', camera: {travel: 12}, cameraRecipe:{scale:[1.06,1.075],x:[-12,10],y:[4,-5]}, energyRank: 8},
  S08: {treatment: treatment('S08'), surface: whole('split-panel'), layout: {kind: 'split-panel', sourcePanelRatio: .72, bandColor: '#030907'}, objectPosition: '50% 47%', camera: {travel: 8}, cameraRecipe:{scale:[1.07,1.025],x:[7,-4],y:[-4,6]}, typeCompleteAt: .40, energyRank: 9},
  S09: {treatment: treatment('S09'), surface: whole('editorial-field'), layout: {kind: 'editorial-field', top: 0, height: .20, color: '#06100d'}, objectPosition: '50% 52%', camera: {travel: 5, settleAt:.25}, cameraRecipe:{scale:[1.035,1.055],x:[0,0],y:[4,0],settleAt:.25}, typeCompleteAt: .25, textPlacement: 'top', energyRank: 10},
};
