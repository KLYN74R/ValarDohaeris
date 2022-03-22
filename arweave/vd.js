import Arweave from 'arweave'

let arweave = Arweave.init({})






export default {

    generate:()=>arweave.wallets.generate(),

    //JWK-just pass keypair here
    sign:(data,JWK)=>Arweave.crypto.sign(JWK,new Uint8Array(Buffer.from(data,'utf-8'))).then(sig=>sig.toString('base64')),

    verify:(data,signature,JWK_n)=>
        
        Arweave.crypto.verify(JWK_n,  new Uint8Array(Buffer.from(data,'utf-8')),  new Uint8Array(Buffer.from(signature,'base64'))),

    getAddress:JWK=>arweave.wallets.jwkToAddress(JWK)


}