<?php
include 'database.php';

$user_id = $_POST['user_id'];

$email_notifications_on = $_POST['email-checkbox'];
if ($email_notifications_on == "on") {
  $email_notifications_on = 1;
} else {
  $email_notifications_on = 0;
};
$calculation_notifications_on = $_POST['calculation-checkbox'];
if ($calculation_notifications_on == "on") {
  $calculation_notifications_on = 1;
} else {
  $calculation_notifications_on = 0;
};

if ($stmt = $mysqli->prepare("UPDATE notification_settings SET email_notifications_on = ?, calculation_notifications_on = ? WHERE user_id_ = ?")) {
  if ( false===$stmt ) {
    die('prepare() failed: ' . htmlspecialchars($mysqli->error));
  }

  $rc = $stmt->bind_param("sss", $email_notifications_on, $calculation_notifications_on, $user_id);
  if ( false===$rc ) {
    die('bind_param() failed: ' . htmlspecialchars($stmt->error));
  }

  $rc = $stmt->execute();
  if ( false===$rc ) {
    die('execute() failed: ' . htmlspecialchars($stmt->error));
  } else {
    echo "Settings updated successfully";
  }

  $stmt->close();
} 

$mysqli->close();
?>