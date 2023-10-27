
const fs = require("fs");
const Web3 = require('web3');


const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3334"));
const decryptedAccount = web3.eth.accounts.privateKeyToAccount('');
let source = fs.readFileSync("solc-output.json");
let contracts = JSON.parse(source)["contracts"];

let abi = JSON.parse(contracts["Greeter.sol:Greeter"].abi);
var myContract = new web3.eth.Contract(abi, '');

const mydata = myContract.methods.setGreeting("BL9db!").encodeABI();


const rawTransaction = {
    "from": "",
    "to": "",
    "value": "0x00",
    "gas": 400000,
    "chainId": 1337,
    "data": mydata
};
decryptedAccount.signTransaction(rawTransaction)
    .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
    .then(receipt => console.log("Transaction receipt: ", receipt))
    .catch(err => console.error(err));
