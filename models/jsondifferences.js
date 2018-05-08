module.exports = class JSONDifferences {

    isEqualSize(left, right) {
        return (left.length == right.length);
    }

    /*
    compareBase64(left, right) {
        var response = new Difference();
    }
    */

    constructor(left, right) {
        this.equals = (left == right);

        if (this.equals) {
            this.equalSize = true;
            this.differences = [];
        } else {
            this.equalSize = this.isEqualSize(left, right);
            this.differences = "THEY ARE DIFFERENT, TRUST ME!";
        }
    }
}