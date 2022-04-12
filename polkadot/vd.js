import{encodeAddress} from '@polkadot/util-crypto'


//Ed25519(native)
//Signature is base64 encoded
export default{

    generate:()=>new Promise((resolve,reject)=>{
        
        crypto.generateKeyPair('ed25519',{
            
            publicKeyEncoding: {type:'spki',format:'der'},
            privateKeyEncoding: {type:'pkcs8',format:'der'}
         
        },(err,publicKey,privateKey)=>{
    
            if(err) reject(false)
            
            else {
    
                publicKey=new Uint8Array(publicKey.slice(12))//if hex(Common-302a300506032b6570032100) slice(16) if base64(Common-MCowBQYDK2VwAyEA)  GfHq2tTVk9z4eXgy-for BASE58
    
                privateKey=privateKey.toString('hex')       
    
                resolve({polkaAddress:encodeAddress(publicKey),publicKey:publicKey.toString('hex'),privateKey})
    
            }
    
        })
    
    }).catch(_e=>false),


    sign:(data,hexPrivateKey)=>new Promise((resolve,reject)=>
        
        crypto.sign(null,Buffer.from(data),'-----BEGIN PRIVATE KEY-----\n'+Buffer.from(hexPrivateKey,'hex').toString('base64')+'\n-----END PRIVATE KEY-----',(e,sig)=>
    
            e?reject(''):resolve(sig.toString('base64'))

        )

    ).catch(_e=>''),

       

    verify:(data,signature,polkaAddress)=>new Promise((resolve,reject)=>
       
        //Add mandatory prefix and postfix to pubkey
        crypto.verify(null,data,'-----BEGIN PUBLIC KEY-----\n'+Buffer.concat([Buffer.from('302a300506032b6570032100','hex'),decodeAddress(polkaAddress,0)]).toString('base64')+'\n-----END PUBLIC KEY-----',Buffer.from(signature,'base64'),(err,res)=>

            err?reject(false):resolve(res)

        )
    
    ).catch(_e=>false),


    toKusama:hexPubKey=>encodeAddress(Buffer.from(hexPubKey,'hex'),2),

    toSubstrate:hexPubKey=>encodeAddress(Buffer.from(hexPubKey,'hex'),42),

    toPolkadot:hexPubKey=>encodeAddress(Buffer.from(hexPubKey,'hex'),0),

}