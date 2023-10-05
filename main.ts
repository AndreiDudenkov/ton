import {mnemonicToWalletKey} from 'ton-crypto';
import {fromNano, internal, TonClient, WalletContractV4} from 'ton';
import {getHttpEndpoint} from '@orbs-network/ton-access';


async function main (){
const mnemonic = "filter under" // add your key

 const  key = await mnemonicToWalletKey(mnemonic.split(' '))
 const wallet = WalletContractV4.create({publicKey: key.publicKey, workchain: 0})

 const endpoint = await getHttpEndpoint({network: 'testnet'})
 const client = new TonClient({endpoint})



 if(!await client.isContractDeployed(wallet.address)){
  return console.log('wallet is not deployed')
 }
 console.log('wallet is deployed - ' + wallet.address)

 const balance = await client.getBalance(wallet.address)
 console.log('balance ' + fromNano(balance) )

 // const walletContract = client.open(wallet)
 // const seqno = await walletContract.getSeqno()
 //
 // await walletContract.sendTransfer({
 //  secretKey: key.secretKey,
 //  seqno: seqno,
 //  messages: [
 //      internal({
 //       to: 'EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e',
 //       value: '0.05',
 //       body: 'Hello',
 //       bounce: false
 //      })
 //  ]
 // })
 // let currentSeqno = seqno
 // while (currentSeqno == seqno){
 //  console.log('waiting for transaction confirm...')
 //  await sleep(1500)
 //  currentSeqno = await walletContract.getSeqno()
 // }
 // console.log('transaction confirmed!')
}

// EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e
main()

function sleep (ms:number) {
 return new Promise(resolve => setTimeout(resolve, ms))
}


