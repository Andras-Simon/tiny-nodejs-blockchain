const fs = require('fs');

module.exports = class BlockDatabase {
    constructor(filename = 'data/chain.json') {
        this.filename = filename;
        this.blocks = JSON.parse(fs.readFileSync(filename)) || [];
    }

    getBlock(id) {
        return this.blocks[id];
    }

    addBlock(block) {
        this.blocks.push(block);
        fs.writeFileSync(this.filename, JSON.stringify(this.blocks));
    }

    getHeight() {
        return this.blocks.length + 1;
    }
}