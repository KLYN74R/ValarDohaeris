import polkadot from '../polkadot/vd.js';



export default {

    generate:(mnemonic,bip44Path,mnemoPassword,ss58Format)=>{

        bip44Path ||=`m/44'/434'/0'/0'`
        
        return polkadot.generate(mnemonic,bip44Path,mnemoPassword,2)

    },

    sign:polkadot.sign,

    verify:polkadot.verify

}