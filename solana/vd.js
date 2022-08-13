import Solana from '@solana/web3.js'

import bip39 from 'bip39'


let account = Solana.Keypair.fromSecretKey(keyPairFromSeed.prv)


export default {


    generate:async(mnemonic,mnemoPassword)=>{

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