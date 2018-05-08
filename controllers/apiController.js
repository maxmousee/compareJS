var ComparableJSON = require('../models/comparablejson');
var loki = require('lokijs');
var db = new loki("comparablejson.db");
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');
var Base64 = require('js-base64').Base64;

var comparablejsons = db.addCollection("comparablejsons");

//Test data, remove later.
comparablejsons.insert(new ComparableJSON("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", 1));
comparablejsons.insert(new ComparableJSON("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",
"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8ycz8HwAE/AIAvnTYWQAAAABJRU5ErkJggg==", 2));

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

    app.get('/v1/getAll', function (req, res) {
        res.send(JSON.stringify(comparablejsons));
    });

    app.get('/v1/:id', function (req, res) {
        var result = comparablejsons.findOne({
            uuid: parseInt(req.params.id)
        });
        if (result == null) {
            res.status(HttpStatus.NOT_FOUND).send();
        } else {
            res.status(HttpStatus.OK).send(result);
        }
    });

    app.get('/v1/diff/:id', function (req, res) {
        var result = comparablejsons.findOne({
            uuid: parseInt(req.params.id)
        });
        if (result == null) {
            res.status(HttpStatus.NOT_FOUND).send();
        } else {
            res.status(HttpStatus.OK).send(result);
        }
    });


    app.post('/v1/diff/:id/left', function (req, res) {
        var createData = req.body.data;
        if (isBase64(createData)) {
            if (req.params.id) {
                var result = comparablejsons.findOne({
                    uuid: parseInt(req.params.id)
                });
                var currentRightData = null;

                if (result == null) {
                    var createCompJSON = new ComparableJSON(createData, currentRightData, parseInt(req.params.id));
                    comparablejsons.insert(createCompJSON);
                    res.status(HttpStatus.CREATED).send();
                } else {
                    currentLeftData = result.left;
                    result.left = createData;
                    comparablejsons.update(result);
                    res.status(HttpStatus.OK).send();
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
                    uuid: parseInt(req.params.id)
                });
                var currentLeftData = null;

                if (result == null) {
                    var createCompJSON = new ComparableJSON(currentLeftData, createData, parseInt(req.params.id));
                    comparablejsons.insert(createCompJSON);
                    res.status(HttpStatus.CREATED).send();
                } else {
                    currentLeftData = result.left;
                    result.right = createData;
                    comparablejsons.update(result);
                    res.status(HttpStatus.OK).send();
                }
            }
        } else {
            res.status(HttpStatus.BAD_REQUEST).send();
        }
    });

    app.delete('/v1/diff/:id', function (req, res) {
        comparablejsons.findAndRemove({
            uuid: parseInt(req.params.id)
        });
        res.status(HttpStatus.NO_CONTENT).send();

    });

}