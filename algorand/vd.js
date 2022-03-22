import AlgoSDK from 'algosdk'





//Ed25519
export default {

    generate:()=>{
            
        let acc=AlgoSDK.generateAccount()

        return {acc,mnemonic:AlgoSDK.secretKeyToMnemonic(acc.sk)}
    
    },
    
    sign:(data,privateKey)=>Buffer.from(AlgoSDK.signBytes(Buffer.from(data),privateKey)).toString('base64'),
    
    verify:(data,signature,address)=>AlgoSDK.verifyBytes(Buffer.from(data),Buffer.from(signature,'base64'),address),
    
    deriveAccFromMnemonic:phrase=>AlgoSDK.mnemonicToSecretKey(phrase)

}