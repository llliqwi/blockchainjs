const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
// Фраза из 12 слов
const mnemonic = '';
// Определите сеть (testnet)
const network = bitcoin.networks.testnet;
// Создайте seed из мнемонической фразы
const seed = bip39.mnemonicToSeedSync(mnemonic);
// Создание master node (root ключ) из seed
const masterNode = bitcoin.bip32.fromSeed(seed, network);
// Получите tprv
const tprv = masterNode.toBase58();
console.log('tprv:', tprv);
