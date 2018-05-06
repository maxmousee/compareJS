var ComparableJSON = require('../models/comparablejson');
var loki = require('lokijs');
var db = new loki("comparablejson.db");
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');

var comparablejsons = db.addCollection("comparablejsons");

//Test data, remove later.
comparablejsons.insert(new ComparableJSON("bGVmdDEyMw==", "cmlnaHQ0NTY=", 1));
comparablejsons.insert(new ComparableJSON("bGVmdDQ1Ng==", "cmlnaHQ0NTY=", 2));

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/v1/getAll', function(req, res) { 
       res.send(JSON.stringify(comparablejsons));
    });
    
    app.get('/v1/diff/:id/left', function(req, res) {

        var result = comparablejsons.findOne({ uuid:parseInt(req.params.id) });
        if (result == null) {
            res.status(HttpStatus.NOT_FOUND).send();
        } else {
            var left = result.left;
            if (left != null) {
                res.status(HttpStatus.OK).send(left);
            } 
            else {
                res.status(HttpStatus.NOT_FOUND).send();
            }
        }
        
    });

    app.get('/v1/diff/:id/right', function(req, res) {
        var result = comparablejsons.findOne({ uuid:parseInt(req.params.id) });
        if (result == null) {
            res.status(HttpStatus.NOT_FOUND).send();
        } else {
            var right = result.right;
            if (right != null) {
                res.status(HttpStatus.OK).send(right);
            } 
            else {
                res.status(HttpStatus.NOT_FOUND).send();
            }
        }
         
     });

    
    
    app.post('/v1/diff/:id/left', function(req, res) {
        console.log(JSON.stringify(req.body.data));
        
        if (req.params.id) {
            var result = comparablejsons.findOne({ uuid:parseInt(req.params.id) });
            var currentRightData = null;
            
            if (result == null) {
                res.status(HttpStatus.CREATED).send();
            } else {
                currentRightData = result.right;
                res.status(HttpStatus.OK).send();
            }
            var createCompJSON = new ComparableJSON(req.body.data, currentRightData, parseInt(req.params.id));
            comparablejsons.insert(createCompJSON);
        } 
    });

    app.post('/v1/diff/:id/right', function(req, res) {
        console.log(JSON.stringify(req.body.data));
        
        if (req.params.id) {
            var result = comparablejsons.findOne({ uuid:parseInt(req.params.id) });
            var currentLeftData = null;
            
            if (result == null) {
                res.status(HttpStatus.CREATED).send();
            } else {
                currentLeftData = result.left;
                res.status(HttpStatus.OK).send();
            }
            var createCompJSON = new ComparableJSON(currentLeftData, req.body.data, parseInt(req.params.id));
            comparablejsons.insert(createCompJSON);
        } 
    });

    app.delete('/v1/diff/:id', function(req, res) {
        comparablejsons.findAndRemove({ uuid:parseInt(req.params.id) });
        res.status(HttpStatus.NO_CONTENT).send();
        
    });
    
}