
function startFetchingUserPosts() {
  var nextUserPostId = 1;
  fetchNextPost(nextUserPostId);

}

function fetchNextPost(userPostId) {
  if (userPostId > 10) return;

  var nextUserPromise = getUserPostAsync(userPostId);
  nextUserPromise
    .done(function (userPost) {
      appendUserPost(userPost);
      setTimeout(function() { fetchNextPost(userPostId+1); }, 2000 );
    })
    .fail(function () {
      writeMessage('Unable to fetch user post Id = ' + nextUserPostId);
    });
}

function getUserPostAsync(userPostId) {
  var root = 'http://jsonplaceholder.typicode.com';

  return $.ajax({
    url: root + '/posts/' + userPostId,
    method: 'GET'
  }).promise();
}

function appendUserPost(userPost) {
  $('#tblUserRecords tbody')
  .append(
    '<tr>' +
    '<td>' + userPost.id + '</td>' +
    '<td>' + userPost.title + '</td>' +
    '<td>' + userPost.body + '</td>' +
    '</tr>'
  );
}

function writeMessage(message) {
  $('#message').append('<br />' + message);
}

$(document).ready(function() {
  $('#btnGo').on('click', startFetchingUserPosts);
});
