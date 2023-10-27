const fs = require('fs');

const abi = [];
const bin = ''

const output = {
    contracts: {
        'Greeter.sol:Greeter': {
            abi: JSON.stringify(abi),
            bin: bin,
        },
    },
    version: '0.5.16+commit.9c3226ce.Linux.g++', 
};

const jsonOutput = JSON.stringify(output, null, 2);

fs.writeFileSync('solc-output-token.json', jsonOutput, 'utf8');
