import Solana from '@solana/web3.js'
import nacl from 'tweetnacl'
import bip39 from 'bip39'




export default {


    generate:async(mnemonic,mnemoPassword)=>{

        mnemonic ||=bip39.generateMnemonic()

        let seed = bip39.mnemonicToSeedSync(mnemonic,mnemoPassword)

        let pair = Solana.Keypair.fromSeed(seed.slice(0,32))

        return {
            
            privateKey: Buffer.from(pair.secretKey).toString('hex'),

            pubkey:pair.publicKey.toBuffer().toString('hex'),

            address:pair.publicKey.toBase58(),

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


}