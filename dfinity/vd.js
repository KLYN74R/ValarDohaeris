import crypto from 'crypto'



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
      
                address:publicKey.slice(12).toString('hex'),
      
                privateKey:privateKey.toString('base64')
              
              }
            
            )
        
          )
      
    }).catch(e=>false),



    sign:(data,privateKey)=>new Promise((resolve,reject)=>
        
        crypto.sign(null,Buffer.from(data),'-----BEGIN PRIVATE KEY-----\n'+privateKey+'\n-----END PRIVATE KEY-----',(e,sig)=>
    
            e?reject(''):resolve(sig.toString('base64'))

        )

    ).catch(e=>''),

       

    verify:(data,signature,address)=>new Promise((resolve,reject)=>
       
        //Add mandatory prefix and postfix to pubkey
        crypto.verify(null,data,'-----BEGIN PUBLIC KEY-----\n'+Buffer.from('302a300506032b6570032100'+address,'hex').toString('base64')+'\n-----END PUBLIC KEY-----',Buffer.from(signature,'base64'),(err,res)=>

            err?reject(false):resolve(res)

        )

    ).catch(e=>false)
    

}