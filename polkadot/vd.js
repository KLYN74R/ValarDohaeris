import{encodeAddress,mnemonicGenerate,mnemonicToMiniSecret} from '@polkadot/util-crypto'

import nacl from 'tweetnacl'


//Ed25519,ECDSA(secp256k1) and other (doesn't matter here)
export default {


    generate:(mnemonic=mnemonicGenerate())=>{

        let seed=mnemonicToMiniSecret(mnemonic),

            {publicKey,secretKey} = nacl.sign.keyPair.fromSeed(seed)

        return {seed:Buffer.from(seed).toString('base64'), publicKey:Buffer.from(publicKey).toString('base64'), secretKey:Buffer.from(secretKey).toString('base64')}

    },


    sign:(data,privateKey)=>
        
        //Return signature in base64 format for easy transfer
        Buffer.from(nacl.sign.detached( new Uint8Array(data),  new Uint8Array(Buffer.from(privateKey,'base64')))).toString('base64'),



    verify:(data,signature,pubKey)=>
    
        nacl.sign.detached.verify(
            
            new Uint8Array(data),
            new Uint8Array(Buffer.from(signature,'base64')),
            new Uint8Array(Buffer.from(pubKey,'base64'))
            
        ),


    
    toKusama:pubKey=>encodeAddress(Buffer.from(pubKey,'base64'),2),

    toSubstrate:pubKey=>encodeAddress(Buffer.from(pubKey,'base64'),42),

    toPolkadot:pubKey=>encodeAddress(Buffer.from(pubKey,'base64'),0),


}