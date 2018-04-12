<?php
session_start();
require('mysqli_conn.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

// $userID=(int)$_SESSION['user_id'];
$userID=2;
if(!is_numeric($userID)){
    print 'Invalid user ID';
    exit;
}

/**Get the allergy and dietary restrictions for the user */

$restrictions=[];
if (!($stmt = $conn->prepare("SELECT ua.allergy_name, u.diet FROM `user-allergy` AS ua JOIN `users` AS u ON u.ID = ua.user_id WHERE `user_id`= ? "))) {
    echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
}
if (!$stmt->bind_param("i", $userID)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}
if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
$result = $stmt -> get_result();

while($row = mysqli_fetch_assoc($result)){
    $restrictions[]=$row;
}

$allergens = ['dairy' => '0', 'egg'=>'0', 'gluten'=>'0', 
            'peanut'=>'0', 'seafood'=>'0', 'sesame'=> '0', 
            'shellfish'=>'0', 'soy'=>'0', 'tree_nut'=>'0', 'wheat'=>'0' ];

$count=count($restrictions);
for($i=0;$i<$count;$i++){
    $allergy=$restrictions[$i]['allergy_name'];
    if (array_key_exists($allergy, $allergens)){
        $allergens[$allergy] = '1';
    }
}

$diet = $restrictions[0]['diet'];

/**Get recipes from database that meet the dietary restrictions found in the previous section*/

$query = "SELECT ra.recipe_id, rd.title, rd.image  FROM `recipe-allergy` AS ra JOIN `recipe-diet` AS rd ON ra.recipe_id = rd.recipe_id WHERE ";

forEach($allergens as $key => $value){
    if($value === '1'){
        $query .= "ra.$key" .'='. $value .' AND ';
    };
};
$query = substr($query, 0, -4);
$query .= " AND rd.$diet".'=1';
$query .= " LIMIT 21";

$output=[];
$result = mysqli_query($conn, $query);

while($row = mysqli_fetch_assoc($result)){
    $row['title']=addslashes($row['title']);
    $row['image']=addslashes($row['image']);

    $recipeID = $row['recipe_id'];
    if(!is_numeric($recipeID)){
        print 'Invalid recipe ID';
        exit;
    };
    
    $output[]=$row;
}

$recipeIDArray = [];

$count = count($output);
for($i = 0; $i<$count; $i++){
    $recipeIDArray[]=$output[$i]['recipe_id'];
};

/**Get the nutrition information for the user's meals */

if (!($stmt = $conn->prepare("SELECT n.calories, n.protein, n.sugar, n.carbs, n.fat, n.sodium, n.servingSize, n.servingPrice, n.recipe_id FROM nutrition AS n WHERE n.recipe_id = ?"))) {
    echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
}
if (!$stmt->bind_param("i", $value)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

$nutritionResult =[];
forEach($recipeIDArray as $value){
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
forEach($recipeIDArray as $value){
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
forEach($recipeIDArray as $value){
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

$finalOutput = [];

for($x=0; $x<$count; $x++){
    $finalOutput[] = [];
}

$finalcount = count($finalOutput);
$instCount = count($output4);
$ingrCount = count($output3);

for($y=0; $y<$finalcount; $y++){
    $instructions=[];
    $ingredients=[];
    $finalOutput[$y][]=$output[$y]; //recipe id, title, image
    $finalOutput[$y][]=$output2[$y]; //nutrition

    for($z=0;$z<$ingrCount; $z++){
        if($output3[$z]['recipe_id']==$recipeIDArray[$y]){
            $ingredients[]=$output3[$z];
        }
    }

    for($z=0;$z<$instCount; $z++){
        if($output4[$z]['recipe_id']==$recipeIDArray[$y]){
            $instructions[]=$output4[$z];

        }
    }
    $finalOutput[$y][]=$ingredients;
    $finalOutput[$y][]=$instructions; 
}
$finalOutputEncoded = json_encode($finalOutput);
print_r($finalOutputEncoded);

?>
