
// import TronWeb from 'tronweb'


// let CREDS={
//     privateKey: '41610297BA050137F45F919FAD61D43EBFDBD4B16DC586B06F7DAD31C356ECE2',
//     publicKey: '04215BE43E8710C304A0BC0A0787EF0CD4091AD808F87C5610A4D3441EA8E6AB808CD2768950BA04B7092B55146896D087D54DC5F760AFECCF8232EC9808D06A1C',
//     address: {
//       base58: 'TYbafGYcJ9t21jZ85kTHavPH9JykdVWavE',
//       hex: '41F833D25BEC13C2054EFAB38A00859CE18E278BB1'
//     }
//   }


// let HttpProvider = TronWeb.providers.HttpProvider,
//     fullNode = new HttpProvider("https://api.shasta.trongrid.io"),
//     solidityNode = new HttpProvider("https://api.shasta.trongrid.io"),
//     eventServer = new HttpProvider("https://api.shasta.trongrid.io"),

//     tronWeb = new TronWeb(fullNode, solidityNode, eventServer, CREDS.privateKey),

//     sig=await tronWeb.trx.sign('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),

//     verify=await tronWeb.trx.verifyMessage('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',sig,CREDS.address.base58)
    


// console.log(sig)
// console.log(verify)


// ////////////////////////////////////////////// Verify WITHOUT host DEPENDECY //////////////////////////////////////

// import pkg from 'tronweb';
// const {Trx} = pkg;


// let CREDS={
//     privateKey: '41610297BA050137F45F919FAD61D43EBFDBD4B16DC586B06F7DAD31C356ECE2',
//     publicKey: '04215BE43E8710C304A0BC0A0787EF0CD4091AD808F87C5610A4D3441EA8E6AB808CD2768950BA04B7092B55146896D087D54DC5F760AFECCF8232EC9808D06A1C',
//     address: {
//       base58: 'TYbafGYcJ9t21jZ85kTHavPH9JykdVWavE',
//       hex: '41F833D25BEC13C2054EFAB38A00859CE18E278BB1'
//     }
//   }


// console.log(Trx.verifySignature('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',CREDS.address.base58,'0x47a37c9bd006a5ccc8ca01d4097ed5adc442af06dc4574b1b88ed767cc20fd26099df145c80a40e118bc6cf4a2054a635cfe6df2820c26cd52eb74ff2b9307ef1c'));


