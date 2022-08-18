import {derivePath} from 'ed25519-hd-key'
import nacl from 'tweetnacl'
import tonweb from 'tonweb'
import bip39 from 'bip39'




export default {


    generate:async(mnemonic,bip44Path,mnemoPassword)=>{

        mnemonic ||=bip39.generateMnemonic()

        bip44Path ||=`m/44'/607'/0'/0'`


        let seed = bip39.mnemonicToSeedSync(mnemonic,mnemoPassword)
        
        let pair = nacl.sign.keyPair.fromSeed(derivePath(bip44Path,seed.slice(0,32)).key)

     
        return {
            
            privateKey: Buffer.from(pair.secretKey).toString('hex'),

            pubkey:Buffer.from(pair.publicKey).toString('hex'),

            address:(await new tonweb().wallet.create({publicKey:pair.publicKey}).getAddress()).toString(true, true, true, false),

            mnemonic,

            bip44Path,

            type:'V3R1'
        
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

}