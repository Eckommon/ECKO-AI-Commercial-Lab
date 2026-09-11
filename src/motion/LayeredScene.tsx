import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import type {DepthRecipe} from '../commercials/aurora/timeline';
import {depthOffset, smoothstep} from './math';

type Props = {
  src: string;
  durationFrames: number;
  depth: DepthRecipe;
};

export const LayeredScene: React.FC<Props> = ({src, durationFrames, depth}) => {
  const frame = useCurrentFrame();
  const progress = smoothstep(frame / Math.max(1, durationFrames - 1));
  const backgroundTravel = depthOffset(progress, depth.amount, -9);
  const foregroundTravel = depthOffset(progress, depth.amount, 11);
  const source = staticFile(src);

  return (
    <AbsoluteFill style={{backgroundColor: '#020706', overflow: 'hidden'}}>
      <Img src={source} style={{width: '100%', height: '100%', objectFit: 'cover'}} />

      {depth.amount > 0 ? (
        <>
          <AbsoluteFill
            style={{
              inset: '-5%',
              opacity: depth.amount * 0.28,
              mixBlendMode: 'screen',
              translate: `${backgroundTravel}px ${backgroundTravel * -0.45}px`,
              background: `radial-gradient(ellipse at ${depth.focusX}% ${depth.focusY}%, rgba(45,255,164,.28), transparent ${depth.radius + 18}%)`,
              filter: 'blur(28px)',
            }}
          />
          {depth.foreground ? (
            <AbsoluteFill
              style={{
                inset: '-5%',
                scale: 1.03,
                translate: `${-foregroundTravel}px ${foregroundTravel * 0.45}px`,
                opacity: 0.34,
                background:
                  'radial-gradient(ellipse at 0 100%, rgba(0,12,9,.92), transparent 34%), radial-gradient(ellipse at 100% 100%, rgba(0,12,9,.92), transparent 34%)',
                filter: 'blur(12px)',
              }}
            />
          ) : null}
        </>
      ) : null}

      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,.20), transparent 38%, rgba(0,0,0,.18) 67%, rgba(0,0,0,.48)), radial-gradient(ellipse at center, transparent 48%, rgba(0,5,4,.32) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
