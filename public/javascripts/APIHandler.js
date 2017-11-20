class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  checkUserLoggedIn() {
    return $.ajax({
      method: 'GET',
      url: this.BASE_URL,
      //dataType: 'json'
    });
  }
}
