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


$imagelocation = $name = $price = $want = $location_longi = $location_lati = "";

if($_SERVER["REQUEST_METHOD"] = "POST"){
        $imagelocation = $_POST[imagelocation];
	$name = $_POST[name];
        
	$price = $_POST[price];
	$want = $_POST[want];
	$location_longi = $_POST[location_longi];
	$location_lati = $_POST[location_lati];

};
function test_input($data){
                $data = trim($data);
                $data = stripslashes($data);
                $data = htmlspecialchars($data);
  		return $data;
}


// sql to create table
$sql = "
insert into Shopping (imagelocation,name,price,want,location_longi,location_lati)
values ('$imagelocation','$name','$price','$want','$location_longi','$location_lati')";

if ($conn->query($sql) === TRUE) {
//	header('Location: index.html');
} 
else{
    echo "Error inserting item in table: " . $conn->error;
}


$conn->close();
 ?>
 
