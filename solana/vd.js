import SolanaWeb3 from '@solana/web3.js'

import nacl from 'tweetnacl'








export default {


    generate:()=>{

        let {publicKey,secretKey}=SolanaWeb3.Keypair.generate()

        //export in BASE64 format
        return {
                    publicKey:Buffer.from(publicKey.toBytes()).toString('base64'),
                    
                    privateKey:Buffer.from(secretKey).toString('base64')
                
                }

    },

    //Signature in exportable form
    sign:(data,privateKey)=>
    
        Buffer.from(

            nacl.sign.detached(
                
                new Uint8Array(Buffer.from(data,'utf-8')),
                new Uint8Array(Buffer.from(privateKey,'base64'))
                
            )

        ).toString('base64'),




    
    verify:(data,signature,pubKey)=>
        
        nacl.sign.detached.verify(
            
            new Uint8Array(Buffer.from(data,'utf-8')),
            new Uint8Array(Buffer.from(signature,'base64')),
            new Uint8Array(Buffer.from(pubKey,'base64'))
        
        ),


    getAddress:pubKey=>
    
        new SolanaWeb3.Keypair(
            
            {publicKey:new Uint8Array(Buffer.from(pubKey,'base64'))}
        
        ).publicKey.toBase58()

}