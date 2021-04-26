<?php
include 'database.php';

$id = $_GET['id'];

if ($stmt = $mysqli->prepare("SELECT 'email' AS type, campaign_number, min_age, max_age, timestamp_sent FROM emails WHERE id = ?")) {
  if ( false===$stmt ) {
    die('prepare() failed: ' . htmlspecialchars($mysqli->error));
  }

  $rc = $stmt->bind_param("s", $id);
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