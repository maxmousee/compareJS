var B64Jsons = require('../models/b64json');

module.exports = function(app) {
    
   app.get('/v1/setupBase64', function(req, res) {
       
       // create test data
       
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
       
       /*
       B64Jsons.create(starterData, function(err, results) {
           res.send(results);
       });
       */ 
       
   });
    
}