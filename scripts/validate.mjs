import {validateAuroraCampaign} from '../factory/validate-contract.mjs';

const root = process.cwd();
const validated = validateAuroraCampaign({root});

console.log(
  `PASS: creative-direction schema and semantic contract / ${validated.runtime.beats.length} treatments / scene-family references / source hashes`,
);
