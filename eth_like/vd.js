import ethers from 'ethers'

import Web3 from 'web3'

let web3=new Web3()



//For EVM chains which supports such format
//!Change output data(minimization)
//ECDSA (secp256k1 curve) with 32 bytes private key
export default {
    
    generate:(mnemoPhrase,path,wordlist)=>{

        if(!mnemoPhrase){

            let {address,privateKey,publicKey,mnemonic} = ethers.Wallet.createRandom()
        
            return {address,privateKey,publicKey,mnemonic}
    
        }else{

            let {address,privateKey,publicKey,mnemonic} = ethers.Wallet.fromMnemonic(mnemoPhrase,path,wordlist);

            return {address,privateKey,publicKey,mnemonic}
            
        }
            
    },
    
    sign:(data,privateKey)=>web3.eth.accounts.sign(data,privateKey),
    
    verify:(_,signature,address)=>{

        signature = JSON.parse(signature)

        return web3.eth.accounts.recover(signature)===address
    }

}