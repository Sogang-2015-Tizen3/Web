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

 
$sql = "
select * from Shopping;";

$result = $conn->query($sql);
if($result->num_rows >0){
	while($row = $result->fetch_assoc()){
		echo $row["id"] . "#" . $row["imagelocation"] . "#" . $row["name"] . "#" . $row["price"] ."#".$row["want"].'#'. $row["location_longi"]."#".$row["location_lati"]."#".$row["reg_date"]."#";

	}
}
else{
	echo "0 results";
}

 
