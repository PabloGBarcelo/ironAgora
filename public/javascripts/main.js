const ironAgoraAPI = new APIHandler("http://learn.ironhack.com/api/user");

$(document).ready(() => {
  ironAgoraAPI.checkUserLoggedIn();
});
