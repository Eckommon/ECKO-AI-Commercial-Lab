import React from 'react';
import {Composition} from 'remotion';
import {AuroraCommercial} from './commercials/aurora/AuroraCommercial';
import {brief} from './commercials/aurora/direction';

export const Root: React.FC = () => (
  <Composition
    id="AuroraColdBrew"
    component={AuroraCommercial}
    durationInFrames={brief.durationSec * brief.fps}
    fps={brief.fps}
    width={Number(brief.resolution.split('x')[0])}
    height={Number(brief.resolution.split('x')[1])}
  />
);
