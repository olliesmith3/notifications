$( document ).ready(function() {
  getNotifications();
});

$(function(){
  setInterval(function(){
    getNotifications();
  },10000); 
}); 

function getNotifications() {
  var objects = [];
  $.ajax({
    type: "GET",
    url: '/redeye/server/getNotificationSettings.php',
    data: {
      user_id: 1
    },
    success: function(data3){
      let settings = JSON.parse(data3);
      $.when( $.ajax({
        type: "GET",
        url: '/redeye/server/getNotifications.php',
        data: {
          email_notifications_on: settings.email_notifications_on,
          calculation_notifications_on: settings.calculation_notifications_on
        }
      })).done(function(data){
        let notifications = JSON.parse(data);
        if (notifications.length == 0) {
          noNotifications();
        } else {
          for (let index = 0; index < notifications.length; index++) {
            if (notifications[index].type == "email") {
              $.when($.ajax({
                type: "GET",
                url: '/redeye/server/getEmailContent.php',
                data: {
                  id: notifications[index].foreign_id
                },
                success: function(data2){
                  formatEmailHTML(notifications, objects, data2, index);
                }
              })).done(function(){
                if (objects.length == notifications.length) {
                  formatNotifications(objects);
                }
              });
            } else if (notifications[index].type == "calculation") {
              $.when($.ajax({
                type: "GET",
                url: '/redeye/server/getCalculationContent.php',
                data: {
                  id: notifications[index].foreign_id
                },
                success: function(data2){
                  formatCalculationHTML(notifications, objects, data2, index);
                }
              })).done(function(){
                if (objects.length == notifications.length) {
                  formatNotifications(objects);
                }
              });
            }
          }
        }
      });
    }
  })
}

function compare( a, b ) {
  if ( a.time < b.time ){
    return 1;
  }
  if ( a.time > b.time ){
    return -1;
  }
  return 0;
}

function formatCalculationHTML(notifications, objects, data2, index) {
  obj = JSON.parse(data2);
  var row = `<tr>
    <td>Calculation ${obj.name} was completed at ${formatDateTime(obj.timestamp_finished)}</td>
    <td><button onclick="markAsRead(${notifications[index].id})">Mark As Read</button></td> 
  </tr>`;
  let object = {time: obj.timestamp_finished, html: row};
  objects.push(object);
}

function formatEmailHTML(notifications, objects, data2, index) {
  obj = JSON.parse(data2);
  let row = `<tr>
    <td>Campaign Number ${obj.campaign_number} sent at ${formatDateTime(obj.timestamp_sent)}</td>
    <td><button onclick="markAsRead(${notifications[index].id})">Mark As Read</button></td> 
  </tr>`;
  let object = {time: obj.timestamp_sent, html: row};
  objects.push(object);
}

function noNotifications() {
  $("#notifications").html("<br />You do not have any unread notifications<br />");
}

function formatNotifications(objects) {
  var html = "";
  sortedNotifications = objects.sort( compare );
  for (let i = 0; i < objects.length; i++) {
    html += sortedNotifications[i].html;
  }
  var output = `<table>
  <tr>
    <th>Notifications</th>
    <th></th> 
  </tr>${html}</table>`
  $("#notifications").html(output);
}

function formatDateTime(unformattedDate) {
  let dateString = unformattedDate.slice(0,10) + "T" + unformattedDate.slice(11,19);
  let options = { year: "numeric", month: "long", day: "numeric" }
  let formattedDate = new Date(dateString).toLocaleDateString(undefined, options)
  return `${unformattedDate.slice(11,16)} on ${formattedDate}`
}

function markAsRead(id) {
  $.when( $.ajax({
    type: "POST",
    url: '/redeye/server/markAsRead.php',
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

function markAllAsRead() {
  $.when( $.ajax({
    type: "POST",
    url: '/redeye/server/markAllAsRead.php',
    success: function(data){
      console.log(data);
    }
  })).done(function(){
    getNotifications();
  });
}
