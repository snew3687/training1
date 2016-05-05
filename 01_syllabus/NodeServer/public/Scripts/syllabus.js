(function() {
  this.syllabusNamespace =  this.syllabusNamespace || { };
  var ns = this.syllabusNamespace;

  ns.initialiseHandlers = function() {
    $(  'section.content,'
      + 'section.outcomes,'
      + 'section.backgroundInformation,'
      + 'section.language')
    .on('click', handleSectionHeaderClicked);
  };

  function handleSectionHeaderClicked() {
    var section$ = $(this);
    var header$ = $('h4', section$);
    var elaboration$= $('div.elaboration', section$);

    elaboration$.toggle('slow', function() {
      header$.toggleClass('collapsed');
      header$.toggleClass('expanded');
      elaboration$.toggleClass('collapsed');
      elaboration$.toggleClass('expanded');
    });
  }



})();
