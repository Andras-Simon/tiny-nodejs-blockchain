const Block = require('./block');

module.exports = class Blockchain {
    constructor(db) {
        if(!db) throw new Error('You have to specify a BlockDatabase instance to boot up a blockchain');
        this.db = db;
        this.initialDifficulty = 3;
        if(!this.isValid()) {
            throw new Error('Provided chain is not valid');
        }
    }

    addBlock(block) {
        if(!this.blockIsValid) {
            throw new Error('Block is not valid');
        }
        this.db.addBlock(block);
    }

    isValid() {
        const length  = this.db.getHeight();
        if(length === 0) {
            console.log('Blockchain in not initialized yet, creating genesis....');
            this.createGenesis();
        }
        if(length < 2) return true;
        for(let i = 0; i < length - 1; i++) {
            const current = new Block(this.db.getBlock(i));
            const nextBlock = new Block(this.db.getBlock(i + 1));
            if(!this.blockIsValid(current)) {
                return false;
            }

            if(nextBlock.lastHash !== current.hash) {
                return false;
            }

            return true;
        }
    }

    blockIsValid(block) {
        if(block.hash !== block.getHash()) {
            return false;
        }
        if(block.hash.substring(0, block.targetDifficulty) !== ''.padEnd(block.targetDifficulty, '0')) {
            return false;
        }
        return true;
    }

    createGenesis() {
        const now = new Date();
        const data = { message: 'May the force be with you!' };
        const difficultyTarget = this.initialDifficulty;
        const blockProto = new Block(0, now.toISOString(),  data, '', difficultyTarget);
        this.mineBlock(blockProto, difficultyTarget);
        this.db.addBlock(blockProto);
    }

    createBlockProto(data) {
        const now = new Date();
        const difficultyTarget = this.initialDifficulty;
        return new Block(0, now.toISOString(),  data, '', difficultyTarget);
    }

    mineBlock(block) {
        console.log('Start mining...');
        let i = 0;
        while(true) {
            block.setNonce(i);
            console.log('Nonce: ', i, block.hash.toString());
            if(this.blockIsValid(block)) {
                return true;
            }
            i++;
        }
        
    }
}