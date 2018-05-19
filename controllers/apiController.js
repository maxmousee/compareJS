var ComparableJSON = require('../models/comparablejson');
var loki = require('lokijs');
var db = new loki("comparablejson.db");
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');
var Base64 = require('js-base64').Base64;
var JSONDifferences = require('../models/jsondifferences');

var comparablejsons = db.addCollection("comparablejsons");

//Test data, remove later.
comparablejsons.insert(new ComparableJSON(1, "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="));
comparablejsons.insert(new ComparableJSON(2, "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",
"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8ycz8HwAE/AIAvnTYWQAAAABJRU5ErkJggg=="));
comparablejsons.insert(new ComparableJSON(3, "ZGFua29nYWk=",
"ZGEua39nYWk="));

module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    function isBase64(createData) {
        if (createData == null || createData.length == 0) {
            return false;
        } else {
            try {
                return Base64.atob(createData) != null;
            } catch (err) {
                return false;
            }
        }
    }

    app.get('/v1/:id', function (req, res) {
        var result = comparablejsons.findOne({
            id: parseInt(req.params.id)
        });
        if (result == null) {
            res.status(HttpStatus.NOT_FOUND).send();
        } else {
            res.status(HttpStatus.OK).send(result);
        }
    });

    app.get('/v1/diff/:id', function (req, res) {
        var result = comparablejsons.findOne({
            id: parseInt(req.params.id)
        });
        if (result == null) {
            res.status(HttpStatus.NOT_FOUND).send();
        } else {
            var response = new JSONDifferences(result.id, result.left, result.right);
            res.status(HttpStatus.OK).send(response);
        }
    });


    app.post('/v1/diff/:id/left', function (req, res) {
        var createData = req.body.data;
        if (isBase64(createData)) {
            if (req.params.id) {
                var result = comparablejsons.findOne({
                    id: parseInt(req.params.id)
                });
                var currentRightData = null;

                if (result == null) {
                    var createCompJSON = new ComparableJSON(parseInt(req.params.id), createData, currentRightData);
                    comparablejsons.insert(createCompJSON);
                    res.status(HttpStatus.OK).send(createCompJSON);
                } else {
                    currentLeftData = result.left;
                    result.left = createData;
                    comparablejsons.update(result);
                    res.status(HttpStatus.OK).send(result);
                }
            }
        } else {
            res.status(HttpStatus.BAD_REQUEST).send();
        }
    });

    app.post('/v1/diff/:id/right', function (req, res) {
        var createData = req.body.data;
        if (isBase64(createData)) {
            if (req.params.id) {
                var result = comparablejsons.findOne({
                    id: parseInt(req.params.id)
                });
                var currentLeftData = null;

                if (result == null) {
                    var createCompJSON = new ComparableJSON(parseInt(req.params.id), currentLeftData, createData);
                    comparablejsons.insert(createCompJSON);
                    res.status(HttpStatus.OK).send(createCompJSON);
                } else {
                    currentLeftData = result.left;
                    result.right = createData;
                    comparablejsons.update(result);
                    res.status(HttpStatus.OK).send(result);
                }
            }
        } else {
            res.status(HttpStatus.BAD_REQUEST).send();
        }
    });

    app.delete('/v1/:id', function (req, res) {
        comparablejsons.findAndRemove({
            id: parseInt(req.params.id)
        });
        res.status(HttpStatus.NO_CONTENT).send();

    });

}