var express = require('express');
var app=express();
var bookServer = require('./bookServer.js');
bookServer.initialiseServer(
  {
    booksDocRoot: '.\\public\\content\\books'
  }
);

app.use(express.static(__dirname + '/public'));

// Get all book descriptors
app.get('/books/all', function(request, response) {
  var bookUri = request.params.bookUri;
  var allBookDescriptors = bookServer.getAllBookDescriptors();

  response.type('json');
  response
    .status(200)
    .send(allBookDescriptors);
});

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
