import {FilecoinSigner} from '@blitslabs/filecoin-js-signer'





let filecoin_signer = new FilecoinSigner()


//ECDSA (secp256k1 curve)
export default {


    generate:async(mnemonicBitsStrength,network,derivationPath=`m/44'/461'/0'/0/0`)=>{

        let mnemonic = await filecoin_signer.wallet.generateMnemonic(mnemonicBitsStrength),

            keyPair = await filecoin_signer.wallet.keyDerive(mnemonic,derivationPath,network)


        return {mnemonic,keyPair}

    },

    
    /**
    *   To sign random string data
    *
    *   @param {string} data String data to sign
    *   @param {string} privateKey  32-bytes hexadecimal privateKey
    * 
    *   @returns {Promise<String>}
    */
    sign:(data,privateKey)=>filecoin_signer.utils.signMessage(data, privateKey),


    /**
    *   To verify random string data
    *
    *   @param {string} data String data to sign
    *   @param {string} signature  64-bytes hexadeciml signature
    *   @param {string} address Address of signer
    *   @returns {Promise<boolean>} Is valid signature?
    */
    verify:(data,signature,address)=>filecoin_signer.utils.verifySignature(data,signature,address)


}