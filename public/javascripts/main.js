let sw=0;
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
          if (sw==0){
            console.log("DENTRO")
            Push.create("There is new notifications!", {
              body: "Hey, what are you waiting to go?",
              icon: '',
              timeout: 4000,
              onClick: function () {
                  window.focus();
                  this.close();
              }
            });
            sw=1;
          }
          let refreshButton = $('.new-fetch');
          if (refreshButton) {
            refreshButton.remove();
          }
          $('.allPosts:first').before(`<div class="newPostAdded"><button class="new-fetch" type="submit">+${diffQuestions} new posts</button></div>`);
          $('.new-fetch').on('click', (event) => {
            event.preventDefault();
            window.location.reload(true);
          });
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
