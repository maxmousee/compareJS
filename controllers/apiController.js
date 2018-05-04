var B64JSON = require('../models/b64json');
var ComparableJSON = require('../models/comparablejson');
var loki = require('lokijs');
var db = new loki('comparablejson.db');
var bodyParser = require('body-parser');

var compjsons = db.addCollection('compjsons');

var starterData = [
    new B64JSON('SometextLeft1', true),
    new B64JSON('SometextLeft2', true),
    new B64JSON('SometextRight3', true),
    new B64JSON('SometextRight4', true)
];

starterData.forEach(function(element) {
    compjsons.insert(element);
    console.log(element);
  });

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/v1/getAll', function(req, res) { 
       res.send(JSON.stringify(starterData));
        
    });
    
    app.get('/v1/diff/:id/left', function(req, res) {
        /*
       
       JSONs.findById({ _id: req.params.id }, function(err, todo) {
           
           if (err) throw err;
           
           res.send(todo);
           
       });
       */

       res.send('Got it!');
        
    });

    app.get('/v1/diff/:id/right', function(req, res) {
       /*
        JSONs.findById({ _id: req.params.id }, function(err, todo) {
            if (err) throw err;
            
            res.send(todo);
        });
        */

       res.send('Got it!');
         
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
        
        if (req.body.id) {
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
    
    app.delete('/v1/diff/:id/left', function(req, res) {
        /*
        JSONs.findByIdAndRemove(req.body.id, function(err) {
            if (err) throw err;
            res.send('Success');
        })
        */
        
    });

    app.delete('/v1/diff/:id/right', function(req, res) {
        /*
        JSONs.findByIdAndRemove(req.body.id, function(err) {
            if (err) throw err;
            res.send('Success');
        })
        */
        
    });
    
}