var ComparableJSON = require('../models/comparablejson');
var loki = require('lokijs');
var db = new loki("comparablejson.db");
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');
var JSONDifferences = require('../models/jsondifferences');
var utils = require('../utils/utils');

var comparablejsons = db.addCollection("comparablejsons");

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    function findOrReturn(id, res) {
        var result = comparablejsons.findOne({
            id: parseInt(id)
        });
        if (result == null) {
            res.status(HttpStatus.NOT_FOUND).send();
        } 
        return result;
    }

    app.get('/v1/:id', function (req, res) {
        var result = findOrReturn(req.params.id, res);
        if (result != null) {
            res.status(HttpStatus.OK).send(result);
        }
    });

    app.get('/v1/diff/:id', function (req, res) {
        var result = findOrReturn(req.params.id, res);
        if (result != null) {
            var response = new JSONDifferences(result.id, result);
            res.status(HttpStatus.OK).send(response);
        }
    });


    app.post('/v1/diff/:id/left', function (req, res) {
        var createData = req.body.data;
        var result = findAndValidate(req, res);
        var currentRightData = null;
        if (result == null) {
            var createCompJSON = new ComparableJSON(parseInt(req.params.id), createData, currentRightData);
            comparablejsons.insert(createCompJSON);
            result = createCompJSON;
        } else {
            currentLeftData = result.left;
            result.left = createData;
            comparablejsons.update(result);
        }
        utils.tryToSendResponse(res, HttpStatus.OK, result);
    });

    app.post('/v1/diff/:id/right', function (req, res) {
        var createData = req.body.data;
        var result = findAndValidate(req, res);
        var currentLeftData = null;
        if (result == null) {
            var createCompJSON = new ComparableJSON(parseInt(req.params.id), currentLeftData, createData);
            comparablejsons.insert(createCompJSON);
            result = createCompJSON;
        } else {
            currentLeftData = result.left;
            result.right = createData;
            comparablejsons.update(result);
        }
        utils.tryToSendResponse(res, HttpStatus.OK, result);
    });

    function findAndValidate(req, res) {
        var createData = req.body.data;
        var id = req.params.id;
        if (!utils.isBase64(createData)) {
            res.status(HttpStatus.BAD_REQUEST).send();
            res.sent = true;
            return;
        } else {
            if (id) {
                var result = comparablejsons.findOne({
                    id: parseInt(id)
                });
                return result;
            } else {
                return null;
            }
        } 
    }

    app.delete('/v1/:id', function (req, res) {
        comparablejsons.findAndRemove({
            id: parseInt(req.params.id)
        });
        res.status(HttpStatus.NO_CONTENT).send();
    });
}