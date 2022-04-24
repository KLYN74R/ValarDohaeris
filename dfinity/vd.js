import crypto from 'crypto'


import {
    
    key_new,
    key_to_pub_key,
    pub_key_to_address,
    address_to_hex

} from "@dfinity/rosetta-client"


export default {


    generate:seed=>{

        //Derive an ED25519 private key from a system random seed. The private key's .Type is Buffer.
        let privateKey = seed?key_new(seed):key_new(),

            publicKey = key_to_pub_key(privateKey)


        return {privateKey:privateKey.slice(0,32).toString('hex'),publicKey:publicKey.toString('hex'),address:address_to_hex(pub_key_to_address(publicKey))}

    },



    sign:(data,privateKey)=>new Promise((resolve,reject)=>
        
        crypto.sign(null,Buffer.from(data),'-----BEGIN PRIVATE KEY-----\n'+Buffer.from('302e020100300506032b657004220420'+privateKey,'hex').toString('base64')+'\n-----END PRIVATE KEY-----',(e,sig)=>
    
            e?reject(''):resolve(sig.toString('base64'))

        )

    ).catch(e=>''),

       

    verify:(data,signature,pubkey)=>new Promise((resolve,reject)=>
       
        //Add mandatory prefix and postfix to pubkey
        crypto.verify(null,data,'-----BEGIN PUBLIC KEY-----\n'+Buffer.from('302a300506032b6570032100'+pubkey,'hex').toString('base64')+'\n-----END PUBLIC KEY-----',Buffer.from(signature,'base64'),(err,res)=>

            err?reject(false):resolve(res)

        )

    ).catch(e=>false)
    

}