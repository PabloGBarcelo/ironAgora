let sw=0;
var checkNewContent = function() {
  setInterval(() => {
    $.ajax({
      method: 'GET',
      url: '/forum/check',
      dataType: 'json',
      success: response => {
        console.log();
        let numResponse = response['results'].length;
        let numCurrentQuest = document.getElementsByClassName('onePost').length;
        let diffQuestions = numResponse - numCurrentQuest;
        if (diffQuestions > 0) {
          if (sw==0 || diffQuestions-sw > 0){
            console.log(response['results']);
            Push.create("There is new posts!", {
              body: response['results'][response['results'].length-1].title.replace(/<(?:.|\n)*?>/gm, ''),
              icon: '/images/nophoto.png',
              timeout: 4000,
              onClick: function () {
                  window.focus();
                  this.close();
              }
            });
            let refreshButton = $('.newPostAdded');
            if (refreshButton) {
              refreshButton.remove();
            }
            $('.allPosts:first').before(`<div class="newPostAdded"><button class="new-fetch" type="submit">+${diffQuestions} new posts</button></div>`);
            $('.new-fetch').on('click', (event) => {
              event.preventDefault();
              window.location.reload(true);
            });
            sw=diffQuestions;
          }

        }
      },
      error: error => {
        console.error('Error ocurred while updating new posts');
      }
    });
  }, 3000);
};

$(document).ready(() => {
  checkNewContent();
});
