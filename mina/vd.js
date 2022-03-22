import MinaSDK from '@o1labs/client-sdk'



export default {


    generate:()=>MinaSDK.genKeys(),

    sign:(data,keyPair)=>MinaSDK.signMessage(data,keyPair),

    verify:signatureObj=>MinaSDK.verifyMessage(signatureObj),

    derivePublicKey:privateKey=>MinaSDK.derivePublicKey(privateKey)

}