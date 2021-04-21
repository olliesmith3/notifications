$( document ).ready(function() {
  console.log( "ready!" );
  getNotifications();
});

$(function($){
  setInterval(function(){
    getNotifications();
  },10000); 
}); 

const getNotifications = () => {
  var objects = [];
  $.when( $.get( '/redeye/server/getNotifications.php' )).done(function(data){
    let notifications = JSON.parse(data);
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
  });
}

const compare = ( a, b ) => {
  if ( a.time < b.time ){
    return 1;
  }
  if ( a.time > b.time ){
    return -1;
  }
  return 0;
}

const formatCalculationHTML = (notifications, objects, data2, index) => {
  obj = JSON.parse(data2);
  var row = `<tr>
    <td>Calculation ${obj.name} was completed at ${formatDateTime(obj.timestamp_finished)}</td>
    <td><button onclick="markAsRead(${notifications[index].id})">Mark As Read</button></td> 
  </tr>`;
  let object = {time: obj.timestamp_finished, html: row};
  objects.push(object);
}

const formatEmailHTML = (notifications, objects, data2, index) => {
  obj = JSON.parse(data2);
  let row = `<tr>
    <td>Campaign Number ${obj.campaign_number} sent at ${formatDateTime(obj.timestamp_sent)}</td>
    <td><button onclick="markAsRead(${notifications[index].id})">Mark As Read</button></td> 
  </tr>`;
  let object = {time: obj.timestamp_sent, html: row};
  objects.push(object);
}

const formatNotifications = (objects) => {
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
