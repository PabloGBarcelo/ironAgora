$(document).ready(() => {
  axios.get('/user/question')
    .then((response) => {
      var numCurrentQuest = document.getElementsByClassName('onePost').length;
      console.log(numCurrentQuest, response);
      var diffQuestions = numCurrentQuest - response.length;
      if (diffQuestions !== 0) {
        $('.allPosts').before(`<button type="submit">+${diffQuestions} new posts</a>`);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  
});
