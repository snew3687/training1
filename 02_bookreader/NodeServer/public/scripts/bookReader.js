var bookReader = function() {

  // currentBookDescriptor - will be an object of the form:
  // {
  //   "Title": "Pride and Prejudice",
  //   "Author": "Jane Austen",
  //   "Posting Date": "August 26, 2008 [EBook #1342]",
  //   "Release Date": "June, 1998",
  //   "Last updated": "February 15, 2015",
  //   "Language": "English"
  // }
  var currentBookDescriptor = { };
  var currentBookUri = 'JaneAusten_PrideAndPrejudice'; 

  var initialise = function initialise() {
    $("#fetchChapter").on('click', handleFetchChapter);
    loadBookInformation();
  
    // Load first chapter
    $('#chapterToFetch').val(1);
    handleFetchChapter();
  };

  function loadBookInformation() {

    $.ajax({
      url: "books/" + currentBookUri,
      type: 'GET',
      success: storeAndDisplayBookInformation
    });
  }

  function storeAndDisplayBookInformation(bookDescriptor) {
    currentBookDescriptor = bookDescriptor;
    $("div#bookHeader h1").text(currentBookDescriptor.Title);
    $("#bookAuthor").text(currentBookDescriptor.Author);
  }

  function handleFetchChapter() {
    var nextChapter = $("#chapterToFetch").val();
    var fetchUrl = "books/" + currentBookUri + "/chapter/" + nextChapter;    
    $.ajax({
      url: fetchUrl,
      type: 'GET',
      success: displayChapter
    });
  }

  function displayChapter(chapterContent) {
    $('#readingAreaContainer').html(chapterContent);
  }

  return {
    initialise: initialise
  };
}();
