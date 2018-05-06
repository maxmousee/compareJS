var ComparableJSON = require('../models/comparablejson');
var loki = require('lokijs');
var db = new loki("comparablejson.db");
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');

var comparablejsons = db.addCollection("comparablejsons");

comparablejsons.insert(new ComparableJSON("SometextLeft11", "SometextRight11", 1));
comparablejsons.insert(new ComparableJSON("SometextLeft22", "SometextRight22", 2));

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/v1/getAll', function(req, res) { 
       res.send(JSON.stringify(starterData));
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
        
        if (req.body.id) {
            /*
            JSONs.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
                if (err) throw err;
                
                res.send('Success');
            });
            */
        }
        
        else {
           
            /*
           var newTodo = JSONs({
               username: 'test',
               todo: req.body.todo,
               isDone: req.body.isDone,
               hasAttachment: req.body.hasAttachment
           });
           newTodo.save(function(err) {
               if (err) throw err;
               res.send('Success');
           });
           */
            
        }
        res.send('Got it!');
        
    });

    app.post('/v1/diff/:id/right', function(req, res) {
        
        if (req.params.id) {
            /*
            JSONs.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
                if (err) throw err;
                
                res.send('Success');
            });
            */
           res.send('Updated it!');
        }
        
        else {
           
            /*
           var newTodo = JSONs({
               username: 'test',
               todo: req.body.todo,
               isDone: req.body.isDone,
               hasAttachment: req.body.hasAttachment
           });
           newTodo.save(function(err) {
               if (err) throw err;
               res.send('Success');
           });
           */

          res.send('Added it!');
            
        }
        
    });

    app.delete('/v1/diff/:id', function(req, res) {
        comparablejsons.findAndRemove({ uuid:parseInt(req.params.id) });
        res.status(HttpStatus.NO_CONTENT).send();
        
    });
    
}