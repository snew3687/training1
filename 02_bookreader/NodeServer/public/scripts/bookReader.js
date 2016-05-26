var bookReader = function() {

  // currentBookDescriptor - will be an object of the form:
  // {
  //   "Title": "Pride and Prejudice",
  //   "Author": "Jane Austen",
  //   "PostingDate": "August 26, 2008 [EBook #1342]",
  //   "ReleaseDate": "June, 1998",
  //   "LastUpdated": "February 15, 2015",
  //   "Language": "English"
  // }
  var currentBookDescriptor = { };
  var currentBookUri = 'BOOK_URI_NOT_YET_ASSIGNED'; 

  var initialise = function initialise() {
    $("a.bookLink").on('click', handleBookLinkClick);
    $("#fetchChapter").on('click', handleFetchChapter);

    initialiseChapterControlHandlers();
    //handleChapterControl   
  };

  function initialiseChapterControlHandlers() {
    $('#chapterControlFirst')
      .on('click', { fetchType: 'first' }, handleChapterControl );
    $('#chapterControlPrevious')
      .on('click', { fetchType: 'previous' }, handleChapterControl );
    $('#chapterControlNext')
      .on('click', { fetchType: 'next' }, handleChapterControl );
    $('#chapterControlLast')
      .on('click', { fetchType: 'last' }, handleChapterControl );
  }

  function handleBookLinkClick(evt) {
    evt.preventDefault();
    currentBookUri = $(this).attr('data-bookUri');

    loadBookInformation();

    // Load first chapter
    $('#chapterToFetch').val(1);
    handleFetchChapter();
  }

  function loadBookInformation() {

    $.ajax({
      url: "books/" + currentBookUri,
      type: 'GET',
      success: storeAndDisplayBookInformation
    });
  }

  function storeAndDisplayBookInformation(bookDescriptor) {
    currentBookDescriptor = bookDescriptor;
    $('div#bookHeader h1').text(currentBookDescriptor.Title);
    $('#bookAuthor').text(currentBookDescriptor.Author);
  }

  function handleChapterControl(evt) {
    var fetchType = evt.data.fetchType;
    var chapterNumber = $("#chapterToFetch").val();
    if (fetchType === 'first') {
      chapterNumber = 1;
    } else if (fetchType === 'previous') { 
      chapterNumber -= 1;
    } else if (fetchType === 'next') { 
      chapterNumber += 1;
    } else if (fetchType === 'last') { 
      chapterNumber = currentBookDescriptor.chapterCount; 
    } else {
      // do nothing
    }
    
    chapterNumber = Math.max(chapterNumber, 1);
    chapterNumber = Math.min(chapterNumber, currentBookDescriptor.chapterCount);
    $("#chapterToFetch").val(chapterNumber);

    handleFetchChapter();
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
