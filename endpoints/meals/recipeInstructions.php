<?php
/**Get the cooking instructions for the user's meals */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

require('../mysqli_connect.php');
$recipeID = $_POST['recipe_id'];
// $recipeID = 558826;

if (!($stmt = $myconn->prepare("SELECT inst.step_num, inst.step, inst.recipe_id FROM instructions AS inst WHERE inst.recipe_id = ?"))) {
    echo "Prepare failed: (" . $myconn->errno . ") " . $myconn->error;
}
if (!$stmt->bind_param("i", $recipeID)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}
if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
$instructionsResult =$stmt -> get_result();
$instructions = [];
while($row = mysqli_fetch_assoc($instructionsResult)){
    $row['step_num']=addslashes($row['step_num']);
    $row['step']=addslashes($row['step']);
    if(!is_numeric($row['recipe_id'])){
        print 'Invalid recipe ID from database';
        exit();
    };
    $instructions[]=$row;
}
$encodedInstructions = json_encode($instructions);
print_r($encodedInstructions);
?>