jQuery(function($){
  setInterval(function(){
    $.get( 'getNotifications.php', function(data){
      $('#notifications').html( data );
    });
  },5000); 
});