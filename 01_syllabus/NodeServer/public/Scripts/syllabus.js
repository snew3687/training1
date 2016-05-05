(function() {
  this.syllabusNamespace =  this.syllabusNamespace || { };
  var ns = this.syllabusNamespace;

  ns.initialiseHandlers = function() {
    $('h4').on('click', handleSectionHeaderClicked);
  };

  function handleSectionHeaderClicked() {
    var siblings = $(this).siblings();
    var section = siblings.first();
    section.toggleClass('collapsed');
  }



})();
