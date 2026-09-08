import React from 'react';
import {Composition} from 'remotion';
import {AuroraCommercial} from './commercials/aurora/AuroraCommercial';
import {AURORA_CONTRACT} from './commercials/aurora/timeline';

export const Root: React.FC = () => (
  <Composition
    id="AuroraColdBrew"
    component={AuroraCommercial}
    durationInFrames={AURORA_CONTRACT.durationSec * AURORA_CONTRACT.fps}
    fps={AURORA_CONTRACT.fps}
    width={AURORA_CONTRACT.width}
    height={AURORA_CONTRACT.height}
  />
);
