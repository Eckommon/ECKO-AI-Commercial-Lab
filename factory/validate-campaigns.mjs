import {validateCampaign} from './validate-contract.mjs';
import {AURORA_VALIDATION_SPEC} from './campaigns/aurora.mjs';
import {NOVAEL_VALIDATION_SPEC} from './campaigns/novael.mjs';
export const validateAuroraCampaign=(options={})=>validateCampaign({...options,campaign:AURORA_VALIDATION_SPEC});
export const validateNovaelCampaign=(options={})=>validateCampaign({...options,campaign:NOVAEL_VALIDATION_SPEC});
