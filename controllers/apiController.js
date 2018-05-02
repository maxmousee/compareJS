var JSONs = require('../models/b64json');
var bodyParser = require('body-parser');

//var jsonArray = ComparableJSON[];

var starterData = [
    {
        text: 'Sometext1',
        isBase64: false
    },
    {
        text: 'Sometext2',
        isBase64: false
    },
    {
        text: 'Sometext3',
        isBase64: false
    }
];

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