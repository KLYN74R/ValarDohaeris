import {Account} from '@harmony-js/account'

import Harmony from '@harmony-js/crypto'





export default {


    generate:()=>{
            
        let acc=new Account()

        return {publicKey:acc.publicKey,privateKey:acc.privateKey,address:acc.address}

    },


    sign:(data,privateKey)=>Harmony.sign(`0x${Buffer.from(data,'utf-8').toString('hex')}`,privateKey),


    verify:(data,signature,pubKey)=>Harmony.verifySignature(`0x${Buffer.from(data,'utf-8').toString('hex')}`,signature,pubKey),


    toHarmonyFormat:address=>Harmony.toBech32(address)


}