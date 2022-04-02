

import {Seed,NetworkInfo,StakeCredential,BaseAddress,PublicKey} from 'cardano-wallet-js'




let GENERATE_SEED = wordsNumber => Seed.toMnemonicList(Seed.generateRecoveryPhrase(wordsNumber)),



seed=GENERATE_SEED()

console.log(`Seed is ${seed}`)




let privateKey = Seed.deriveRootKey(seed).to_raw_key()

console.log(`PrivateKey(in Bech32) is ${privateKey.to_bech32()}`)




let publicKey=privateKey.to_public(),

    //To include in transaction.It's publicKey in Bech32 encoding
    exportablePub=publicKey.to_bech32()

console.log(`PublicKey(in Bech32,so it's exportable version) is ${exportablePub}`)





let mainNetShelleyAddress=BaseAddress.new(NetworkInfo.mainnet().network_id(),StakeCredential.from_keyhash(publicKey.hash()),StakeCredential.from_keyhash(publicKey.hash()))

console.log('Mainnet Shelley address -> ',mainNetShelleyAddress.to_address().to_bech32())


let testNetShelleyAddress=BaseAddress.new(NetworkInfo.testnet().network_id(),StakeCredential.from_keyhash(publicKey.hash()),StakeCredential.from_keyhash(publicKey.hash()))

console.log('Testnet Shelley address -> ',testNetShelleyAddress.to_address().to_bech32())



//Sign
let message = 'Hello Vlad',

    signed = Seed.signMessage(privateKey,message)


console.log('SIGNATURE -> ',signed)

//Verify
let verify_result = Seed.verifyMessage(PublicKey.from_bech32(exportablePub), message, signed)

console.log('Is verified ? ',verify_result)



