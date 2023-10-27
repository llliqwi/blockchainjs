const fs = require("fs");
const Web3 = require('web3');


const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3334"));

let source = fs.readFileSync("solc-output.json");
let contracts = JSON.parse(source)["contracts"];

let abi = JSON.parse(contracts["Greeter.sol:Greeter"].abi);
var myContract = new web3.eth.Contract(abi, '');


    myContract.methods.greet().call()
    .then(console.log);





