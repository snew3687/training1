var express = require('express');
var app=express();

app.use(express.static(__dirname + '/public'));

app.get('/books/JaneAusten_PrideAndPrejudice/chapter/1', function(request, response) {
  response.type('html');
  response
    .status(200)
    .send('<p>This is the Chapter 1 content</p>'); 
});

app.get('/books/JaneAusten_PrideAndPrejudice/chapter/2', function(request, response) {
  response.type('html');
  response
    .status(200)
    .send('<p>This is the Chapter 2 content</p>'); 
});

var port = 8080;
app.listen(port);
console.log('Listening on port: ' + port);
