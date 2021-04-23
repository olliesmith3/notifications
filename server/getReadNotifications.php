<?php
include 'database.php';

$email_notifications_on = $_GET['email_notifications_on'];
$calculation_notifications_on = $_GET['calculation_notifications_on'];

if ($email_notifications_on == 1 and $calculation_notifications_on == 1) {
  $sql = "SELECT id, type, foreign_id FROM notifications WHERE is_read=1 ORDER BY id LIMIT 10";
} elseif ($email_notifications_on == 1 and $calculation_notifications_on == 0) {
  $sql = "SELECT id, type, foreign_id FROM notifications WHERE is_read=1 AND NOT type = 'calculation' ORDER BY id LIMIT 10";
} elseif ($email_notifications_on == 0 and $calculation_notifications_on == 1) {
  $sql = "SELECT id, type, foreign_id FROM notifications WHERE is_read=1 AND NOT type = 'email' ORDER BY id LIMIT 10";
} else {
  $sql = "SELECT id, type, foreign_id FROM notifications WHERE is_read=1 AND NOT type = 'email' AND NOT type = 'calculation' ORDER BY id LIMIT 10";
}

if ($stmt = $mysqli->prepare($sql)) {
  if ( false===$stmt ) {
    die('prepare() failed: ' . htmlspecialchars($mysqli->error));
  }

  $rc = $stmt->execute();

  $result = $stmt->get_result();
  
  $emparray = array();
  while ($row = $result->fetch_assoc()) {
    $emparray[] = $row;
  }

  echo json_encode($emparray);

  $stmt->close();
} 

$mysqli->close();
?>