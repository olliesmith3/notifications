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

$sql = "SELECT 'calculation' AS type, name, timestamp_finished FROM calculations WHERE id = '$id'";

$result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));

$result2 = mysqli_fetch_assoc($result);

echo json_encode($result2);

/* close connection */
$conn->close();
?>