<div id="settings-div">
  <form action='/redeye/server/changeSettings.php' method='post' id='settings-form' >
    <label for="email-checkbox">Email Notifications On?</label><br>
    <label>
      <input type="checkbox" id="email-checkbox" name="email-checkbox" >
    </label><br />
    <label for="calculation-checkbox">Calculation Notifications On?</label><br>
    <label>
      <input type="checkbox" id="calculation-checkbox" name="calculation-checkbox" >
    </label><br />
    <input type="hidden" name="user_id" value=1>
    <label for="show-read-checkbox">Show Read Notifications?</label><br>
    <label>
      <input type="checkbox" id="show-read-checkbox" name="show-read-checkbox" >
    </label><br />
    <button id='submit-settings'>Save Changes</button>
    <p id='settings-result'></p>
  </form>
</div>
<script >
var url = "changeSettings.js";
$.getScript(url);
</script>
