import bitdoge from 'bitcore-doge-lib'//DOGE

import bitcore from 'bitcore-lib'




export default {


    generate:hexOrWIF=>{

        let privateKey = bitdoge.PrivateKey(hexOrWIF),

            publicKey = privateKey.toPublicKey()
    
        return {

            privateKey:privateKey.toWIF(),
            
            publicKey:publicKey.toString(),

            address:publicKey.toAddress('mainnet','pubkeyhash').toString(),

        }

    
    },



    sign:(data,hexOrWIFforPrivateKey)=>{

        let privateKey = bitdoge.PrivateKey(hexOrWIFforPrivateKey),
    
            message = new bitcore.Message(data),

            signature = message.sign(privateKey)

            
        return {
            
            publicKey:privateKey.toPublicKey().toString(),
            
            signature
        
        }

    },



    verify:(data,signature,pubkey)=>{
        
        return new bitcore.Message(data).verify(bitdoge.PublicKey(pubkey).toAddress('mainnet','pubkeyhash').toString(),signature)

    }

}