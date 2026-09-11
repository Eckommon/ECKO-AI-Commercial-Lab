import React from 'react';
import {Img, staticFile} from 'remotion';
const silhouettes: Record<string, string> = {
  'shot-01-hero.png': 'M306 210 Q495 157 686 206 L688 233 Q708 260 705 380 L704 1300 Q694 1345 510 1345 Q301 1343 293 1294 L290 355 Q292 263 307 235 Z',
  'shot-02-macro.png': 'M338 314 Q500 268 650 312 L651 339 Q676 370 673 450 L672 1190 Q659 1232 502 1233 Q337 1234 331 1190 L326 440 Q326 370 338 339 Z',
  'shot-03-portrait.png': 'M388 389 C500 310 750 315 892 372 L899 400 Q920 500 912 610 L907 1390 Q800 1505 540 1465 L369 1340 L365 540 Q365 430 388 400 Z',
  'shot-05-endcard.png': 'M350 416 Q500 371 650 412 L657 437 Q675 465 670 555 L668 1270 Q665 1315 500 1316 Q341 1318 335 1270 L334 540 Q335 465 350 437 Z',
};
// Normalized 1000 x 1778 coordinates. Source PNG bytes are never modified.
export const SourceSurface: React.FC<{asset: string; isolate?: boolean; environment?: boolean; crop?: string; opacity?: number}> = ({asset, isolate = false, environment = false, crop = '0 0 1000 1778', opacity = 1}) => {
  const url = staticFile(`commercials/aurora-cold-brew/assets/${asset}`);
  const id = `source-${asset.replace(/\W/g, '')}`;
  return <>
    <Img src={url} style={{position: 'absolute', width: 1, height: 1, opacity: 0}} />
    <svg viewBox={crop} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{position: 'absolute', inset: 0, overflow: 'hidden', opacity}}>
      <defs>
        <clipPath id={id}><path d={silhouettes[asset] ?? 'M0 0H1000V1778H0Z'} /></clipPath>
        <linearGradient id={`${id}-floor-fade`} x1="0" y1="0" x2="0" y2="1"><stop offset=".64" stopColor="white"/><stop offset=".79" stopColor="black"/></linearGradient>
        <linearGradient id={`${id}-portrait-fade`} x1="0" y1="0" x2="0" y2="1"><stop offset=".67" stopColor="white"/><stop offset=".82" stopColor="black"/></linearGradient>
        <mask id={`${id}-portrait`}><rect width="1000" height="1778" fill={`url(#${id}-portrait-fade)`}/></mask>
        <mask id={`${id}-environment`}><rect width="1000" height="1778" fill={`url(#${id}-floor-fade)`}/><path d={silhouettes[asset]} fill="black"/></mask>
      </defs>
      <g clipPath={isolate ? `url(#${id})` : undefined} mask={environment ? `url(#${id}-environment)` : isolate && asset === 'shot-03-portrait.png' ? `url(#${id}-portrait)` : undefined}>
        <image href={url} width="1000" height="1778" />
        {isolate && asset === 'shot-01-hero.png' && <>
          <TexturePatch url={url} id={`${id}-top`} x={345} y={242} width={305} height={95} sourceY={340}/>
          <TexturePatch url={url} id={`${id}-bottom`} x={355} y={1170} width={300} height={130} sourceY={335}/>
        </>}
        {isolate && asset === 'shot-03-portrait.png' && <TexturePatch url={url} id={`${id}-top`} x={495} y={414} width={355} height={90} sourceY={525}/>}
        {isolate && asset === 'shot-02-macro.png' && <>
          <TexturePatch url={url} id={`${id}-top`} x={400} y={356} width={215} height={55} sourceY={440}/>
          <TexturePatch url={url} id={`${id}-bottom`} x={380} y={1095} width={255} height={110} sourceY={437}/>
        </>}
        {isolate && asset === 'shot-05-endcard.png' && <>
          <TexturePatch url={url} id={`${id}-top`} x={388} y={440} width={240} height={90} sourceY={535}/>
          <TexturePatch url={url} id={`${id}-bottom`} x={390} y={1165} width={240} height={120} sourceY={525}/>
        </>}
      </g>
    </svg>
  </>;
};

// A feathered optical patch samples blank metal from the same canonical source.
// No generated pixels or raster replacement assets; the SVG operation is editable.
const TexturePatch: React.FC<{url: string; id: string; x: number; y: number; width: number; height: number; sourceY: number}> = ({url,id,x,y,width,height,sourceY}) => <>
  <defs>
    <filter id={`${id}-feather`} x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
    <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x={x-20} y={y-20} width={width+40} height={height+40}>
      <rect x={x} y={y} width={width} height={height} fill="white" filter={`url(#${id}-feather)`}/>
    </mask>
  </defs>
  <g mask={`url(#${id}-mask)`}>
    <image href={url} x="0" y={y-sourceY} width="1000" height="1778"/>
  </g>
</>;
