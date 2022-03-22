import {crypto as BnbCrypto} from '@binance-chain/javascript-sdk'



//ECDSA (secp256k1 curve)
export default {


    generateMnemonic:()=>BnbCrypto.generateMnemonic(),

        generate:mnemonic=>{
            
        // generate key entropy
        let privateKey = mnemonic ? BnbCrypto.getPrivateKeyFromMnemonic(mnemonic) : BnbCrypto.generatePrivateKey(),
    
            // get an address
            address = BnbCrypto.getAddressFromPrivateKey(privateKey,'bnb'),

            publicKey = BnbCrypto.getPublicKeyFromPrivateKey(privateKey)
        

        return {privateKey,address,publicKey}    
        
    },



    sign:(data,privateKey)=>Buffer.from(BnbCrypto.generateSignature(data,privateKey)).toString('base64'),


    verify:(data,signature,pubKey)=>BnbCrypto.verifySignature(Buffer.from(signature,'base64'),data,pubKey),


    deriveFromMnemonic:mnemonic=>{
        
        let privateKey=crypto.getPrivateKeyFromMnemonic(mnemonic),
            
            publicKey=crypto.getPublicKeyFromPrivateKey(priv),
            
            address=crypto.getAddressFromPublicKey(pub,'bnb')
        
        return {privateKey,publicKey,address}
    
    },


}