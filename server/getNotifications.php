<?php
$servername = "localhost";
$username = "olliesmith";
$password = "redeye";
$dbname = "redeye";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} 

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

$result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));

$emparray = array();
while($row =mysqli_fetch_assoc($result))
{
    $emparray[] = $row;
}

echo json_encode($emparray);

/* close connection */
$conn->close();
?>
