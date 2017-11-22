var checkNewContent = function() {
  setInterval(() => {
    axios.get('/forum')
      .then(response => {
        var numCurrentQuest = document.getElementsByClassName('onePost').length;
        console.log(numCurrentQuest, response);
        if (numCurrentQuest - response.length > 0) {
          $('.allPosts:first').before(`<button class="new-fetch" type="submit">+${diffQuestions} new posts</button>`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, 3000);
};

$(document).ready(() => {

  checkNewContent();

  $('.new-fetch').on('click', (event) => {
    event.preventDefault();
    location.reload(true);
  });

});
