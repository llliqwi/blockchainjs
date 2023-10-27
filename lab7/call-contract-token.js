const fs = require("fs");
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3334"));

let source = fs.readFileSync("solc-output-token.json");
let contracts = JSON.parse(source)["contracts"];

let abi = JSON.parse(contracts["LQWToken.sol:LQWToken"].abi);
var myContract = new web3.eth.Contract(abi, '');
// Pass address of the contract owner.
// Will output 1000000.
myContract.methods.balanceOf("").call()
    .then(console.log);