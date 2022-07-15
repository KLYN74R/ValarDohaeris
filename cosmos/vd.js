import{mnemonicGenerate} from '@polkadot/util-crypto'

import Tendermint from '@tendermint/sig'

import secp256k1 from 'secp256k1'

import crypto from 'crypto'

let {createWalletFromMnemonic} = Tendermint





export default {


    generate:()=>{
        
        let mnemonic = mnemonicGenerate()

        let acc=createWalletFromMnemonic(mnemonic)

        return {mnemonic,address:acc.address,privatekey:Buffer.from(acc.privateKey).toString('hex'),publicKey:Buffer.from(acc.publicKey).toString('hex')}

    },


    sign:(data,privateKey)=>{

        let toSign=new Uint8Array(Buffer.from(crypto.createHash('sha256').update(data).digest('hex'),'hex')),

            signature=secp256k1.ecdsaSign(toSign,new Uint8Array(Buffer.from(privateKey,'hex')))

        signature.signature=Buffer.from(signature.signature).toString('base64')

        return signature

    },

    verify:(data,signature,publicKey)=>

        secp256k1.ecdsaVerify(
            
            new Uint8Array(Buffer.from(signature.signature,'base64')),
        
            new Uint8Array(Buffer.from(crypto.createHash('sha256').update(data).digest('hex'),'hex')),
        
            new Uint8Array(new Uint8Array(Buffer.from(publicKey,'hex')))
            
        )


}