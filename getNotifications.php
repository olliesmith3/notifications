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

$sql = "SELECT type, foreign_id, is_read FROM notifications WHERE retrieved=0";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo $row["type"]. "," . $row["foreign_id"]. "," . $row["is_read"]. "<br>";
  }
} else {
  echo "0 results";
}

$conn->close();
?>
