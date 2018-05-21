var assert = require('assert');
var ComparableJSON = require('../models/comparablejson');

describe('ComparableJSON class test', function () {
    it('Should initialize all vars correctly', function() {
        var aCompJSON = new ComparableJSON(99, "a", "ata");
        assert.equal(aCompJSON.id, 99);
        assert.equal(aCompJSON.left, "a");
        assert.equal(aCompJSON.right, "ata");
    });
});