$(document).ready(function() {
  $('#media').on('play', function() {
    $('#message').html($('#media')[0].currentSrc);
  });
});
