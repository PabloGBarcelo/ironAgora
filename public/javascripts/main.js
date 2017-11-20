const ironAgoraAPI = new APIHandler("http://localhost:3000/login");

$(document).ready(() => {
  ironAgoraAPI.checkUserLoggedIn();
});
