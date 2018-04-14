<?php 
/**Get the nutrition information for the user's meals */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

require('../mysqli_connect.php');
// $recipeID = $_POST['recipe_id'];
$recipeID = 558826;

if (!($stmt = $myconn->prepare("SELECT n.calories, n.protein, n.sugar, n.carbs, n.fat, n.sodium, n.servingSize, n.servingPrice, n.recipe_id FROM nutrition AS n WHERE n.recipe_id = ?"))) {
    echo "Prepare failed: (" . $myconn->errno . ") " . $myconn->error;
}
if (!$stmt->bind_param("i", $recipeID)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}
if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
$nutritionResult =$stmt -> get_result();
$nutrition = [];
while($row = mysqli_fetch_assoc($nutritionResult)){
    $row['calories']=addslashes($row['calories']);
    $row['protein']=addslashes($row['protein']);
    $row['sugar']=addslashes($row['sugar']);
    $row['carbs']=addslashes($row['carbs']);
    $row['fat']=addslashes($row['fat']);
    $row['sodium']=addslashes($row['sodium']);
    $row['servingSize']=addslashes($row['servingSize']);
    $row['servingPrice']=addslashes($row['servingPrice']);
    if(!is_numeric($row['recipe_id'])){
        print 'Invalid recipe ID from database';
        exit();
    };
    // print_r($row['recipe_id']);
    $nutrition[]=$row;
}
$encodedNutrition = json_encode($nutrition);
print_r($encodedNutrition);

?>