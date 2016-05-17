var bookReader = function() {

  var initialise = function initialise() {
    $("#fetchChapter").on('click', handleFetchChapter);
  };

  function handleFetchChapter() {
    var nextChapter = $("#chapterToFetch").val();
    var fetchUrl = "books/JaneAusten_PrideAndPrejudice/chapter/" + nextChapter;    
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
