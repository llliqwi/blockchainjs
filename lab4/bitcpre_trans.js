const request = require('request-promise-native');
const rpcUser = 'bitcoinuserliq';
const rpcPassword = 'bitcoinsomepassliq';
const rpcUrl = 'http://127.0.0.1:18333';
async function createRawTransaction() {
    const inputs = [
        {
            txid: '7f4b4f19b72e7410c0026f2c61ce174d841e3e3b75bcc12a09f55b91767d97d7',
            vout: 0,
        },
    ];
    const outputs = {
        'tb1qxk8reydle9mdtk0jh5u3yqd95vyrln8tumwhu4': 0.00005,
    };
    const rawTransaction = await rpcRequest('createrawtransaction', [inputs, outputs]);
    console.log('Raw Transaction:', rawTransaction);
    return rawTransaction;
}
async function signRawTransaction(rawTransaction) {
    const signedTransaction = await rpcRequest('signrawtransactionwithwallet', [rawTransaction]);
    console.log('Signed Transaction:', signedTransaction);
    return signedTransaction.hex;
}
async function broadcastTransaction(signedTransaction) {
    const txid = await rpcRequest('sendrawtransaction', [signedTransaction]);
    console.log('Transaction ID:', txid);
}
async function rpcRequest(method, params) {
    const data = JSON.stringify({ method, params });
    const options = {
        method: 'POST',
        uri: rpcUrl,
        auth: {
            user: rpcUser,
            pass: rpcPassword,
        },
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    };

    try {
        const response = await request(options);
        const result = JSON.parse(response);
        if (result.error) {
            throw new Error(result.error.message || 'RPC request failed');
        }
        return result.result;
    } catch (error) {
        throw error;
    }
}
async function main() {
    try {
        const rawTransaction = await createRawTransaction();
        const signedTransaction = await signRawTransaction(rawTransaction);
        await broadcastTransaction(signedTransaction);
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}
main();
