<form action='/redeye/server/changeSettings.php' method='post' id='settings-form' >
  <label for="email-checkbox">Email Notifications On?</label><br>
  <label class="switch">
    <input type="checkbox" id="email-checkbox" name="email-checkbox" >
    <span class="slider round"></span>
  </label><br />
  <label for="calculation-checkbox">Calculation Notifications On?</label><br>
  <label class="switch">
    <input type="checkbox" id="calculation-checkbox" name="calculation-checkbox" >
    <span class="slider round"></span>
  </label><br />
  <input type="hidden" name="user_id" value=1>
  <button id='submit-settings'>Save Changes</button>
  <p id='settings-result'></p>
</form>
<script >
var url = "changeSettings.js";
$.getScript(url);
</script>
