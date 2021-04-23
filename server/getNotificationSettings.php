<?php
include 'database.php';

$user_id = $_GET['user_id'];

if ($stmt = $mysqli->prepare("SELECT email_notifications_on, calculation_notifications_on, show_read_on FROM notification_settings WHERE user_id_ = ?")) {
  if ( false===$stmt ) {
    die('prepare() failed: ' . htmlspecialchars($mysqli->error));
  }

  $rc = $stmt->bind_param("s", $user_id);
  if ( false===$rc ) {
    die('bind_param() failed: ' . htmlspecialchars($stmt->error));
  }

  $rc = $stmt->execute();

  $result = $stmt->get_result();
  
  while ($row = $result->fetch_assoc()) {
    echo json_encode($row);
  }

  $stmt->close();
} 

$mysqli->close();
?>

