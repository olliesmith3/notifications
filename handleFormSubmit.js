$('#calculation-form').submit(function(){
  return false;
});

$('#submit-calculation').click(function(){
  $.post( 
  $('#calculation-form').attr('action'),
  $('#calculation-form :input').serializeArray(),
  function(result){
    $('#calculation-result').html(result);
  }
  );
});

$('#email-form').submit(function(){
  return false;
});

$('#submit-email').click(function(){
  $.post( 
  $('#email-form').attr('action'),
  $('#email-form :input').serializeArray(),
  function(result){
    $('#email-result').html(result);
  }
  );
});