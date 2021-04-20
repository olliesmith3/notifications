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

$id = $_POST['id'];

$sql = "UPDATE notifications SET is_read = 1 WHERE id = '$id'";

if ($conn->query($sql) === TRUE) {
  echo "Read status updated";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>