<?php
include 'database.php';

$name = $_POST['name'];
$time = $_POST['timestamp_finished'];

if ($stmt = $mysqli->prepare("INSERT INTO calculations (name, timestamp_finished) VALUES (?,?)")) {
  if ( false===$stmt ) {
    die('prepare() failed: ' . htmlspecialchars($mysqli->error));
  }

  $rc = $stmt->bind_param("ss", $name, $time);
  if ( false===$rc ) {
    die('bind_param() failed: ' . htmlspecialchars($stmt->error));
  }

  $rc = $stmt->execute();
  if ( false===$rc ) {
    die('execute() failed: ' . htmlspecialchars($stmt->error));
  } else {
    echo "New calculation created successfully";
  }

  $stmt->close();
} 

$mysqli->close();
?>