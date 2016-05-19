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
  if (!loadBook(bookUri)) {
    return '<p>Book not found for URL - ' + bookUrl;
  }

  var book = bookLibrary[bookUri];
  var chapterIndex = chapterNumber - 1;

  return book[chapterIndex] ?
    book[chapterIndex] : 
    '<p>Chapter - ' + chapterNumber + ' - not found</p>';
}

exports.getBookChapter = getBookChapter;
exports.initialiseServer = initialiseServer;

