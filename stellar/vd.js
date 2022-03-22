import {Keypair as StellarKeypair} from 'stellar-sdk'


//Ed25519
export default {

    generate:()=>StellarKeypair.random(),

    sign:(data,keyPair)=>keyPair.sign(Buffer.from(data,'utf-8')).toString('base64'),

    verify:(data,signature,pubKey)=>{

        let kp=StellarKeypair.fromPublicKey(pubKey)//just create pair with no knowledge about private keys but with ability to verify


        return kp.verify(Buffer.from(data,'utf8'),Buffer.from(signature,'base64'))

    },

    deriveFromPrivate:(privateKey)=>StellarKeypair.fromSecret(privateKey),

    toTransfer:(keyPair)=>(
        
        {pub:keyPair.publicKey(),prv:keyPair.secret()}
        
    )

}