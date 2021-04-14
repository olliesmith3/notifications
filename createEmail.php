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

$campaign_number = $_POST['campaign_number'];
$time = $_POST['timestamp_sent'];

$sql = "INSERT INTO emails (campaign_number, timestamp_sent) VALUES ('$campaign_number','$time')";

if ($conn->query($sql) === TRUE) {
  echo "New email created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>