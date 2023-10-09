const bitcoin = require('bitcoinjs-lib');
const TESTNET = bitcoin.networks.testnet;
const bip32 = require('bip32');

// Генерация ключей для пользователей 1 и 2
const user1 =
    bip32.fromBase58(
        'tprv8ZgxMBicQKsPedjDmSL1f16k11SCrbNgL3Vq7rncdMFbMiu1tvJ7RM5YmCuhMiP8FGHDF5JqJekV8MUqaZQVjnTwu2qD6HkQfrzGKYCWKNy',
        TESTNET
    );
user1.network = TESTNET;
const user2 =
    bip32.fromBase58(
        'tprv8ZgxMBicQKsPdBakawX7RQR2T2dNV5cG4BcvZ8ETEdvhgV1j4mjhTsgxoRxHXDea6V4v2JjnTPnMmhCiFH5MWRwJ2yXj9B64y3o1nJB6yyJ',
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
//2N2Zz4jQN1YVKFQNJx7sLyXooYFF4BxERs7
const txid = 'd946c22a8fe8e3f29afc0bacfb8eef9cdb0e81b0ca568b535ff29e3cef754f1f'; // Замена на реальный TXID

const txb = new bitcoin.TransactionBuilder(TESTNET);
txb.addInput(txid, 0); // Входные данные (TXID и индекс)
txb.addOutput('mm67pNwbvjgsL661gyVjVzEhQw1dQFvm36', 1000); // Адрес получателя и сумма
txb.sign(0, user1, p2sh.redeem.output); // Подпись пользователя 1
txb.sign(0, user2, p2sh.redeem.output); // Подпись пользователя 2

const rawTx = txb.build().toHex();
console.log('Signed Transaction:', rawTx);

