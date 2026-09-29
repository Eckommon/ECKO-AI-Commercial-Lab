import React from 'react';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame} from 'remotion';
import {SourceSurface} from '../../factory/SourceSurface';
import type {NovaelBeat} from './timeline';

const ASSET_ROOT='commercials/novael-arc/assets/';
export const NovaelScene:React.FC<{beat:NovaelBeat}>=({beat})=>{
  const frame=useCurrentFrame();
  const recipe=beat.recipe;
  const animated=recipe.motion!=='still';
  const opacity=animated?interpolate(frame,[0,recipe.settleFrame],recipe.opacity,{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)}):1;
  const scale=animated?interpolate(frame,[0,recipe.settleFrame],recipe.scale,{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)}):1;
  const typeOpacity=beat.copy&&recipe.typeCompleteFrame!==undefined?interpolate(frame,[0,recipe.typeCompleteFrame],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)}):0;
  const copy=recipe.lineBreak?beat.copy.replace(' THE ',' THE\n'):beat.copy;
  return <AbsoluteFill style={{backgroundColor:'#12110f',overflow:'hidden'}}>
    <AbsoluteFill style={{opacity,scale}}>
      <SourceSurface src={`${ASSET_ROOT}${beat.asset}`} policy={recipe.surface} layout={{kind:'full'}} backgroundColor="#12110f" />
    </AbsoluteFill>
    {beat.copy?<div style={{position:'absolute',left:108,right:108,top:154,minHeight:146,display:'flex',alignItems:'flex-start',justifyContent:'center',whiteSpace:'pre-line',fontFamily:'Arial, Helvetica, sans-serif',fontSize:recipe.fontSize,fontWeight:500,letterSpacing:'.04em',lineHeight:1.08,color:'#f2eadc',textAlign:'center',opacity:typeOpacity}}>{copy}</div>:null}
  </AbsoluteFill>;
};
