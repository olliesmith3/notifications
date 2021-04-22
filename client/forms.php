<div class="flexWrap">
  <div class="flexCol">
    <form action='/redeye/server/createCalculation.php' method='post' id='calculation-form' >
      <p>
      <input type='text' name='name' placeholder='Calulation Name' id='name' />
      </p>
      
      <p>
      <input type='text' name='timestamp_finished' placeholder='Time Finished' id='timestamp_finished' />
      </p>
      
      <button id='submit-calculation'>Create Calculation</button>
      
      <p id='calculation-result'></p>
    </form>
  </div>
  <div class="flexCol">
    <form action='/redeye/server/createEmail.php' method='post' id='email-form' >
      <p>
      <input type='text' name='campaign_number' placeholder='Campaign Number' id='campaign_number' />
      </p>
      
      <p>
      <input type='text' name='timestamp_sent' placeholder='Time Sent' id='timestamp_sent' />
      </p>
      
      <button id='submit-email'>Create Email</button>
      
      <p id='email-result'></p>
    </form>
  </div>
</div>
<script>
var url = "handleFormSubmit.js";
$.getScript(url);
</script>