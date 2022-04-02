import nacl from 'tweetnacl'

import {
    
    key_new,
    key_to_pub_key,
    pub_key_to_address,
    address_to_hex

} from '@dfinity/rosetta-client'




export default {


    generate:seed=>{

        //Derive an ED25519 private key from a system random seed. The private key's .Type is Buffer.
        let privateKey = seed ? key_new(Buffer.from(seed,'base64')) : key_new(),

            publicKey = key_to_pub_key(privateKey)


        return {

            privateKey:privateKey.toString('hex'),
            
            publicKey:publicKey.toString('hex'),

            address:address_to_hex(pub_key_to_address(publicKey))

        }

    },

    sign:(data,privateKey)=>{
    
        let message=new Uint8Array(Buffer.from(data,'utf-8'))
        
        return Buffer.from(
            
            nacl.sign.detached(
                
                message,new Uint8Array(Buffer.from(privateKey,'hex'))
                
            )
            
        ).toString('base64')
    
    },

    verify:(data,signature,pubKey)=>{

        return nacl.sign.detached.verify(
            
            new Uint8Array(Buffer.from(data,'utf-8')),
            
            new Uint8Array(Buffer.from(signature,'base64')),
            
            new Uint8Array(Buffer.from(pubKey,'hex'))
            
        )
   
    }

}