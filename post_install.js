import fs from 'fs'



console.log(
    
    fs.readFileSync('banner.txt').toString('utf-8')
    .replaceAll('█','\x1b[32;1m█\x1b[0m')
    .replaceAll('#','\x1b[36;1m#\x1b[0m')
    .replace(`< import VD from '@klyntar/valardohaeris/<CRYPTO>/vd.js' >`,`\x1b[31;1m< import VD from '@klyntar/valardohaeris/<CRYPTO>/vd.js' >\x1b[0m`)
    .replace('<CRYPTO>','\x1b[33;1m<CRYPTO>\x1b[0m')
    .replace(`/vd.js' >`,`\x1b[31;1m/vd.js' >\x1b[0m`)
    .replace(`directories of package`,`\u001b[38;5;3mdirectories of package\x1b[0m`)

)