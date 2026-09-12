export type CampaignMaskAdapter = Readonly<{id: string; cssMaskImage?: string}>;
export type CampaignCleanupAdapter = Readonly<{id: string; overlay: string}>;

export type SourceSurfacePolicy = Readonly<{
  mode: 'whole-source' | 'mask' | 'cleanup';
  fallbackMode: 'whole-source' | 'editorial-field' | 'split-panel';
  mask?: CampaignMaskAdapter;
  cleanup?: CampaignCleanupAdapter;
}>;

export const resolveSourceSurface = (policy: SourceSurfacePolicy) => {
  if (policy.mode === 'mask' && !policy.mask) throw new Error('Mask adapter required for mask mode');
  if (policy.mode === 'cleanup' && !policy.cleanup) throw new Error('Cleanup adapter required for cleanup mode');
  return {...policy, mask: policy.mask, cleanup: policy.cleanup};
};
