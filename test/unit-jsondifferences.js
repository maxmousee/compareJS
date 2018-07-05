var assert = require('assert');
var JSONDifferences = require('../models/jsondifferences');

describe('JSONDifferences class test', function () {
    it('Should have different size and different data', function() {
        var data = {
            left: "a=",
            right: "ata="
        };
        var aCompJSON = new JSONDifferences(9, data);
        assert.equal(aCompJSON.id, 9);
        assert.equal(aCompJSON.equals, false);
        assert.equal(aCompJSON.equalSize, false);
        assert.deepEqual(aCompJSON.differences, []);
    });

    it('Should have equal size and different data', function() {
        var data = {
            left: "ZGEua39nYWk=",
            right: "ZGEua49nYWk="
        };
        var aCompJSON = new JSONDifferences(199, data);
        assert.equal(aCompJSON.id, 199);
        assert.equal(aCompJSON.equals, false);
        assert.equal(aCompJSON.equalSize, true);
        assert.deepEqual(aCompJSON.differences, [{ length: 16, offset: 4} ]);
    });

    it('Should have equal size and different data', function() {
        var data = {
            left: "ZGEua39nYWk=",
            right: "XGEua39nYWk="
        };
        var aCompJSON = new JSONDifferences(199, data);
        assert.equal(aCompJSON.id, 199);
        assert.equal(aCompJSON.equals, false);
        assert.equal(aCompJSON.equalSize, true);
        assert.deepEqual(aCompJSON.differences, [{ length: 8, offset: 0} ]);
    });

    it('Should have equal size and different data', function() {
        var data = {
            left: "ZGEua39nYWk==",
            right: "XGEuA40dYWk=="
        };
        var aCompJSON = new JSONDifferences(199, data);
        assert.equal(aCompJSON.id, 199);
        assert.equal(aCompJSON.equals, false);
        assert.equal(aCompJSON.equalSize, true);
        assert.deepEqual(aCompJSON.differences, [{ length: 8, offset: 0}, { length: 104, offset: 3}, 
            { length: 14, offset: 4}, { length: 74, offset: 5} ]);
    });

    it('Should have equal size and data', function() {
        var data = {
            left: "Z=",
            right: "Z="
        };
        var aCompJSON = new JSONDifferences(299, data);
        assert.equal(aCompJSON.id, 299);
        assert.equal(aCompJSON.equals, true);
        assert.equal(aCompJSON.equalSize, true);
        assert.deepEqual(aCompJSON.differences, []);
    });
});