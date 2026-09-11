import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const commands=[
  ['branch','--show-current'],['rev-parse','HEAD'],['status','--short'],
  ['diff','--check'],['diff','--stat'],['diff','--numstat'],
  ['ls-files','--others','--exclude-standard','--','README.md','artifacts/.gitignore','docs','scripts','src','package.json','package-lock.json','tsconfig.json'],
];
const target='docs/astra-evidence/git-state.txt';
if(!fs.existsSync(target))fs.writeFileSync(target,'Repository evidence snapshot.\n');
let text='Final repository snapshot. Pre-existing commercials/aurora-cold-brew/output/ is preserved and not inspected.\n\n';
for(const args of commands){
  const result=spawnSync('git',args,{encoding:'utf8'});
  if(result.status!==0)throw new Error(result.stderr);
  text+=`$ git ${args.join(' ')}\n${result.stdout || '(no output)\n'}\n`;
}
fs.writeFileSync(target,text);
console.log(text);
