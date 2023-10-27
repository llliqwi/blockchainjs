const fs = require("fs");
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3334"));

let source = fs.readFileSync("solc-output.json");
let contracts = JSON.parse(source)["contracts"];

let abi = JSON.parse(contracts["Greeter.sol:Greeter"].abi);

let code = '0x' + contracts["Greeter.sol:Greeter"].bin;
var myContract = new web3.eth.Contract(abi);
myContract.deploy({
    data: code,
    
})
    .send({
        from: '', 
        gas: 10000000, 
        gasPrice: '30000000000' 
    }, function(error, transactionHash){ })
    .on('error', function(error){ })
    .on('transactionHash', function(transactionHash){ })
    .on('receipt', function(receipt){
        console.log(receipt.contractAddress) 
    })
    .on('confirmation', function(confirmationNumber, receipt){ })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) 
    });