module.exports = class JSONDifferences {

    constructor(equals, equalSize, differences) {
        this.equals = equals;
        this.equalSize = equalSize;
        this.differences = differences;
    }
}