var fs = require('fs');
var commonmark = require('commonmark');
var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

var booksDocRoot = 'BOOKS_DOC_ROOT_NOT_INITIALISED';
var bookLibrary = { };

function initialiseServer(options) {

  if (options.booksDocRoot) {
    booksDocRoot = options.booksDocRoot;
  }
}  

function Book(descriptor, chapterSet)
{
  this.descriptor = descriptor;
  this.chapterSet = chapterSet;
}

function loadBook(bookUri) {
  if (bookLibrary[bookUri]) return bookLibrary[bookUri];

  var chapterSet = loadBookChapterSet(bookUri);
  var bookDescriptor = loadBookDescriptor(bookUri); 
  bookDescriptor.chapterCount = chapterSet.length;

  bookLibrary[bookUri] = new Book(bookDescriptor, chapterSet); 

  return true; 
}

function loadBookDescriptor(bookUri) {
  var filepath = booksDocRoot + '\\' + bookUri + '\\bookDescriptor.json';
  console.log('Start - Read book descriptor from - ' + filepath);
  var data = fs.readFileSync(filepath, 'utf8');
  var descriptor = JSON.parse(data);
  console.log('End - Read book descriptor ' + JSON.stringify(descriptor));
  return descriptor;
}

function loadBookChapterSet(bookUri) {
  var filepath = booksDocRoot + '\\' + bookUri + '\\bookChapters.md';
  console.log('About to read file - ' + filepath);
  var data = fs.readFileSync(filepath, 'utf8');
  console.log('About to parse file data - ' + data.substring(0,100));

  return parseAndLoadBook(data);
}

function parseAndLoadBook(fileContent) {
  var parsedBookDocument = reader.parse(fileContent); // parsedBookDocument is a 'Node' tree 

  var currentNode = parsedBookDocument.firstChild;

  var chapterSet = [];
  var chapterEntry = {};

  // Skip nodes up to heading
  do
  {
    if (currentNode.type == 'heading')
      break;
  } while ((currentNode = currentNode.next) !== null);

  while (currentNode) {
    // Create entry, with heading assigned
    chapterEntry  = {
      chapterHeading: currentNode,
      chapterTextNodes: [] 
    };

    //console.log('Reading chapter: ' + currentNode.literal);
    // Keep accumulating text nodes, up to next heading
    while ((currentNode = currentNode.next) !== null && currentNode.type !== 'heading') {
      //console.log('Adding node type - ' + currentNode.type);
      chapterEntry.chapterTextNodes.push(currentNode); 
    }
    chapterSet.push(chapterEntry);
  }
  
  return chapterSet;
}

function getBookDescriptor(bookUri) {
  var book;
  var result = 
  {
    "Title": "Unknown book",
    "Author": "Unknown Author",
    "Posting Date": null,
    "Release Date": null,
    "Last updated": null,
    "Language": "Unknown language",
    // Following properties added after initial load from file
    chapterCount: 0 
  };

  if (loadBook(bookUri)) {
    result = bookLibrary[bookUri].descriptor;
    result.chapterCounter = 0;
  }
  return result;
}

function getBookChapter(bookUri, chapterNumber) {
  var result = '<p>Chapter - ' + chapterNumber + ' - not found</p>';

  if (!loadBook(bookUri)) {
    return '<p>Book not found for URL - ' + bookUrl;
  }

  var chapterIndex = chapterNumber - 1;
  var book = bookLibrary[bookUri];
  var chapterEntry;

  if (book.chapterSet[chapterIndex]) {
    chapterEntry = book.chapterSet[chapterIndex];

    // Render chapter heading
    result = writer.render(chapterEntry.chapterHeading);

    // Render all chapter paragraphs
    var i = 0;
    var textNode;
    for (var nodeIndex in chapterEntry.chapterTextNodes)
    {
      textNode = chapterEntry.chapterTextNodes[nodeIndex];
      result += writer.render(chapterEntry.chapterTextNodes[nodeIndex]);
      i++;
    }
  } 

  return result;
}

exports.getBookDescriptor = getBookDescriptor;
exports.getBookChapter = getBookChapter;
exports.initialiseServer = initialiseServer;

