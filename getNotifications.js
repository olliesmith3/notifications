jQuery(function($){
  var notifications = [];
  var notifications2 = [];
  setInterval(function(){
    $.get( 'getNotifications.php', function(data){
      notifications = JSON.parse(data);
    });
    if (notifications.length !== notifications2.length) {
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].type == "email") {
          $.ajax({
            type: "GET",
            url: 'getEmailContent.php',
            data: {
              id: notifications[i].foreign_id
            },
            success: function(data2){
              obj = JSON.parse(data2);
              notifications2.push(obj);
            }
          });
        } else if (notifications[i].type == "calculation") {
          $.ajax({
            type: "GET",
            url: 'getCalculationContent.php',
            data: {
              id: notifications[i].foreign_id
            },
            success: function(data2){
              obj = JSON.parse(data2);
              notifications2.push(obj);
            }
          });
        }
      }
    }
    console.log(notifications2);
    var ul = $('<ul>').appendTo('body');
    $(notifications2).each(function(index, notification) {
        ul.append(
            $(document.createElement('li')).text(notification)
        );
    });
//   },4000); 
// });

// jQuery(function($){
//   var notifications = [];
//   setInterval(function(){
//     $.get( 'getNotifications.php', function(data){
//       var obj = JSON.parse(data);
//       for (let i = 0; i < obj.length; i++) {
//         notifications.push(obj[i]);
//         $.ajax({
//           type: "POST",
//           url: 'toggleRetrieved.php',
//           data: {
//             id: obj[i].id
//             },
//           success: function(data){
//             console.log(data);
//           }
//         });
//       }
//     });

//     console.log(notifications);
//   },10000); 
// });
