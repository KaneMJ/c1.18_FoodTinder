<?php 
require('mysqli_conn.php');
// $userID=$_SESSION['user_id'];
$userID=2;
$recipeIDList=[];
$output=[];
$query = "SELECT recipe_id, title FROM `user_choices` WHERE `user_id`=$userID";

$result = mysqli_query($conn, $query);
while($row = mysqli_fetch_assoc($result)){
    $output[]=$row;
}
// print_r($output);

$count = count($output);
for($i = 0; $i<$count; $i++){
    $recipeIDList[]=$output[$i]['recipe_id'];

};

// print_r($recipeIDList);

$query2 = "SELECT n.calories, n.protein, n.sugar, n.carbs, n.fat, n.sodium, n.servingSize, 
            n.servingPrice, n.recipe_id
            FROM nutrition AS n
            WHERE ";
forEach($recipeIDList as $value){
    $query2 .= "n.recipe_id" .'='. $value .' OR ';
}
$query2 = substr($query2, 0, -3);
$output2=[];
$result = mysqli_query($conn, $query2);
while($row = mysqli_fetch_assoc($result)){
    $output2[]=$row;
};


$query3 = "SELECT ing.ingredient, ing.amount, ing.unit_type, ing.recipe_id
            FROM ingredients AS ing 
            WHERE ";
forEach($recipeIDList as $value){
    $query3 .= "ing.recipe_id" .'='. $value .' OR ';
}
$query3 = substr($query3, 0, -3);
$output3=[];
$result = mysqli_query($conn, $query3);
while($row = mysqli_fetch_assoc($result)){
    $output3[]=$row;
};


$query4 = "SELECT inst.step_num, inst.step, inst.recipe_id
            FROM instructions AS inst 
            WHERE ";
forEach($recipeIDList as $value){
    $query4 .= "inst.recipe_id" .'='. $value .' OR ';
}
$query4 = substr($query4, 0, -3);
$output4=[];
$result = mysqli_query($conn, $query4);
while($row = mysqli_fetch_assoc($result)){
    $output4[]=$row;
};



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
    $finalOutput[$y][]=$output[$y];
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

//successfully got IDs for user, need to pull recipes with those numbers.

?>