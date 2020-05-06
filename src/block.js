const SHA256 = require("crypto-js/sha256");

module.exports = class Block {
    constructor(index, timestamp, data, lastHash = " ", targetDifficulty = 5) {
        if(typeof index === 'object') this.createBlockFromJson(index);
        else {
            this.index = index;
            this.nonce = -1;
            this.timestamp = (new Date(timestamp)).toISOString();
            this.lastHash = lastHash;
            this.data = data;
            this.targetDifficulty = targetDifficulty;
            this.hash = this.getHash();
        }
    }

    createBlockFromJson(block) {
        this.index = block.index;
        this.nonce = block.nonce;
        this.timestamp = block.timestamp;
        this.lastHash = block.lastHash;
        this.data = block.data;
        this.targetDifficulty = block.targetDifficulty;
        this.hash = block.hash;
    }

    getDataHash() {
        return SHA256(JSON.stringify(this.data)).toString();
    }

    getHash() {
        return SHA256(
            this.index +
            this.nonce +
            this.lastHash +
            this.timestamp +
            this.targetDifficulty +
            this.getDataHash()
        ).toString();
    }

    setNonce(nonce) {
        this.nonce = nonce;
        this.hash = this.getHash();
    }
}