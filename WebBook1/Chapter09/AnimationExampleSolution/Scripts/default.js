var milliseconds = 1000;
var opacity = 0.5;

function displayCoverAsync() {
  return $("#cover").fadeTo(milliseconds, opacity).promise();
}

function showMessageContentAsync(message) {
  $('#messageContent').html(message);
  $('#messageBox').show();
  return $('#messageContent').slideDown(milliseconds).promise();
}


function showMessageAsync(message) {
  var coverPromise = displayCoverAsync();
  var messagePromise = coverPromise.pipe(function () {
    return showMessageContentAsync(message);
  });
  return messagePromise;
}

function displayTimeAsync() {
  var message = 'The time is now ' + getTime();
  return showMessageAsync(message);
}

function hideMessageContentAsync() {
  var promise = $('#messageContent').slideUp(milliseconds).promise();
  promise.done(function() { 
                $('#messageBox').hide(); 
                });
  return promise;
}

function hideCoverAsync() {
  return $('#cover').fadeOut(milliseconds).promise();
}

function hideMessageAsync() {
  var messagePromise = hideMessageContentAsync();
  var coverPromise = messagePromise.pipe(function() {
    return hideCoverAsync();
  });
}

function getTime() {
  var dateTime = new Date();
  var hours = dateTime.getHours();
  var minutes = dateTime.getMinutes();
  var seconds = dateTime.getSeconds();
  return hours + ':' 
        + (minutes < 10 ? '0' + minutes : minutes) + ':'
        + (seconds < 10 ? '0' + seconds : seconds);
}

$(document).ready(function () {
  $('#btnShowMessage').click(displayTimeAsync);
  $('#btnMessageOK').click(hideMessageAsync);
});
