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

// Get book descriptor
app.get('/books/:bookUri', function(request, response) {
  var bookUri = request.params.bookUri;
  var bookDescriptor = bookServer.getBookDescriptor(bookUri);

  response.type('json');
  response
    .status(200)
    .send(bookDescriptor);
});

// Get book chapter content as HTML
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
