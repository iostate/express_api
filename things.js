var express = require('express');
var router = express.Router();

// Purpose of this file is to remove clutter from index.js

router.get('/', function(req, res){
   res.send('GET route on things.');
});
router.post('/', function(req, res){
   res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;