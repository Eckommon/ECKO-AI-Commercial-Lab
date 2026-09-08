import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

type Props = {
  src: string;
  durationFrames: number;
  zoomFrom?: number;
  zoomTo?: number;
  xFrom?: number;
  xTo?: number;
  yFrom?: number;
  yTo?: number;
  impact?: boolean;
};

export const Shot: React.FC<Props> = ({
  src,
  durationFrames,
  zoomFrom = 1.02,
  zoomTo = 1.10,
  xFrom = 0,
  xTo = 0,
  yFrom = 0,
  yTo = 0,
  impact = false,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationFrames], [zoomFrom, zoomTo], {extrapolateRight: 'clamp'});
  const x = interpolate(frame, [0, durationFrames], [xFrom, xTo], {extrapolateRight: 'clamp'});
  const y = interpolate(frame, [0, durationFrames], [yFrom, yTo], {extrapolateRight: 'clamp'});
  const shake = impact && frame < 14 ? Math.sin(frame * 3.2) * (14 - frame) * 0.7 : 0;

  return (
    <AbsoluteFill style={{backgroundColor: '#020706', overflow: 'hidden'}}>
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `translate(${x + shake}px, ${y}px) scale(${scale})`,
        }}
      />
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,.16), rgba(0,0,0,.02) 45%, rgba(0,0,0,.42))',
        }}
      />
    </AbsoluteFill>
  );
};
