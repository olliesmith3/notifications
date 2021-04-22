$( document ).ready(function() {
  getNotifications();
});

$(function(){
  setInterval(function(){
    getNotifications();
  },10000); 
}); 

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
