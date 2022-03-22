import Zil from '@zilliqa-js/crypto'


export default {

    generate:()=>Zil.getAccountFrom0xPrivateKey(Zil.randomBytes(32)),

    sign:(data,privateKey,pubKey)=>Zil.sign(Buffer.from(data,'utf-8'),privateKey,pubKey),

    verify:(data,signature,publicKey)=>{
        /*unimplemented*/
    }

}