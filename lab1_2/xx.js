const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
const bip39 = require('bip39');
const TESTNET = bitcoin.networks.testnet;

// Задайте вашу мнемоническую фразу
const mnemonic = 'mammal jaguar garbage winner foster pond brown hamster latin toy sort blossom'; // Замените на вашу мнемоническую фразу

// Определите пароль (если необходимо)
const password = ''; // Оставьте пустым, если пароль не используется

// Создайте seed из мнемонической фразы и пароля (если есть)
const seed = bip39.mnemonicToSeedSync(mnemonic, password);

// Создайте расширенный ключ для тестовой сети (Testnet)
const masterNode = bip32.fromSeed(seed, TESTNET);
const xprvTestnet = masterNode.toBase58();

console.log(`xprv Testnet: ${xprvTestnet}`);
