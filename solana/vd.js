import {derivePath} from 'ed25519-hd-key'
import Solana from '@solana/web3.js'
import Base58 from 'base-58'
import nacl from 'tweetnacl'
import bip39 from 'bip39'




export default {


    generate:async(type,mnemonicOrPrivateKey,bip44Path,mnemoPassword)=>{

        let pair, branch=false

        if(type==='FROM_PRIVATE_KEY'){

            //64-bytes base58 encoded privatekey(Phantom format)
            pair = Solana.Keypair.fromSecretKey(Base58.decode(mnemonicOrPrivateKey))

        }else{

            //Otherwise - generate from mnemonic folliwing BIP44
            //! BIP44 path has the following format for Solana ===> m/44'/501'/<INDEX>'/0'

            mnemonicOrPrivateKey ||=bip39.generateMnemonic()

            bip44Path ||=`m/44'/501'/0'/0'`


            let seed = bip39.mnemonicToSeedSync(mnemonicOrPrivateKey,mnemoPassword)
    
            pair = Solana.Keypair.fromSeed(derivePath(bip44Path,seed.slice(0,32)).key)

            branch = true

        }


        return {
            
            privateKey: Base58.encode(pair.secretKey),

            address:pair.publicKey.toBase58(),

            mnemonic:branch && mnemonicOrPrivateKey, //if it was generation via mnemonic - return it,otherwise no sense to return duplicate of privatekey
        
            bip44Path:branch && bip44Path

        }
    
    },


    sign:(data,privateKey)=>Buffer.from(
        
        nacl.sign.detached(
            
            new Uint8Array(Buffer.from(data,'utf-8')),
            
            Base58.decode(privateKey)
            
        )
            
        
    ).toString('base64'),


    verify:(data,signature,address)=>
    
        nacl.sign.detached.verify(
            
            new Uint8Array(Buffer.from(data,'utf-8')),
            new Uint8Array(Buffer.from(signature,'base64')),
            Base58.decode(address)
            
        )


}