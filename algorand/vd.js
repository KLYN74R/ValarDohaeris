import AlgoSDK from 'algosdk'





//Ed25519
export default {

    generate:mnemonic=>{
            
        let acc= mnemonic ? AlgoSDK.mnemonicToSecretKey(mnemonic) : AlgoSDK.generateAccount(),
        
            temp=acc.sk

        acc.sk=Buffer.from(acc.sk).toString('hex')

        return {acc,mnemonic:AlgoSDK.secretKeyToMnemonic(temp)}
    
    },
    
    sign:(data,privateKey)=>Buffer.from(AlgoSDK.signBytes(Buffer.from(data),Buffer.from(privateKey,'hex'))).toString('base64'),
    
    verify:(data,signature,address)=>AlgoSDK.verifyBytes(Buffer.from(data),Buffer.from(signature,'base64'),address),
    
    deriveAccFromMnemonic:phrase=>AlgoSDK.mnemonicToSecretKey(phrase)

}