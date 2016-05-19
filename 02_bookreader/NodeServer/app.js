var express = require('express');
var app=express();
var bookServer = require('./bookServer.js');
bookServer.initialiseServer(
  {
    booksDocRoot: 'xxxx'
  }
);

app.use(express.static(__dirname + '/public'));

app.get('/books/:bookUri/chapter/:chapterNumber', function(request, response) {
  var chapterNumber = request.params.chapterNumber;
  var bookUri = request.params.bookUri;
  var chapterContent = bookServer.getBookChapter(bookUri, chapterNumber);

  response.type('html');
  response
    .status(200)
    .send(chapterContent);
});

var port = 8080;
app.listen(port);
console.log('Listening on port: ' + port);
