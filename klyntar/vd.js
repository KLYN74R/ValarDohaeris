import Base58 from 'base-58'
import crypto from 'crypto'


//KLYNTAR native format
//RFC8410 Ed25519 keypair with base58 encoded pubkey as address and 64 bytes base64 encoded signature
export default {


    generate:()=>new Promise((resolve,reject)=>{
        
        crypto.generateKeyPair('ed25519',{
            
            publicKeyEncoding: {type:'spki',format:'der'},
            privateKeyEncoding: {type:'pkcs8',format:'der'}
         
        },(err,publicKey,privateKey)=>
        
            err
            ?
            reject(false)
            :
            resolve(
              {
      
                publicKey:Base58.encode(publicKey).slice(16),//if hex(Common-302a300506032b6570032100) slice(16) if base64(Common-MCowBQYDK2VwAyEA)  GfHq2tTVk9z4eXgy-for BASE58
      
                privateKey:privateKey.toString('base64')//if hex(Common-302e020100300506032b657004220420) slice(21) if base64(Common-MC4CAQAwBQYDK2VwBCIEI)
              
              }
            
            )
        
          )
      
    }).catch(e=>false),



    sign:(data,privateKey)=>new Promise((resolve,reject)=>
        
        crypto.sign(null,Buffer.from(data),'-----BEGIN PRIVATE KEY-----\n'+privateKey+'\n-----END PRIVATE KEY-----',(e,sig)=>
    
            e?reject(''):resolve(sig.toString('base64'))

        )

    ).catch(e=>''),

       

    verify:(data,signature,pubKey)=>new Promise((resolve,reject)=>
       
        //Add mandatory prefix and postfix to pubkey
        crypto.verify(null,data,'-----BEGIN PUBLIC KEY-----\n'+Buffer.from(Base58.decode('GfHq2tTVk9z4eXgy'+pubKey)).toString('base64')+'\n-----END PUBLIC KEY-----',Buffer.from(signature,'base64'),(err,res)=>

            err?reject(false):resolve(res)

        )

    ).catch(e=>false)
    

}

