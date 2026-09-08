import React from 'react';
import {Composition} from 'remotion';
import {AuroraCommercial} from './commercials/aurora/AuroraCommercial';

export const Root: React.FC = () => (
  <Composition
    id="AuroraColdBrew"
    component={AuroraCommercial}
    durationInFrames={40 * 30}
    fps={30}
    width={1080}
    height={1920}
  />
);
