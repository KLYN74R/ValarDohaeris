import Solana from '@solana/web3.js'
import Base58 from 'base-58'
import nacl from 'tweetnacl'
import bip39 from 'bip39'




export default {


    generate:async(type,mnemonicOrPrivateKey,mnemoPassword)=>{

        let pair, branch=true

        if(type==='FROM_PRIVATE_KEY'){

            //64-bytes base58 encoded privatekey(Phantom format)
            pair = Solana.Keypair.fromSecretKey(Base58.decode(mnemonicOrPrivateKey))

        }else{

            //Otherwise - generate from mnemonic folliwing BIP
            mnemonicOrPrivateKey ||=bip39.generateMnemonic()

            let seed = bip39.mnemonicToSeedSync(mnemonicOrPrivateKey,mnemoPassword)
    
            pair = Solana.Keypair.fromSeed(seed.slice(0,32))

            branch = false

        }

        console.log('Private Key',pair)


        return {
            
            privateKey: Base58.encode(pair.secretKey),

            address:pair.publicKey.toBase58(),

            mnemonic:branch && mnemonicOrPrivateKey //if it was generation via mnemonic - return it,otherwise no sense to return duplicate of privatekey
        
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