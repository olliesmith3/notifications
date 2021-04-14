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

$name = $_POST['name'];
$time = $_POST['timestamp_finished'];

$sql = "INSERT INTO calculations (name, timestamp_finished) VALUES ('$name','$time')";

if ($conn->query($sql) === TRUE) {
  echo "New calculation created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>