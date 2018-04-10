<?php
require('mysqli_conn.php');
// $userID=$_SESSION['user_id'];
$userID=2;

$restrictions=[];
$restrictionQuery = "SELECT ua.allergy_name, u.diet 
        FROM `user-allergy` AS ua
        JOIN `users` AS u 
        ON u.ID=ua.user_id
        WHERE `user_id`=$userID";

$result = mysqli_query($conn, $restrictionQuery);
while($row = mysqli_fetch_assoc($result)){
    $restrictions[]=$row;
}
// print_r($restrictions);


$dairy = '0';
$egg = '0';
$gluten = '0';
$peanut = '0';
$seafood = '0';
$sesame = '0';
$shellfish = '0';
$soy = '0';
$tree_nut = '0';
$wheat = '0';

$count=count($restrictions);
for($i=0;$i<$count;$i++){
    $allergy=$restrictions[$i]['allergy_name'];
    switch($allergy){
        case 'dairy':
            $dairy ='1';
            break;
        case 'egg':
            $egg ='1';
            break;
        case 'gluten':
            $gluten ='1';
            break;
        case 'peanut':
            $peanut ='1';
            break;
        case 'seafood':
            $seafood ='1';
            break;
        case 'sesame':
            $sesame ='1';
            break;
        case 'shellfish':
            $shellfish ='1';
            break;
        case 'soy':
            $soy ='1';
            break;
        case 'tree nut':
            $tree_nut ='1';
            break;
        case 'wheat':
            $wheat ='1';
            break;
    }
}

$diet = $restrictions[0]['diet'];


$allergens = ['dairy' => $dairy, 'egg'=>$egg, 'gluten'=>$gluten, 
            'peanut'=>$peanut, 'seafood'=>$seafood, 'sesame'=> $sesame, 
            'shellfish'=>$shellfish, 'soy'=>$soy, 'tree_nut'=>$tree_nut, 'wheat'=>$wheat ];

$query = "SELECT ra.recipe_id, rd.title, rd.image  FROM `recipe-allergy` AS ra JOIN `recipe-diet` AS rd ON ra.recipe_id = rd.recipe_id WHERE ";


forEach($allergens as $key => $value){
    $query .= "ra.$key" .'='. $value .' AND ';
};
$query = substr($query, 0, -4);
$query .= " AND rd.$diet".'=1';
$query .= " LIMIT 20";
$output=[];
$result = mysqli_query($conn, $query);
while($row = mysqli_fetch_assoc($result)){
    $output[]=$row;
}


$recipeIDArray = [];
$recipeTitleArr = [];
$imageURLArr = [];

$count = count($output);
for($i = 0; $i<$count; $i++){
    $recipeIDArray[]=$output[$i]['recipe_id'];
    $recipeTitleArr[]=$output[$i]['title'];
    $imageURLArr[]=$output[$i]['image'];
};

// $query2 = "SELECT Distinct n.recipe_id, n.calories, n.protein, n.sugar, n.carbs, n.fat, n.sodium, n.servingSize, 
//             n.servingPrice, inst.step_num, inst.step, ing.ingredient, ing.amount, ing.unit_type 
//             FROM ingredients AS ing
//             JOIN instructions AS inst
//             ON ing.recipe_id=inst.recipe_id
//             JOIN nutrition AS n
//             ON ing.recipe_id=n.recipe_id WHERE ";
// forEach($recipeIDArray as $value){
//     $query2 .= "n.recipe_id" .'='. $value .' OR ';
// }
// $query2 = substr($query2, 0, -3);
// $output2=[];
// $result = mysqli_query($conn, $query2);
// while($row = mysqli_fetch_assoc($result)){
//     $output2[]=$row;
// };


$query2 = "SELECT n.calories, n.protein, n.sugar, n.carbs, n.fat, n.sodium, n.servingSize, 
            n.servingPrice, n.recipe_id
            FROM nutrition AS n
            WHERE ";
forEach($recipeIDArray as $value){
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
forEach($recipeIDArray as $value){
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
forEach($recipeIDArray as $value){
    $query4 .= "inst.recipe_id" .'='. $value .' OR ';
}
$query4 = substr($query4, 0, -3);
$output4=[];
$result = mysqli_query($conn, $query4);
while($row = mysqli_fetch_assoc($result)){
    $output4[]=$row;
};


$outputEncoded = json_encode($output);
$output2Encoded = json_encode($output2);
$output3Encoded = json_encode($output3);
$output4Encoded = json_encode($output4);


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
        if($output3[$z]['recipe_id']===$recipeIDArray[$y]){
            $ingredients[]=$output3[$z];
        }
    }
    for($z=0;$z<$instCount; $z++){
        if($output4[$z]['recipe_id']===$recipeIDArray[$y]){
            $instructions[]=$output4[$z];
        }
    }
    $finalOutput[$y][]=$ingredients;
    $finalOutput[$y][]=$instructions;
    
}
$finalOutputEncoded = json_encode($finalOutput);
print_r($finalOutputEncoded);

?>
