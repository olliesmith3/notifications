$('#settings-form').submit(function(){
  return false;
});

$('#submit-settings').click(function(){
  $.post( 
  $('#settings-form').attr('action'),
  $('#settings-form :input').serializeArray(),
  function(result){
    $('#settings-result').html(result);
  }
  );
});

$( document ).ready(function() {
  $.ajax({
    type: "GET",
    url: '/redeye/server/getNotificationSettings.php',
    data: {
      user_id: 1
    },
    success: function(data) {
      let settings = JSON.parse(data);
      if (settings.email_notifications_on == 1) {
        $('#email-checkbox').prop('checked', true);
      }
      if (settings.calculation_notifications_on == 1) {
        $('#calculation-checkbox').prop('checked', true);
      }
      if (settings.show_read_on == 1) {
        $('#show-read-checkbox').prop('checked', true);
      }
    }
  })
});