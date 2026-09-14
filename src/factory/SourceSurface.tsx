import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {resolveSourceSurface, type SourceSurfacePolicy} from './source-surface';

export type SourceSurfaceLayout =
  | Readonly<{kind: 'full'}>
  | Readonly<{kind: 'editorial-field'; top: number; height: number; color: string}>
  | Readonly<{kind: 'split-panel'; sourcePanelRatio: number; bandColor: string}>;

export const SourceSurface: React.FC<{
  src: string;
  policy: SourceSurfacePolicy;
  layout: SourceSurfaceLayout;
  objectPosition?: string;
}> = ({src, policy, layout, objectPosition = '50% 50%'}) => {
  const resolved = resolveSourceSurface(policy);
  const panelHeight = layout.kind === 'split-panel' ? `${layout.sourcePanelRatio * 100}%` : '100%';
  return (
    <AbsoluteFill style={{backgroundColor: layout.kind === 'split-panel' ? layout.bandColor : '#020706', overflow: 'hidden'}}>
      <Img
        src={staticFile(src)}
        style={{
          width: '100%', height: panelHeight, objectFit: 'cover', objectPosition,
          maskImage: resolved.mode === 'mask' ? resolved.mask?.cssMaskImage : undefined,
        }}
      />
      {resolved.mode === 'cleanup' ? <AbsoluteFill style={{background: resolved.cleanup?.overlay}} /> : null}
      {layout.kind === 'editorial-field' ? (
        <div style={{position: 'absolute', left: 0, right: 0, top: `${layout.top * 100}%`, height: `${layout.height * 100}%`, background: layout.color}} />
      ) : null}
    </AbsoluteFill>
  );
};
