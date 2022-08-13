import{MnemonicKey} from '@terra-money/terra.js'

import secp256k1 from 'secp256k1'

import crypto from 'crypto'

import bip39 from 'bip39'


export default {

    generate:async mnemonic=>{

        mnemonic ||= bip39.generateMnemonic()
            
        const mk = new MnemonicKey({mnemonic})

        return {mnemo:mk.mnemonic,privateKey:mk.privateKey.toString('base64'),address:mk.accAddress,publicKey:mk.publicKey.toProto().key.toString('base64')}

    },

    sign:(data,privateKey)=>

        Buffer.from(
            
            secp256k1.ecdsaSign(new Uint8Array(Buffer.from(crypto.createHash('sha256').update(data).digest('hex'),'hex')),
                
                new Uint8Array(Buffer.from(privateKey,'base64'))
                
            ).signature//we need only signature part
            
        ).toString('base64')//...in base64


    ,
    

    verify:(data,signature,pubKey)=>
    
        secp256k1.ecdsaVerify(new Uint8Array(Buffer.from(signature,'base64')),new Uint8Array(Buffer.from(crypto.createHash('sha256').update(data).digest('hex'),'hex')),Buffer.from(pubKey,'base64'))
 
}