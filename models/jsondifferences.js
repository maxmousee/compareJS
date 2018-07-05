var jsdiff = require('diff');
var Difference = require('../models/difference')

module.exports = class JSONDifferences {

    constructor(id, data) {
        this.id = id;
        this.equals = (data.left == data.right);

        if (this.equals) {
            this.equalSize = true;
            this.differences = [];
        } else {
            this.equalSize = this.isEqualSize(data);
            this.differences = [];
            // this.differences = jsdiff.diffChars(left, right);
            if (this.equalSize) {
                this.differences = this.offsetDifferences(data);
            }
        }
    }

    isEqualSize(data) {
        return (data.left.length == data.right.length);
    }

    offsetDifferences(data) {
        var leftByteArray = Buffer.from(data.left, 'base64');
        var rightByteArray = Buffer.from(data.right, 'base64');
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