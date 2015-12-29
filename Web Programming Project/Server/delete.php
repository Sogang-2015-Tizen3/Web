<html>
<body>
<?php
$servername = "localhost";
$username = "cs20101666";
$password = "qwer1234";
$dbname = "db_20101666";

//error_reporting(E_ALL);
//ini_set("display_errors",1);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
 if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 

$id = "";

if($_SERVER["REQUEST_METHOD"] = "POST"){
		$id = $_POST[id];

};

// sql to create table
echo $id;
$sql = "delete from Shopping  where id = '$id'";

if ($conn->query($sql) === TRUE) {
}
else {
    echo "Error inserting item in table: " . $conn->error;
}
?>
</body>
</html>
