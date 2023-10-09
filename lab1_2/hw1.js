const bitcoin = require('bitcoinjs-lib');
const axios = require('axios');

// Выбираем сеть (testnet)
const network = bitcoin.networks.testnet;

// Приватный ключ в формате WIF (созданный вами ранее)
const privateKeyWIF = 'YOUR_PRIVATE_KEY_WIF';

// Адрес, с которого вы хотите отправить BTC
const fromAddress = 'cQnxXt27DSJuus4jy9GCiwCyQpWuY1N32i8VL81dKW1e2Kfh9gf1';

// Адрес, на который вы хотите отправить BTC
const toAddress = 'tb1qhjs5fe5zydhtufdr8ywrc84prp8dayd284vfhp';

// Загружаем данные о неизученных транзакциях (UTXO) для адреса отправителя с помощью BlockCypher API
axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${fromAddress}?unspentOnly=true`)
    .then(response => {
        const utxos = response.data.txrefs;

        const txb = new bitcoin.TransactionBuilder(network);

        // Добавляем входы (UTXO) в транзакцию
        utxos.forEach(utxo => {
            txb.addInput(utxo.tx_hash, utxo.tx_output_n);
        });

        // Вычисляем комиссию (fee) исходя из размера транзакции
        const fee = 250; // Здесь вы можете задать необходимую комиссию в сатоши

        // Добавляем выход (output) для получателя
        txb.addOutput(toAddress, 10000); // 0.0001 BTC

        // Возвращаем остаток на адрес отправителя (change address)
        const changeAmount = utxos.reduce((acc, utxo) => acc + utxo.value, 0) - fee - 10000; // Учитываем fee и выход для получателя
        txb.addOutput(fromAddress, changeAmount);

        // Подписываем транзакцию с помощью приватного ключа
        const keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF, network);
        utxos.forEach((utxo, index) => {
            txb.sign(index, keyPair);
        });

        // Получаем сериализованную транзакцию
        const rawTx = txb.build().toHex();
        console.log('Сериализованная транзакция:', rawTx);

        // Отправляем транзакцию через BlockCypher API
        axios.post(`https://api.blockcypher.com/v1/btc/test3/txs/push`, { tx: rawTx })
            .then(response => {
                console.log('Транзакция успешно отправлена:', response.data);
            })
            .catch(error => {
                console.error('Ошибка отправки транзакции:', error);
            });
    })
    .catch(error => {
        console.error('Ошибка получения UTXO:', error);
    });
