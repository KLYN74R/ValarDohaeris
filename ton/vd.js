import crypto from 'crypto'
import tonweb from 'tonweb'




//KLYNTAR native format
//RFC8410 Ed25519 keypair with base58 encoded pubkey as address and 64 bytes base64 encoded signature
export let DA = {


    generate:()=>new Promise((resolve,reject)=>{
        
        crypto.generateKeyPair('ed25519',{
            
            publicKeyEncoding: {type:'spki',format:'der'},
            privateKeyEncoding: {type:'pkcs8',format:'der'}
         
        },async(err,publicKey,privateKey)=>{

            if(err) reject(falses)

            else{

                publicKey=publicKey.slice(12)

                privateKey=Buffer.concat([privateKey.slice(16),publicKey]).toString('hex')
                
                resolve(
                    
                    {
                        publicKey:publicKey.toString('hex'),
                        
                        privateKey,
                        
                        address:(await new tonweb().wallet.create({publicKey}).getAddress()).toString(true, true, true, false)
                    
                    }
                    
                )

            }

        })
      
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

let kp=await DA.generate()

console.log(kp)

console.log((await new tonweb().wallet.create({publicKey:Buffer.from(kp.publicKey,'hex')}).getAddress()).toString(true, true, true, false))