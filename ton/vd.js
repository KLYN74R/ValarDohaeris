import nacl from 'tweetnacl'
import tonweb from 'tonweb'
import bip39 from 'bip39'




export default {


    generate:async(mnemonic,mnemoPassword)=>{

        mnemonic ||=bip39.generateMnemonic()

        let seed = bip39.mnemonicToSeedSync(mnemonic,mnemoPassword)
        
        let pair = nacl.sign.keyPair.fromSeed(seed.slice(0,32))

     
        return {
            
            privateKey: Buffer.from(pair.secretKey).toString('hex'),

            pubkey:Buffer.from(pair.publicKey).toString('hex'),

            address:(await new tonweb().wallet.create({publicKey:pair.publicKey}).getAddress()).toString(true, true, true, false),

            mnemonic
        
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