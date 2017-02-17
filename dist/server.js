var express = require('express');
var app = express();

// serve static assets
app.use('/', express.static(__dirname + '/'));

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);