import {derivePath} from 'ed25519-hd-key'
import Base58 from 'base-58'
import nacl from 'tweetnacl'
import crypto from 'crypto'
import bip39 from 'bip39'



//KLYNTAR native format with BIP44 support
//RFC8410 Ed25519 keypair with base58 encoded pubkey as address and 64 bytes base64 encoded signature
export default {


    generate:async(mnemonic,bip44Path,mnemoPass)=>{

        mnemonic ||= bip39.generateMnemonic()

        bip44Path ||=`m/44'/7331'/0'/0'`


        let seed = await bip39.mnemonicToSeed(mnemonic,mnemoPass)

        let keypair=nacl.sign.keyPair.fromSeed(derivePath(bip44Path,seed.slice(0,32)).key)


        keypair.secretKey=keypair.secretKey.slice(0,32)
        
        keypair.secretKey=Buffer.concat([Buffer.from('302e020100300506032b657004220420','hex'),Buffer.from(keypair.secretKey)]).toString('base64')


        return {

            mnemonic,

            bip44Path,
      
            pub:Base58.encode(keypair.publicKey),
      
            prv:keypair.secretKey
       
        }
    
    },

    
    sign:(data,privateKey)=>new Promise((resolve,reject)=>
        
        crypto.sign(null,Buffer.from(data),'-----BEGIN PRIVATE KEY-----\n'+privateKey+'\n-----END PRIVATE KEY-----',(e,sig)=>
    
            e?reject(''):resolve(sig.toString('base64'))

        )

    ).catch(e=>''),

       

    verify:(data,signature,pubKey)=>new Promise((resolve,reject)=>
       
        //Add mandatory prefix and postfix to pubkey
        crypto.verify(null,data,'-----BEGIN PUBLIC KEY-----\n'+Buffer.from('302a300506032b6570032100'+Buffer.from(Base58.decode(pubKey)).toString('hex'),'hex').toString('base64')+'\n-----END PUBLIC KEY-----',Buffer.from(signature,'base64'),(err,res)=>

            err?reject(false):resolve(res)

        )

    ).catch(e=>false)
    

}