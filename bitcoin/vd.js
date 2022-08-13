import bitcore from 'bitcore-lib'//BTC


//Other BTC forks and similar cryptocurrencies
//import dashcore from '@dashevo/dashcore-lib'//DASH
//import bitdoge from 'bitcore-doge-lib'//DOGE
//import bitlite from 'litecore-lib'//LTC
//import bitcash from 'bitcore-lib-cash'
//import qtum from 'qtumcore-lib'//https://github.com/qtumproject/qtumcore-lib/blob/master/docs/examples.md




export default {


    generate:hexOrWIF=>{

        let privateKey = bitcore.PrivateKey(hexOrWIF),

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

        let privateKey = bitcore.PrivateKey(hexOrWIFforPrivateKey),
    
            message = new bitcore.Message(data),

            signature = message.sign(privateKey)

            
        return {
            
            publicKey:privateKey.toPublicKey().toString(),
            
            signature
        
        }

    },



    verify:(data,signature,pubkey)=>{
        
        return new bitcore.Message(data).verify(bitcore.PublicKey(pubkey).toAddress('mainnet','pubkeyhash').toString(),signature)

    }

}