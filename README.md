![Alt Text](vd.gif)


<center> <h1>ValarDohaeris - all addresses must serve</h1> </center>
<center> <h3>Supports many formats of top cryptocurrencies to perform standart set of operations-generate, sign(any data), derive keys, make easy to transfer and so on🎅🏻</h3> </center>

## How to use

```js


//CRYPTO is klyntar,algorand,arweave,eos,eth_like,filecoin,harmony,helium,mina,polkadot,ripple,solana,stellar,zilliqa(unimplemented)
//TIP: Check the directories of package to get available formats or https://github.com/KLYN74R/ValarDohaeris

import VD from '@klyntar/valardohaeris/<CRYPTO>/vd.js'


//_______________________________ USE DEFAULT SETS OF FUNCTIONS _______________________________


let keys=await VD.generate()

console.log(keys)//Make sure format is OK

//Sign data in the string format
let data='SIGN ME',

    signature=await VD.sign(data,keys.privateKey)

console.log('Your signature in transportable format => ',signature)

console.log('Is ok => ',await VD.verify('ANOTHER DATA',signature,keys.address),` (should be ❌)`)

console.log('Is ok => ',await VD.verify(data,signature,keys.address),'(should be ✔️)')



//_______________________________ AND EXPLORE SPECIFIC FUNCTIONS _______________________________

console.log('Address in another format: ',VD.toPUB_K1(keys.address))


```