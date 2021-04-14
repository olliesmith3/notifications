<html>
<head>
<title>Contour Notifications</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel="stylesheet" href="index.css">
</head>
<body>
<div class="flexWrap">
  <div class="flexCol">
    <form action='createCalculation.php' method='post' id='calculation-form' >
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
    <form action='createEmail.php' method='post' id='email-form' >
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
<script src="handleFormSubmit.js"></script>

<div>
  <span id='notifications'></span>
</div>
<script src="getNotifications.js"></script>

</body>
</html>
