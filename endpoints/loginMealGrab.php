<?php
session_start();
require('mysqli_conn.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

/*there be dragons here*/

/*
 * Utility function to automatically bind columns from selects in prepared statements to 
 * an array
 */
function bind_result_array($stmt)
{
    $meta = $stmt->result_metadata();
    $result = array();
    while ($field = $meta->fetch_field())
    {
        $result[$field->name] = NULL;
        $params[] = &$result[$field->name];
    }
 
    call_user_func_array(array($stmt, 'bind_result'), $params);
    return $result;
}
 
/**
 * Returns a copy of an array of references
 */
function getCopy($row)
{
    return array_map(create_function('$a', 'return $a;'), $row);
}





// $userID=$_SESSION['user_id'];
$userID=2;
if(!is_numeric($userID)){
    print 'Invalid user ID';
    exit;
};

/**Get all the current meals for the user */
$recipeIDList=[];
$allergyOutput=[];

// if (!($stmt = $conn->prepare("SELECT recipe_id, title FROM `user_choices` WHERE `user_id`= ? "))) {
//     echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
// }
if (!($stmt = $conn->prepare("SELECT 4 AS test, 'hello' AS moo"))) {
    echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
}
// if (!$stmt->bind_param("i", $userID)) {
//     echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
// }
if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
//$allergyResult = $stmt -> get_result();
$row = bind_result_array($stmt);
print_r($row); die('peace!');
while($row = $stmt->fetch_assoc()){
    $row['title']=addslashes($row['title']);
    $recipeID = $row['recipe_id'];
    if(!is_numeric($recipeID)){
        print 'Invalid recipe ID';
        exit;
    };
    $allergyOutput[]=$row;
}


$allergyCount = count($allergyOutput);
for($i = 0; $i<$allergyCount; $i++){
    $recipeIDList[]=$allergyOutput[$i]['recipe_id'];
};

/**Get the nutrition information for the user's meals */

if (!($stmt = $conn->prepare("SELECT n.calories, n.protein, n.sugar, n.carbs, n.fat, n.sodium, n.servingSize, n.servingPrice, n.recipe_id FROM nutrition AS n WHERE n.recipe_id = ?"))) {
    echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
}
if (!$stmt->bind_param("i", $value)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

$nutritionResult =[];
forEach($recipeIDList as $value){
    if (!$stmt->execute()) {
        echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
    $nutritionResult[] =$stmt -> get_result();
    
}

$output2=[];
$nutritionCount = count($nutritionResult);
for($r=0; $r<$nutritionCount; $r++){
    while($row = mysqli_fetch_assoc($nutritionResult[$r])){
        $row['calories']=addslashes($row['calories']);
        $row['protein']=addslashes($row['protein']);
        $row['sugar']=addslashes($row['sugar']);
        $row['carbs']=addslashes($row['carbs']);
        $row['fat']=addslashes($row['fat']);
        $row['sodium']=addslashes($row['sodium']);
        $row['servingSize']=addslashes($row['servingSize']);
        $row['servingPrice']=addslashes($row['servingPrice']);
        $recipeID = $row['recipe_id'];
        if(!is_numeric($recipeID)){
            print 'Invalid recipe ID';
            exit;
        };
        $output2[]=$row;
    };
}
/**Get the ingredients for the user's meals */

if (!($stmt = $conn->prepare("SELECT ing.ingredient, ing.amount, ing.unit_type, ing.recipe_id FROM ingredients AS ing WHERE ing.recipe_id = ?"))) {
    echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
}
if (!$stmt->bind_param("i", $value)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

$ingredientsResult =[];
forEach($recipeIDList as $value){
    if (!$stmt->execute()) {
        echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
    $ingredientsResult[] =$stmt -> get_result();
}

$output3=[];

$ingredientsCount = count($ingredientsResult);
for($r=0; $r<$ingredientsCount; $r++){
    while($row = mysqli_fetch_assoc($ingredientsResult[$r])){
        $row['ingredient']=addslashes($row['ingredient']);
        $row['amount']=addslashes($row['amount']);
        $row['unit_type']=addslashes($row['unit_type']);
        $recipeID = $row['recipe_id'];
        // if(!is_numeric($recipeID)){
        //     print 'Invalid recipe ID';
        //     exit;
        // };
        
        $output3[]=$row;
    };
}

/**Get the cooking instructions for the user's meals */

if (!($stmt = $conn->prepare("SELECT inst.step_num, inst.step, inst.recipe_id FROM instructions AS inst WHERE inst.recipe_id = ?"))) {
    echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
}
if (!$stmt->bind_param("i", $value)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

$instructionsResult =[];
forEach($recipeIDList as $value){
    if (!$stmt->execute()) {
        echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
    $instructionsResult[] =$stmt -> get_result();
}

$output4=[];

$instructionsCount = count($instructionsResult);
for($r=0; $r<$instructionsCount; $r++){
    while($row = mysqli_fetch_assoc($instructionsResult[$r])){
        $row['step_num']=addslashes($row['step_num']);
        $row['step']=addslashes($row['step']);
        $recipeID = $row['recipe_id'];
        // if(!is_numeric($recipeID)){
        //     print 'Invalid recipe ID';
        //     exit;
        // };        
        $output4[]=$row;
    };
}

/**Package all the info in a legible JSON object */
$count = count($allergyOutput);
$finalOutput = [];
for($x=0; $x<$count; $x++){
    $finalOutput[] = [];
}
$finalCount = count($finalOutput);
$instCount = count($output4);
$ingrCount = count($output3);
for($y=0; $y<$finalCount; $y++){
    $instructions=[];
    $ingredients=[];
    $finalOutput[$y][]=$allergyOutput[$y];
    $finalOutput[$y][]=$output2[$y];
    for($z=0;$z<$ingrCount; $z++){
        if($output3[$z]['recipe_id']===$recipeIDList[$y]){
            $ingredients[]=$output3[$z];
        }
    }
    for($z=0;$z<$instCount; $z++){
        if($output4[$z]['recipe_id']===$recipeIDList[$y]){
            $instructions[]=$output4[$z];
        }
    }
    $finalOutput[$y][]=$ingredients;
    $finalOutput[$y][]=$instructions;
}
$finalOutputEncoded = json_encode($finalOutput);
print_r($finalOutputEncoded);

?>
