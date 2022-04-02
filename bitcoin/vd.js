
import bitcore from 'bitcore-lib'//BTC

//import dashcore from '@dashevo/dashcore-lib'//DASH
//import bitdoge from 'bitcore-doge-lib'//DOGE
//import bitlite from 'litecore-lib'//LTC
//import bitcash from 'bitcore-lib-cash'
//import qtum from 'qtumcore-lib'//https://github.com/qtumproject/qtumcore-lib/blob/master/docs/examples.md


let privateKey = bitcore.PrivateKey('fee0a1f7afebf9d2a5a80c0c98a31c709681cce195cbcd06342b517970c0be1e'),
    
    toSign = Buffer.from('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','hex'),
    
    ecdsa = new bitcore.crypto.ECDSA()

console.log(toSign.length)

ecdsa.hashbuf = toSign
ecdsa.privkey = privateKey
ecdsa.pubkey = privateKey.toPublicKey()
ecdsa.deterministicK()

//Make exportable
let stringSig=Buffer.from(ecdsa.sign().sig.toDER()).toString('base64'),publicKey=privateKey.toPublicKey()

console.log(toSign)
console.log('SIGNATURE is ->',stringSig)

console.log(ecdsa.verify(toSign,bitcore.crypto.Signature.parseDER(Buffer.from(stringSig,'base64'),publicKey)).verified)//should be true

//Print different type of addresses from publicKey
console.log(publicKey.toAddress('testnet','witnesspubkeyhash').toString())
console.log(publicKey.toAddress('testnet','pubkeyhash').toString())
console.log(publicKey.toAddress('testnet','scripthash').toString())



//Retrieved PUB keys

console.log('PUB ',publicKey.toString())

let retrievedPublic=bitcore.PublicKey(publicKey.toString())

console.log('Retrieved pub is ',retrievedPublic)


