import Web3 from 'web3'

let web3=new Web3()


//For EVM chains which supports such format
//!Change output data(minimization)
//ECDSA (secp256k1 curve) with 32 bytes private key
export default {
    
    generate:()=>{
        
        let {address,privateKey}=web3.eth.accounts.create()
        
        return {address,privateKey}
    
    },
    
    sign:(data,privateKey)=>web3.eth.accounts.sign(data,privateKey),
    
    verify:(signature,address)=>web3.eth.accounts.recover(signature)===address

}