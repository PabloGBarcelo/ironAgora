var checkNewContent = function() {
  setInterval(() => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/forum/check',
      dataType: 'json',
      success: response => {
        let numResponse = response['results'].length;
        let numCurrentQuest = document.getElementsByClassName('onePost').length;
        let diffQuestions = numResponse - numCurrentQuest;
        if (diffQuestions > 0) {
          let refreshButton = $('.newPostAdded');
          if (refreshButton) {
            refreshButton.remove();
          }
          $('.allPosts:first').before(`<button class="new-fetch" type="submit">+${diffQuestions} new posts</button>`);
          $('.new-fetch').on('click', (event) => {
            event.preventDefault();
            window.location.reload(true);
          });
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }, 3000);
};

$(document).ready(() => {
  checkNewContent();
});
