$( document ).ready(function() {
  getNotifications();
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function openNotifications() {
  $.get( '/redeye/client/notifications.php', function( data ) {
    $( "#app" ).html( data );
  });
}

function openForms() {
  $.get( '/redeye/client/forms.php', function( data ) {
    $( "#app" ).html( data );
  });
}

function openSettings() {
  $.get( '/redeye/client/settings.php', function( data ) {
    $( "#app" ).html( data );
  });
}

function getNotifications() {
  var readObjects = [];
  var objects = [];
  $.ajax({
    type: "GET",
    url: '/redeye/server/getNotificationSettings.php',
    data: {
      user_id: 1
    },
    success: function(data3){
      let settings = JSON.parse(data3);
      if (settings.show_read_on == 1) {
        $.ajax({
          type: "GET",
          url: '/redeye/server/getReadNotifications.php',
          data: {
            email_notifications_on: settings.email_notifications_on,
            calculation_notifications_on: settings.calculation_notifications_on
          },
          success: function(data4){
            let readNotifications = JSON.parse(data4);
            for (let index = 0; index < readNotifications.length; index++) {
              if (readNotifications[index].type == "email") {
                getEmailContent(readNotifications, index, readObjects, true);
              } else if (readNotifications[index].type == "calculation") {
                getCalculationContent(readNotifications, index, readObjects, true);
              }
            }
          } 
        })
      }
      $.when( $.ajax({
        type: "GET",
        url: '/redeye/server/getNotifications.php',
        data: {
          email_notifications_on: settings.email_notifications_on,
          calculation_notifications_on: settings.calculation_notifications_on
        }
      })).done(function(data){
        let notifications = JSON.parse(data);
        $("#notification-count").html(` ${notifications.length}`);
        if (notifications.length == 0) {
          noNotifications();
        } else {
          for (let index = 0; index < notifications.length; index++) {
            if (notifications[index].type == "email") {
              getEmailContent(notifications, index, objects, false);
            } else if (notifications[index].type == "calculation") {
              getCalculationContent(notifications, index, objects, false);
            }
          }
        }
      });
    }
  })
}

function getEmailContent(notifications, index, objects, is_read) {
  $.when($.ajax({
    type: "GET",
    url: '/redeye/server/getEmailContent.php',
    data: {
      id: notifications[index].foreign_id
    },
    success: function(data2){
      formatEmailHTML(notifications, objects, data2, index, is_read);
    }
  })).done(function(){
    if (objects.length == notifications.length) {
      formatNotifications(objects, is_read);
    }
  })
}


function getCalculationContent(readNotifications, index, readObjects, is_read) {
  $.when($.ajax({
    type: "GET",
    url: '/redeye/server/getCalculationContent.php',
    data: {
      id: readNotifications[index].foreign_id
    },
    success: function(data2){
      formatCalculationHTML(readNotifications, readObjects, data2, index, is_read);
    }
  })).done(function(){
    if (readObjects.length == readNotifications.length) {
      formatNotifications(readObjects, is_read);
    }
  });
};


function compare( a, b ) {
  if ( a.time < b.time ){
    return 1;
  }
  if ( a.time > b.time ){
    return -1;
  }
  return 0;
}

function formatCalculationHTML(notifications, objects, data2, index, is_read) {
  obj = JSON.parse(data2);
  var row = `<tr><td>Calculation ${obj.name} was completed at ${formatDateTime(obj.timestamp_finished)}</td>`
  if (is_read) {
    row += `<td></td></tr>`;
  } else {
    row += `<td><button onclick="markAsRead(${notifications[index].id})">Mark As Read</button></td></tr>`;
  }
  let object = {time: obj.timestamp_finished, html: row};
  objects.push(object);
}

function formatEmailHTML(notifications, objects, data2, index, is_read) {
  obj = JSON.parse(data2);
  var row = `<tr><td>Email with Campaign Number ${obj.campaign_number} sent at ${formatDateTime(obj.timestamp_sent)}</td>`
  if (is_read) {
    row += `<td></td></tr>`;
  } else {
    row += `<td><button onclick="markAsRead(${notifications[index].id})">Mark As Read</button></td></tr>`;
  }
  let object = {time: obj.timestamp_sent, html: row};
  objects.push(object);
}

function noNotifications() {
  $("#notifications").html("<br />You do not have any unread notifications<br />");
}

function formatNotifications(objects, is_read) {
  var html = "";
  sortedNotifications = objects.sort( compare );
  for (let i = 0; i < objects.length; i++) {
    html += sortedNotifications[i].html;
  }
  var output = `<table>
  <tr>
    <th>${is_read ? "Read Notifications" : "Notifications"}</th>
    <th></th> 
  </tr>${html}</table>`
  if (is_read) {
    $("#readNotifications").html(output);
  } else {
    $("#notifications").html(output);
  }
}

function formatDateTime(unformattedDate) {
  let dateString = unformattedDate.slice(0,10) + "T" + unformattedDate.slice(11,19);
  let options = { year: "numeric", month: "long", day: "numeric" }
  let formattedDate = new Date(dateString).toLocaleDateString(undefined, options)
  return `${unformattedDate.slice(11,16)} on ${formattedDate}`
}