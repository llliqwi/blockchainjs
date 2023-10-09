const bitcoin = require('bitcoinjs-lib');
const TESTNET = bitcoin.networks.testnet;
const bip32 = require('bip32');

// Генерация ключей для пользователей 1 и 2
const user1 =
    bip32.fromBase58(
        '',
        TESTNET
    );
user1.network = TESTNET;
const user2 =
    bip32.fromBase58(
        '',
        TESTNET
    );
user2.network = TESTNET;

// Получение публичных ключей
const publicKey1 = user1.publicKey;
const publicKey2 = user2.publicKey;

// Создание мультиподписного адреса
const pubkeys = [publicKey1, publicKey2];
const p2ms = bitcoin.payments.p2ms({ m: 2, pubkeys, network: TESTNET });
const p2sh = bitcoin.payments.p2sh({ redeem: p2ms, network: TESTNET });

console.log('MultiSig Address:', p2sh.address);
