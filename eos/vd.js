import EosJS from 'eosjs/dist/PublicKey.js'

import ecc from 'eosjs-ecc'



//ECDSA k1 and r1 curves
export default {

    generate:()=>ecc.randomKey().then(privateKey=>({privateKey,address:ecc.privateToPublic(privateKey)})),

    sign:(data,privateKey)=>ecc.sign(data,privateKey),

    verify:(data,signature,address)=>ecc.verify(signature,data,address),

    toPUB_K1:EOSaddress=>EosJS.PublicKey.fromString(EOSaddress).toString(),

    toLegacy:PUB_K1address=>EosJS.PublicKey.fromString(PUB_K1address).toLegacyString()

}