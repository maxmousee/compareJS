var jsdiff = require('diff');
var Difference = require('../models/difference')

module.exports = class JSONDifferences {

    constructor(id, left, right) {
        this.id = id;
        this.equals = (left == right);

        if (this.equals) {
            this.equalSize = true;
            this.differences = [];
        } else {
            this.equalSize = this.isEqualSize(left, right);
            this.differences = [];
            // this.differences = jsdiff.diffChars(left, right);
            if (this.equalSize) {
                this.differences = this.offsetDifferences(left, right);
            }
        }
    }

    isEqualSize(left, right) {
        return (left.length == right.length);
    }

    offsetDifferences(left, right) {
        var leftByteArray = Buffer.from(left, 'base64');
        var rightByteArray = Buffer.from(right, 'base64');
        var diffs = [];

        var i = 0;
        leftByteArray.forEach(function(element) {
            if (element != rightByteArray[i]) {
                var len = element - rightByteArray[i];
                var aDiff = new Difference(i, Math.abs(len));
                diffs.push(aDiff);
            }
            i++;
        });
        return diffs;
    }
}