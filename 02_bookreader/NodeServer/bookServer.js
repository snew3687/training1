var fs = require('fs');
var commonmark = require('commonmark');
var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

var booksDocRoot = 'BOOKS_DOC_ROOT_NOT_INITIALISED';
var bookLibrary = {
  'JaneAusten_PrideAndPrejudice':
  [
    '<p>This is the Chapter 01 content</p>',
    '<p>This is the Chapter 02 content</p>',
    '<p>This is the Chapter 03 content</p>',
    '<p>This is the Chapter 04 content</p>',
    '<p>This is the Chapter 05 content</p>',
  ]  
};

function initialiseServer(options) {
  if (options.booksDocRoot) {
    booksDocRoot = options.booksDocRoot;
  }


}  

function loadBook(bookUri) {
  if (bookLibrary[bookUri]) return bookLibrary[bookUri];

  return false; 
}

function getBookChapter(bookUri, chapterNumber) {
  var result = '<p>Chapter content not loaded</p>';

  if (!loadBook(bookUri)) {
    return '<p>Book not found for URL - ' + bookUrl;
  }

  var filepath = 'D:\\AACode\\Training\\training1\\02_bookreader\\NodeServer\\public\\content\\books\\JaneAusten_PrideAndPrejudice\\bookChapters.Chapter1.md';
  console.log('About to read file - ' + filepath);
  var data = fs.readFileSync(filepath, 'utf8');
  console.log('About to parse file data - ' + data.substring(0,100));

  var parsed = reader.parse(data); // parsed is a 'Node' tree 
  result = writer.render(parsed); // result is a String 
  return result;
/***
  var book = bookLibrary[bookUri];
  var chapterIndex = chapterNumber - 1;

  return book[chapterIndex] ?
    book[chapterIndex] : 
    '<p>Chapter - ' + chapterNumber + ' - not found</p>';
****/
}

exports.getBookChapter = getBookChapter;
exports.initialiseServer = initialiseServer;

