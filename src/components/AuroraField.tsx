import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
export const AuroraField: React.FC<{energy?: number; phase?: number}> = ({energy = 1, phase = 0}) => {
  const f = useCurrentFrame() + phase;
  return <AbsoluteFill>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, #0a3f2e 0%, #031914 38%, #020807 78%)'}}/>
    <svg viewBox="0 0 1080 1920" width="100%" height="100%" style={{position: 'absolute', opacity: energy}}>
      <defs>
        <linearGradient id={`ribbon-${phase}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#7affc3" stopOpacity="0"/><stop offset=".38" stopColor="#38eaa3" stopOpacity=".38"/><stop offset=".75" stopColor="#187657" stopOpacity=".2"/><stop offset="1" stopColor="#63ffd0" stopOpacity="0"/>
        </linearGradient>
        <filter id={`air-${phase}`} x="-100%" y="-20%" width="300%" height="140%"><feGaussianBlur stdDeviation="24"/></filter>
        <radialGradient id={`floor-${phase}`}><stop stopColor="#38ce98" stopOpacity=".24"/><stop offset="1" stopColor="#38ce98" stopOpacity="0"/></radialGradient>
      </defs>
      <g filter={`url(#air-${phase})`}>
        {Array.from({length: 7}, (_, i) => {
          const x = 130 + i * 140 + 75 * Math.sin(f / 95 + i * .32);
          const bend = 100 * Math.sin(f / 120 + i * .44);
          return <path key={i} d={`M${x - 220} -180 C${x + 250 + bend} 350 ${x - 180} 650 ${x + bend} 1060 S${x + 70} 1480 ${x - 90} 1920`} fill="none" stroke={`url(#ribbon-${phase})`} strokeWidth={24 + i % 3 * 26} opacity={.35 + i % 3 * .15}/>;
        })}
      </g>
      {Array.from({length: 35}, (_, i) => {
        const x = ((i * 137.37 + 30 * Math.sin(f / 70 + i)) % 1080);
        const y = (i * 83.73 - f * (.12 + i % 3 * .12) + 2200) % 1920;
        return <circle key={i} cx={x} cy={y} r={1.1 + i % 4 * .8} fill="#b6f6d8" opacity={.12 + .15 * Math.sin(i + f / 25) ** 2}/>;
      })}
      <ellipse cx="540" cy="1540" rx="450" ry="145" fill={`url(#floor-${phase})`}/>
      <ellipse cx="540" cy="1550" rx={350 + Math.sin(f / 70) * 22} ry="70" stroke="#68ca9c" strokeWidth="1.2" fill="none" opacity=".16"/>
    </svg>
    <AbsoluteFill style={{background: `radial-gradient(ellipse at ${45 + Math.sin(f / 110) * 20}% 76%, rgba(72,172,126,${.09 * energy}), transparent 40%)`}}/>
  </AbsoluteFill>;
};
