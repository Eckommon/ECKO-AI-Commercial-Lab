import design from '../../../commercials/novael-arc/design/creative-direction.v1.2.json' with {type:'json'};

export type NovaelBeatId='S01'|'S02'|'S03'|'S04'|'S05'|'S06'|'S07';
type Recipe=Readonly<{
  treatment:(typeof design.beatTreatments)[number];
  surface:Readonly<{mode:'whole-source';fallbackMode:'whole-source'|'editorial-field';allowMask:false;allowSourceDerivedCleanup:false}>;
  motion:'uniform-settle'|'light-reveal'|'still';
  settleFrame:number;
  scale:readonly [number,number];
  opacity:readonly [number,number];
  typeCompleteFrame?:number;
  fontSize?:number;
  lineBreak?:boolean;
}>;
const treatment=(id:NovaelBeatId)=>{const value=design.beatTreatments.find((item)=>item.beatId===id);if(!value)throw new Error(`Missing approved creative treatment ${id}`);return value;};
const surface={mode:'whole-source',fallbackMode:'whole-source',allowMask:false,allowSourceDerivedCleanup:false} as const;
export const NOVAEL_RECIPES:Record<NovaelBeatId,Recipe>={
  S01:{treatment:treatment('S01'),surface,motion:'uniform-settle',settleFrame:30,scale:[1.018,1],opacity:[.82,1]},
  S02:{treatment:treatment('S02'),surface,motion:'uniform-settle',settleFrame:60,scale:[1,1.015],opacity:[1,1]},
  S03:{treatment:treatment('S03'),surface,motion:'still',settleFrame:0,scale:[1,1],opacity:[1,1],typeCompleteFrame:15,fontSize:84},
  S04:{treatment:treatment('S04'),surface,motion:'light-reveal',settleFrame:60,scale:[1,1],opacity:[.8,1]},
  S05:{treatment:treatment('S05'),surface,motion:'still',settleFrame:0,scale:[1,1],opacity:[1,1]},
  S06:{treatment:treatment('S06'),surface,motion:'still',settleFrame:0,scale:[1,1],opacity:[1,1],typeCompleteFrame:15,fontSize:84},
  S07:{treatment:treatment('S07'),surface,motion:'still',settleFrame:0,scale:[1,1],opacity:[1,1],typeCompleteFrame:15,fontSize:68,lineBreak:true},
};
