const bitcoin = require('bitcoinjs-lib')
const bip32 = require('bip32')
const TESTNET = bitcoin.networks.testnet
// Get WIF from mainnet extended private key exported from recent Copay (sender)
const t =
    bip32.fromBase58('xprv9s21ZrQH143K49asmNLpQPBx9itdFVi2anavcLrLNNj6tzk9CauBRMfR5yvdFf5ZNTMiDMHUeXqoKtTeViijL93j6zJTco8EWzfoUhs8A1K');
t.network = TESTNET; // trick to transform mainnet key pair to testnet
// BIP44 (Hierarchical Deterministic Wallet) path, bitcoin testnet, account 0, external address
// See https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
// m / purpose' / coin_type' / account' / change / address_index
// coin_type = 1 for testnet, 0 for mainnet
// set change = 1 for change address
// address_index starts from 0 and up
const derivedIndex = "m/44'/1'/0'/0/7"; // Tricky part is to calculate last parameter (4) to correspond to derived address.
const wifKey = t.derivePath(derivedIndex).toWIF();
const keyPair = bitcoin.ECPair.fromWIF(wifKey, TESTNET); // Sign transaction with this key.
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: TESTNET });
console.log(address); // Check that address is correctly derrived and corresponds to what you see in Copay receiving transaction.
// Craft transaction.
var tx = new bitcoin.TransactionBuilder(TESTNET);
// Add the input (who is paying):
// [previous transaction hash, index of the output to use]
var txId = 'de7353d4ea86a4a14108ca479160067720b3ae0caef0da40e97f978f3184624c'
tx.addInput(txId, 0);
// Add the output (who to pay to):
// [payee's address, amount in satoshis, 1 bitcoin = 100 000 000 satoshis]
tx.addOutput("tb1qs8pkaudu58mqvnyzylxj0antmrt6hs232456e4", 0.00025 * 100000000);
// Sign the first input with the imported key
tx.sign(0, keyPair)
// Print transaction serialized as hex for validation and posting
console.log(tx.build().toHex())
