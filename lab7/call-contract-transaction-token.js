const fs = require("fs");
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3334"));
let source = fs.readFileSync("solc-output-token.json");
let contracts = JSON.parse(source)["contracts"];
let abi = JSON.parse(contracts["LQWToken.sol:LQWToken"].abi);
var myContract = new web3.eth.Contract(abi, '');
var amount = 1000;
var tokens = Web3.utils.toWei(amount.toString(), 'ether');
myContract.methods.transfer("", tokens).send({
    from: '',
    gas: 1000000,
    gasPrice: '3000000000'
})
    .on('transactionHash', function(hash){
        console.log("hash");
        console.log(hash);
    })
    .on('receipt', function(receipt){
        console.log("receipt");
        console.log(receipt);
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("confirmation");
        console.log(receipt);

        // Check the result.
        myContract.methods.balanceOf("").call()
            .then(console.log);
        myContract.methods.balanceOf("").call()
            .then(console.log);
    })
    .on('error', console.error);