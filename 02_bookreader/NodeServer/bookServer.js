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

function loadBook(bookUri) {
  if (bookLibrary[bookUri]) return bookLibrary[bookUri];

  var filepath = booksDocRoot + '\\' + bookUri + '\\bookChapters.md';
  console.log('About to read file - ' + filepath);
  var data = fs.readFileSync(filepath, 'utf8');
  console.log('About to parse file data - ' + data.substring(0,100));

  bookLibrary[bookUri] = parseAndLoadBook(data);

  return true; 
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
      if (currentNode.type === 'paragraph') {
        //console.log('Adding node type - ' + currentNode.type);
        chapterEntry.chapterTextNodes.push(currentNode); 
      } else {
        //console.log('Skipping node type - ' + currentNode.type); 
      }
    }
    chapterSet.push(chapterEntry);
  }
  
  return chapterSet;
}

function getBookChapter(bookUri, chapterNumber) {
  var result = '<p>Chapter - ' + chapterNumber + ' - not found</p>';

  if (!loadBook(bookUri)) {
    return '<p>Book not found for URL - ' + bookUrl;
  }

  var chapterIndex = chapterNumber - 1;
  var bookChapterSet = bookLibrary[bookUri];
  var chapterEntry;

  if (bookChapterSet[chapterIndex]) {
    chapterEntry = bookChapterSet[chapterIndex];

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

exports.getBookChapter = getBookChapter;
exports.initialiseServer = initialiseServer;

