import pkg from 'sotez';
const PACK = pkg;


// const generate = async (_data) => {

//     // Generate a new random mnemonic
//   const mnemonic = PACK.cryptoUtils.generateMnemonic();
//   // 'raw peace visual boil prefer rebel anchor right elegant side gossip enroll force salmon between'

//   const keys = await PACK.cryptoUtils.generateKeys(mnemonic);

//   return keys

// }


let keys=await PACK.cryptoUtils.generate()
console.log(keys)

console.log()

let signa=await PACK.cryptoUtils.sign('Data',keys.sk)

console.log(signa)

console.log(await PACK.verify(signa.sbytes,signa.sig,keys.pk))