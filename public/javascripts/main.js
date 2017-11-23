var checkNewContent = function() {
  setInterval(() => {
    //axios.get('http://localhost:300/forum/check')
    //  .then(response => {
    //    var numCurrentQuest = document.getElementsByClassName('onePost').length;
    //    console.log(numCurrentQuest, response);
    //    if (numCurrentQuest - response > 0) {
    //      $('.allPosts:first').before(`<button class="new-fetch" type="submit">+${diffQuestions} new posts</button>`);
    //    }
    //  })
    //  .catch(error => {
    //    console.log(error);
    //  });
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/forum/check',
      cache: false,
      dataType: 'json',
      success: response => {
        let numResponse = response['results'].length;
        let numCurrentQuest = document.getElementsByClassName('onePost').length;
        console.log(numCurrentQuest,response['results'].length);
        let diffQuestions = response['results'].length - numCurrentQuest;
        if (diffQuestions> 0) {
          $('.allPosts:first').before(`<button class="new-fetch" type="submit">+${diffQuestions} new posts</button>`);
        }
      },
      error: err => {
        console.log(err);
      }
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
