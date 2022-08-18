import polkadot from '../polkadot/vd.js';



export default {

    generate:(mnemonic,bip44Path=`m/44'/434'/0'/0'`,mnemoPassword,ss58Format=2)=>polkadot.generate(mnemonic,bip44Path,mnemoPassword,ss58Format),

    sign:polkadot.sign,

    verify:polkadot.verify

}