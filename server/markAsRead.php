<?php
include 'database.php';

$id = $_POST['id'];

if ($stmt = $mysqli->prepare("UPDATE notifications SET is_read = 1 WHERE id = ?")) {
  if ( false===$stmt ) {
    die('prepare() failed: ' . htmlspecialchars($mysqli->error));
  }

  $rc = $stmt->bind_param("s", $id);
  if ( false===$rc ) {
    die('bind_param() failed: ' . htmlspecialchars($stmt->error));
  }

  $rc = $stmt->execute();
  if ( false===$rc ) {
    die('execute() failed: ' . htmlspecialchars($stmt->error));
  } else {
    echo "Email marked as read";
  }

  $stmt->close();
} 

$mysqli->close();
?>
