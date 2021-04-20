<?php
include 'database.php';

$campaign_number = $_POST['campaign_number'];
$time = $_POST['timestamp_sent'];

if ($stmt = $mysqli->prepare("INSERT INTO emails (campaign_number, timestamp_sent) VALUES (?,?)")) {
  if ( false===$stmt ) {
    die('prepare() failed: ' . htmlspecialchars($mysqli->error));
  }

  $rc = $stmt->bind_param("ss", $campaign_number, $time);
  if ( false===$rc ) {
    die('bind_param() failed: ' . htmlspecialchars($stmt->error));
  }

  $rc = $stmt->execute();
  if ( false===$rc ) {
    die('execute() failed: ' . htmlspecialchars($stmt->error));
  } else {
    echo "New email created successfully";
  }

  $stmt->close();
} 

$mysqli->close();
?>