var express = require('express');
var app=express();

app.use(express.static(__dirname + '/public/WebApplication'));

var port = 8080;
app.listen(port);
console.log('Listening on port: ' + port);
