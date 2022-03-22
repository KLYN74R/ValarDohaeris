import Helium from '@helium/crypto'
import nacl from 'tweetnacl'




let {Keypair:HeliumKeypair,Address} = Helium


export default {

    generate:async()=>{
            
        let kp=await HeliumKeypair.makeRandom()

        return {publicKey:Buffer.from(kp.publicKey).toString('base64'),privateKey:Buffer.from(kp.privateKey).toString('base64'),address:kp.address.b58}

    },

    sign:(data,privateKey)=>
    
        Buffer.from(
            
            nacl.sign.detached(new Uint8Array(Buffer.from(data)),new Uint8Array(Buffer.from(privateKey,'base64')))
            
        ).toString('base64'),




    verify:(data,signature,address)=>
    
        nacl.sign.detached.verify(
            
            new Uint8Array(Buffer.from(data)),new Uint8Array(Buffer.from(signature,'base64')), new Uint8Array( Address.fromB58(address).publicKey )
            
        ),


}