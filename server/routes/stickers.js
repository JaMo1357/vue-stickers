var express = require('express');
var router = express.Router();
var cors = require('cors');



var whitelisted= 'http://localhost:8080';
var corsOptions = {
  origin: whitelisted,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var json = require('./../DataSource/stickersList');

router.get('/', cors(corsOptions), function(req, res, next) {
  res.send(json);
});

module.exports = router;
