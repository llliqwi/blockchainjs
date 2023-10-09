const BitcoinCore = require('bitcoin-core');

// Параметры подключения к Bitcoin Core JSON RPC
const bitcoinRpcConfig = {
    username: 'bitcoinuserliq',
    password: 'bitcoinsomepassliq',
    port: 18333, // Порт JSON RPC Bitcoin Core
    host: '127.0.0.1', // IP-адрес или хост, где запущен Bitcoin Core
    network: 'testnet', // testnet
};
//tb1qxk8reydle9mdtk0jh5u3yqd95vyrln8tumwhu4 получатель
//tb1qu5r82kfelzhxwfc20hg2ram6jvplxxnctcsac8 отпр
// Создаем экземпляр Bitcoin Core JSON RPC клиента
const client = new BitcoinCore(bitcoinRpcConfig);

// Адрес для которого вы хотим получить UTXO
const targetAddress = 'tb1qu5r82kfelzhxwfc20hg2ram6jvplxxnctcsac8';

// Функция для расчета суммы UTXO
async function calculateUTXOSum() {
    try {
        const utxos = await client.listUnspent();
        let totalAmount = 0;

        for (const utxo of utxos) {
            if (utxo.address === targetAddress) {
                totalAmount += utxo.amount;
            }
        }

        console.log(`Сумма неизрасходованных средств для адреса ${targetAddress}: ${totalAmount} BTC`);
    } catch (error) {
        console.error('Ошибка при получении UTXO:', error);
    }
}

calculateUTXOSum();
