import Client from "mina-signer"

const client = new Client({ network:"mainnet"})


export default {


    generate:()=>client.genKeys(),

    sign:(data,keyPair)=>{
    
        let unoptimizedSigna=client.signMessage(data,keyPair)

        return unoptimizedSigna.signature.signature
    
    },

    verify:(string,signature,signer)=>{

        let deriveSig={

            signature:{string,signer,signature},
            
            data:{publicKey:signer, message:string}
        
        }

        return client.verifyMessage(deriveSig)

    }


}