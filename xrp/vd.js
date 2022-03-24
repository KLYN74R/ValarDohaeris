import RippleKeys from 'ripple-keypairs'


// XPR GSVDT scheme
//ECDSA (secp256k1 curve) and ED25519
export default{

    generate:seedOptions=>{
            
        let seed=RippleKeys.generateSeed(seedOptions),
                
            keyPair=RippleKeys.deriveKeypair(seed)

        return {seed,keyPair,address:RippleKeys.deriveAddress(keyPair.publicKey)}

    },

    sign:(stringData,privateKey)=>RippleKeys.sign(stringData,privateKey),

    verify:(plainText,signature,publicKey)=>RippleKeys.verify(plainText,signature,publicKey)


}