<?php
include 'database.php';

$email_notifications_on = $_GET['email_notifications_on'];
$calculation_notifications_on = $_GET['calculation_notifications_on'];

if ($email_notifications_on == 1 and $calculation_notifications_on == 1) {
  $sql = "SELECT id, type, foreign_id, is_read FROM notifications WHERE is_read=0";
} elseif ($email_notifications_on == 1 and $calculation_notifications_on == 0) {
  $sql = "SELECT id, type, foreign_id, is_read FROM notifications WHERE is_read=0 AND NOT type = 'calculation'";
} elseif ($email_notifications_on == 0 and $calculation_notifications_on == 1) {
  $sql = "SELECT id, type, foreign_id, is_read FROM notifications WHERE is_read=0 AND NOT type = 'email'";
} else {
  $sql = "SELECT id, type, foreign_id, is_read FROM notifications WHERE is_read=0 AND NOT type = 'email' AND NOT type = 'calculation'";
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
