

//geth --dev --datadir "C:\ether" --http --http.addr localhost --http.port 3334 --http.api personal,eth,net,web3,web3b

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3334"));

//web3.eth.getAccounts().then(console.log);

//web3.eth.personal.newAccount().then(console.log);

web3.eth.getBalance('').then(console.log);

//web3.eth.personal.newAccount("123").then(console.log);


// web3.eth.sendTransaction({from: '',
//     to: '',
//     value: 500000000000000000}).then(console.log);


// const keystore = ''
//
// const decryptedAccount = web3.eth.accounts.decrypt(keystore, '12345');
//
// const rawTransaction = {
//     "from": "", 
//     "to": "", 
//     "value": web3.utils.toHex(web3.utils.toWei("0.5", "ether")),
//     "gas": 21000, 
//     "chainId": 1337 
// };
//
// decryptedAccount.signTransaction(rawTransaction)
//     .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
//     .then(receipt => console.log("Transaction receipt: ", receipt))
//     .catch(err => console.error(err));