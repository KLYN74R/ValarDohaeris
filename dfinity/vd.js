

import { randomBytes } from "crypto"

import {
    
    key_new,
    key_to_pub_key,
    pub_key_to_address,
    address_from_hex,
    address_to_hex

} from "@dfinity/rosetta-client"



//Derive an ED25519 private key from a system random seed. The private key's .Type is Buffer.
let privateKey = key_new();

console.log('0st private is ',privateKey)


//Derive an ED25519 private key from a user-specified 32-byte random seed.
let seed = Buffer.from('oO4QwGmoWBYwV9vYWStLN/QzyO7qzHcjq2Cx6MSULqg=','base64')//randomBytes(32);

privateKey = key_new(seed);


console.log('Seed is ',seed)
console.log('Seed in exportable ',seed.toString('base64'))

console.log('1st private is ',privateKey.byteLength)

//Probably via tweetnacl
let publicKey = key_to_pub_key(privateKey);

console.log('Pub is ',publicKey)

let address = pub_key_to_address(publicKey);

console.log('Address is ',address_to_hex(address))


console.log('Size of private is ',privateKey.byteLength,' and size of public is ',publicKey.byteLength)

console.log('UINT PUB',new Uint8Array(publicKey))

console.log('UINT PRV',new Uint8Array(privateKey))





// Sig/Verify via Tweetnacl


import nacl from 'tweetnacl'

let message=new Uint8Array(Buffer.from('DFINITY / ICP'))

let sig=nacl.sign.detached( message,new Uint8Array(privateKey))

console.log('Sig is ',Buffer.from(sig).toString('base64'))

let verify=nacl.sign.detached.verify(message, sig, new Uint8Array(publicKey))

console.log('Verified -> ',verify)


