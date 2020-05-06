
const BlockDatabase = require('./src/block-database.js');
const BlockChain = require('./src/blockchain.js');

const db = new BlockDatabase();
const blockchain = new BlockChain(db);

const blockProto = blockchain.createBlockProto({
    message: 'Second block'
});
blockchain.mineBlock(blockProto);
blockchain.addBlock(blockProto);