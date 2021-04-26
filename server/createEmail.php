<?php
include 'database.php';

$campaign_number = $_POST['campaign_number'];
$min_age = $_POST['min_age'];
$max_age = $_POST['max_age'];
$time = $_POST['timestamp_sent'];

if ($stmt = $mysqli->prepare("INSERT INTO emails (campaign_number, min_age, max_age, timestamp_sent) VALUES (?,?,?,?)")) {
  if ( false===$stmt ) {
    die('prepare() failed: ' . htmlspecialchars($mysqli->error));
  }

  $rc = $stmt->bind_param("ssss", $campaign_number, $min_age, $max_age, $time);
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