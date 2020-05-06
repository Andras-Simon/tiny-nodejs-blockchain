const SHA256 = require("crypto-js/sha256");

module.exports = class Block {
    constructor(index, nonce, timestamp, data, lastHash = " ", targetDifficulty = 5) {
        this.index = index;
        this.nonce = nonce;
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.data = data;
        this.targetDifficulty = targetDifficulty;
        this.hash = this.getHash();
    }

    getDataHash() {
        return SHA256(JSON.stringify(this.data));
    }

    getHash() {
        return SHA256(
            this.index +
            this.nonce +
            this.lastHash +
            this.timestamp +
            this.targetDifficulty +
            this.getDataHash()
        );
    }
}