$(document).ready(function() {
  initialiseHandlers();
});	

function initialiseHandlers() {
  $('h4').on('click', handleSectionHeaderClicked);
}

function handleSectionHeaderClicked() {
  var siblings = $(this).siblings();
  var section = siblings.first();
  section.toggleClass('collapsed');
}




