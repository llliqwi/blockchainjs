const fs = require("fs");
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3334"));

let source = fs.readFileSync("solc-output-token.json");
let contracts = JSON.parse(source)["contracts"];

let abi = JSON.parse(contracts["LQWToken.sol:LQWToken"].abi);

let code = '0x' + contracts["LQWToken.sol:LQWToken"].bin;
var myContract = new web3.eth.Contract(abi);
myContract.deploy({
    data: code,
    arguments: [1000000]
})
    .send({
        from: '',
        gas: 1000000,
        gasPrice: '3000000000'
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



//0x81063bfF4a9c4039ADeFB59121392aeFC29698FE