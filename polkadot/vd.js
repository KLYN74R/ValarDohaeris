import{encodeAddress} from '@polkadot/util-crypto'
import {derivePath} from 'ed25519-hd-key'
import nacl from 'tweetnacl'
import bip39 from 'bip39'



//Ed25519(native)
//Signature is base64 encoded
export default {


    generate:async(mnemonic,bip44Path,mnemoPassword,ss58Format=0)=>{

        mnemonic ||=bip39.generateMnemonic()

        bip44Path ||=`m/44'/354'/0'/0'`

        let seed = bip39.mnemonicToSeedSync(mnemonic,mnemoPassword)
        
        let pair = nacl.sign.keyPair.fromSeed(derivePath(bip44Path,seed.slice(0,32)).key)

     
        return {
            
            privateKey: Buffer.from(pair.secretKey).toString('hex'),

            publicKey:Buffer.from(pair.publicKey).toString('hex'),

            address:encodeAddress(pair.publicKey,ss58Format),

            mnemonic,

            bip44Path
        
        }
    
    },


    sign:(data,privateKey)=>Buffer.from(
        
        nacl.sign.detached(
            
            new Uint8Array(Buffer.from(data,'utf-8')),
            new Uint8Array(Buffer.from(privateKey,'hex'))
            
        )
        
    ).toString('base64'),


    verify:(data,signature,pubKey)=>
    
        nacl.sign.detached.verify(
            
            new Uint8Array(Buffer.from(data,'utf-8')),
            new Uint8Array(Buffer.from(signature,'base64')),
            new Uint8Array(Buffer.from(pubKey,'hex'))
            
        )
    ,
        
    toSubstrate:hexPubKey=>encodeAddress(Buffer.from(hexPubKey,'hex'),42)

}