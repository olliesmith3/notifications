jQuery(function($){
  var notifications = [];
  setInterval(function(){
    $.get( 'getNotifications.php', function(data){
      var obj = JSON.parse(data);
      for (let i = 0; i < obj.length; i++) {
        notifications.push(obj[i]);
        $.ajax({
          type: "POST",
          url: 'toggleRetrieved.php',
          data: {
            id: obj[i].id
            },
          success: function(data){
            console.log(data);
          }
        });
      }
    });
    console.log(notifications);
  },10000); 
});



// {id: "1", type: "email", foreign_id: "3", is_read: "0"}