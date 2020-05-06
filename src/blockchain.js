module.exports = class Blockchain {
    constructor(db) {
        if(!db) throw new Error('You have to specify a BlockDatabase instance to boot up a blockchain');
        this.db = db;
        if(!this.isValid()) {
            throw new Error('Provided chain is not valid');
        }
    }

    isValid() {
        const length  = this.db.getHeight();
        for(let i = 0; i < length - 1; i++) {
            const current = this.db.getBlock(i);
            const nextBlock = this.db.getBlock(i + 1);
            if(this.current.hash !== current.getHash()) {
                return false;
            }

            if(nextBlock.lastHash !== block.hash) {
                return false;
            }

            return true;
        }
    }
}