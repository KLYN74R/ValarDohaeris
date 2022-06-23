import RippleKeys from 'ripple-keypairs'
import crypto from 'crypto'

let SHA256=x=>crypto.createHash('sha256').update(x).digest('hex');


// XPR GSVDT scheme
//ECDSA (secp256k1 curve) and ED25519
export default{

    generate:seedOptions=>{
            
        let seed=RippleKeys.generateSeed(seedOptions),
                
            keyPair=RippleKeys.deriveKeypair(seed)

        return {seed,keyPair,address:RippleKeys.deriveAddress(keyPair.publicKey)}

    },

    sign:(stringData,privateKey)=>RippleKeys.sign(SHA256(stringData),privateKey),

    verify:(plainText,signature,publicKey)=>RippleKeys.verify(SHA256(plainText),signature,publicKey)


}