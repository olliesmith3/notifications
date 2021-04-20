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

$id = $_GET['id'];

$sql = "SELECT 'email' AS type, campaign_number, timestamp_sent FROM emails WHERE id = '$id'";

$result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));

$result2 = mysqli_fetch_assoc($result);

echo json_encode($result2);

/* close connection */
$conn->close();
?>