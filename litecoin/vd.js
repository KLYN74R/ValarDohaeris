import litecore from 'bitcore-lib-ltc'//LTC




export default {


    generate:hexOrWIF=>{

        let privateKey = litecore.PrivateKey(hexOrWIF),

            publicKey = privateKey.toPublicKey()
    
        return {

            privateKey:privateKey.toWIF(),
            
            publicKey:publicKey.toString(),

            p2wpkh:publicKey.toAddress('mainnet','witnesspubkeyhash').toString(),

            p2sh:publicKey.toAddress('mainnet','scripthash').toString(),

            p2pkh:publicKey.toAddress('mainnet','pubkeyhash').toString()

        }

    
    },



    sign:(data,hexOrWIFforPrivateKey)=>{

        let privateKey = litecore.PrivateKey(hexOrWIFforPrivateKey),
    
            message = new litecore.Message(data),

            signature = message.sign(privateKey)

            
        return {
            
            publicKey:privateKey.toPublicKey().toString(),
            
            signature
        
        }

    },



    verify:(data,signature,pubkey)=>{
        
        return new litecore.Message(data).verify(litecore.PublicKey(pubkey).toAddress('mainnet','pubkeyhash').toString(),signature)

    }

}