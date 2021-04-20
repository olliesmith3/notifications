jQuery(function($){
  setInterval(function(){
    getNotifications();
  },10000); 
}); 

const getNotifications = () => {
  var notifications = [];
  var html = ""
  $.when( $.get( '/redeye/server/getNotifications.php' )).done(function(data){
    notifications = JSON.parse(data);
    console.log(notifications);
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].type == "email") {
        $.when($.ajax({
          type: "GET",
          url: '/redeye/server/getEmailContent.php',
          data: {
            id: notifications[i].foreign_id
          },
          success: function(data2){
            obj = JSON.parse(data2);
            let row = `<tr>
              <td>Campaign Number ${obj.campaign_number} sent at ${formatDateTime(obj.timestamp_sent)}</td>
              <td><button onclick="markAsRead(${notifications[i].id})">Mark As Read</button></td> 
            </tr>`;
            html += row;
          }
        })).done(function(){
          var output = `<table>
          <tr>
            <th>Notification</th>
            <th></th> 
          </tr>${html}</table>`
          $("#notifications").html(output);
        });
      } else if (notifications[i].type == "calculation") {
        $.when($.ajax({
          type: "GET",
          url: '/redeye/server/getCalculationContent.php',
          data: {
            id: notifications[i].foreign_id
          },
          success: function(data2){
            obj = JSON.parse(data2);
            var row = `<tr>
              <td>Calculation ${obj.name} was completed at ${formatDateTime(obj.timestamp_finished)}</td>
              <td><button onclick="markAsRead(${notifications[i].id})">Mark As Read</button></td> 
            </tr>`;
            html += row;
          }
        })).done(function(){
          var output = `<table>
          <tr>
            <th>Notification</th>
            <th></th> 
          </tr>${html}</table>`
          $("#notifications").html(output);
        });
      }
    }
  });
}

const getEmailContent = (notifications, html, index) => {
  
}

$( document ).ready(function() {
  console.log( "ready!" );
  getNotifications();
});

const formatDateTime = (unformattedDate) => {
  let dateString = unformattedDate.slice(0,10) + "T" + unformattedDate.slice(11,19);
  let options = { year: "numeric", month: "long", day: "numeric" }
  let formattedDate = new Date(dateString).toLocaleDateString(undefined, options)
  return `${unformattedDate.slice(11,16)} on ${formattedDate}`
}

const markAsRead = (id) => {
  $.when( $.ajax({
    type: "POST",
    url: '/redeye/server/toggleRead.php',
    data: {
      id: id
    },
    success: function(data){
      console.log(data);
    }
  })).done(function(){
    getNotifications();
  });
}

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
