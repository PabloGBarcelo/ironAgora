var addClap = function(path) {
  $.ajax({
    method: 'POST',
    url: path,
    dataType: 'json',
    success: response => {
      $('button[name|="clap"]').text(`+${response.claps}`);
    },
    error: error => {
      console.error('Error ocurred while adding clap');
    }
  });
};


$(document).ready(() => {
  $('button[name|="clap"]').on('click', (event) => {
    event.preventDefault();
    let path = $('#add-clap').attr('action');
    addClap(path);
  });
});
