//privatekey
var keythereum = require("keythereum");
var datadir = "C:/ether";
var address= "";
const password = "";
var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));

//\