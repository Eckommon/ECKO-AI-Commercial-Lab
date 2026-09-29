import React from 'react';
import {Composition} from 'remotion';
import {AuroraCommercial} from './commercials/aurora/AuroraCommercial';
import {AURORA_CONTRACT} from './commercials/aurora/timeline';
import {NovaelCommercial} from './commercials/novael/NovaelCommercial';
import {NOVAEL_CONTRACT} from './commercials/novael/timeline';

export const Root: React.FC = () => (<>
  <Composition
    id="AuroraColdBrew"
    component={AuroraCommercial}
    durationInFrames={AURORA_CONTRACT.durationSec * AURORA_CONTRACT.fps}
    fps={AURORA_CONTRACT.fps}
    width={AURORA_CONTRACT.width}
    height={AURORA_CONTRACT.height}
  />
  <Composition id="NovaelArc" component={NovaelCommercial} durationInFrames={NOVAEL_CONTRACT.durationSec*NOVAEL_CONTRACT.fps} fps={NOVAEL_CONTRACT.fps} width={NOVAEL_CONTRACT.width} height={NOVAEL_CONTRACT.height}/>
</>);
