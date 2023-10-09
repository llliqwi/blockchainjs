const bitcoin = require('bitcoinjs-lib');
const network = bitcoin.networks.testnet;
const keyPair = bitcoin.ECPair.makeRandom({ network });
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
const privateKeyWIF = keyPair.toWIF();

console.log('Созданный адрес:', address);
console.log('WIF ключ:', privateKeyWIF);

//mgTcrM7HQNYcMCTeHoQyNVyE3LaYGUZcWB
//cQnxXt27DSJuus4jy9GCiwCyQpWuY1N32i8VL81dKW1e2Kfh9gf1

//kyda//tb1qhjs5fe5zydhtufdr8ywrc84prp8dayd284vfhp
