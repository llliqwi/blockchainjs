const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');

const TESTNET = bitcoin.networks.testnet;

// Получить WIF из основного расширенного приватного ключа, экспортированного из Copay (отправителя)
const t = bip32.fromBase58('xprv9s21ZrQH143K3pVh6sUWVMUkgt1zd5LfzVaiFSNA9Nm7a89vuYxMubi6r2k3MLzospkSEyh59JAgfVw6TM4YvjCMNPcuRw2MkmEqsnzTSAz');
t.network = TESTNET; // трюк для преобразования ключевой пары mainnet в testnet

// BIP44 (Иерархический определенный кошелек) путь, bitcoin testnet, аккаунт 0, внешний адрес
const derivedIndex = "m/44'/1'/0'/0/0";
const wifKey = t.derivePath(derivedIndex).toWIF();
const keyPair = bitcoin.ECPair.fromWIF(wifKey, TESTNET);

//Получить ваш адрес
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: TESTNET });

// Создать транзакцию
var tx = new bitcoin.TransactionBuilder(TESTNET);

//(кто платит)
var txId = '78f771b024fccc8834263437bf3c5de4979fc84c439191789296bb3ff366e076\n';
tx.addInput(txId, 0);

//Определить адрес получателя и сумму (в сатоши)
const payeeAddress = "mm67pNwbvjgsL661gyVjVzEhQw1dQFvm36";
const amountToSend = 0.0001 * 100000000; // 0.00005 BTC в сатоши

// Рассчет комиссию
const fee = 90000; // Комиссия в сатоши

//Сумма сдачи
const totalInput = 0.001 * 100000000; // Общая сумма входа в сатоши
const changeAmount = totalInput - amountToSend - fee;

//Выход для получателя
tx.addOutput(payeeAddress, amountToSend);

//Выход для возврата сдачи на ваш адрес
tx.addOutput(address, changeAmount);

//Подпись вход с использованием импортированного ключа
tx.sign(0, keyPair);

//Сериализованная транзакцию в шестнадцатеричном формате
console.log(tx.build().toHex());
