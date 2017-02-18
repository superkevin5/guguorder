var express = require('express');
var router = express.Router();

// Home Page
router.get('/', function(req, res, next) {
	res.send('Hello gugu order');
});

module.exports = router;
