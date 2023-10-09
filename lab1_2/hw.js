
const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
const TESTNET = bitcoin.networks.testnet;
const t = bip32.fromBase58('tprv8ZgxMBicQKsPexpQRwCKa2owTrJqV1k2vLW3UmGnrMDagbVEBxEvw72s1A6HG2TsjttVDSuEotRbnk1Pcw4g9CKKddWmH9rHS6RDvRcYgUa', TESTNET);

const derivedIndex = "m/44'/1'/0'/0/0";
const wifKey = t.derivePath(derivedIndex).toWIF();
const keyPair2 = bitcoin.ECPair.fromWIF(wifKey, TESTNET);
console.log('WIF_In=',keyPair2.toWIF())

const c = bip32.fromBase58('tprv8ZgxMBicQKsPdLtSqgzah2eJmUda7oejh495dDhvopGFqSjo9yCfkeTNwjvq4ArVjKyPdVn8ng7RTDMb47dFUW8k3nnzoii5HdCn6V8PYKK', TESTNET)
const wifKey2 = c.derivePath(derivedIndex).toWIF();
const keyPair = bitcoin.ECPair.fromWIF(wifKey2, TESTNET);
console.log('WIF_out=',keyPair.toWIF());
const {address} = bitcoin.payments.p2pkh({pubkey: keyPair.publicKey, network: bitcoin.networks.testnet})
console.log('Destination=',address)
