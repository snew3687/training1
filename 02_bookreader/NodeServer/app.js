var express = require('express');
var app=express();
var bookServer = require('./bookServer.js');
bookServer.initialiseServer(
  {
    //var filepath = 'D:\\AACode\\Training\\training1\\02_bookreader\\NodeServer\\public\\content\\books\\JaneAusten_PrideAndPrejudice\\bookChapters.Chapter1.md';
    booksDocRoot: '.\\public\\content\\books'
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
