<?php
include 'database.php';

if ($stmt = $mysqli->prepare("UPDATE notifications SET is_read = 1 WHERE is_read = 0")) {
  if ( false===$stmt ) {
    die('prepare() failed: ' . htmlspecialchars($mysqli->error));
  }

  $rc = $stmt->execute();
  if ( false===$rc ) {
    die('execute() failed: ' . htmlspecialchars($stmt->error));
  } else {
    echo "All emails marked as read";
  }

  $stmt->close();
} 

$mysqli->close();
?>