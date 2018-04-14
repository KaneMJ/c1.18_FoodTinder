<?php

$entityBody = file_get_contents('php://input');
$request_data = json_decode($entityBody, true);

session_id($request_data['session_ID']);
session_start();
require('../mysqli_connect.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

// $userID=$_SESSION['user_id'];
$userID=13;
if(!is_numeric($userID)){
    print 'Invalid user ID';
    exit();
};

// $recipeIDList=[];
$allIngredientsOutput=[];

if (!($stmt = $myconn->prepare("SELECT ing.ingredient, ing.amount, ing.unit_type, ing.recipe_id FROM `user_choices` AS uc JOIN `ingredients` AS ing ON uc.recipe_id = ing.recipe_id WHERE `user_id`= ? "))) {
    echo "Prepare failed: (" . $myconn->errno . ") " . $myconn->error;
}
if (!$stmt->bind_param("i", $userID)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}
if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
$allIngredientsResult = $stmt -> get_result();
while($row = mysqli_fetch_assoc($allIngredientsResult)){
    $row['ingredient']=addslashes($row['ingredient']);
    $row['amount']=addslashes($row['amount']);
    $row['unit_type']=addslashes($row['unit_type']);
    if(!is_numeric($row['recipe_id'])){
        print 'Invalid recipe ID from database';
        exit();
    };
    $allIngredientsOutput[]=$row;
}
$allIngredientsEncoded = json_encode($allIngredientsOutput);
print_r($allIngredientsEncoded);

?>