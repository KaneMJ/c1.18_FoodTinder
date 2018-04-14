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

/**Get the allergy and dietary restrictions for the user */

$restrictions=[];
if (!($stmt = $myconn->prepare("SELECT ua.allergy_name, u.diet FROM `user-allergy` AS ua JOIN `users` AS u ON u.ID = ua.user_id WHERE `user_id`= ? "))) {
    echo "Prepare failed: (" . $myconn->errno . ") " . $myconn->error;
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

$recipeQuery = "SELECT ra.recipe_id, rd.title, rd.image  FROM `recipe-allergy` AS ra JOIN `recipe-diet` AS rd ON ra.recipe_id = rd.recipe_id WHERE ";

forEach($allergens as $key => $value){
    if($value === '1'){
        $recipeQuery .= "ra.$key" .'='. $value .' AND ';
    };
};
$recipeQuery = substr($recipeQuery, 0, -4);
if($diet !== 'none'){
    $query .= " AND rd.$diet".'=1';
}

$recipeQuery .= " LIMIT 21";

$recipeOutput=[];
$result = mysqli_query($myconn, $recipeQuery);
while($row = mysqli_fetch_assoc($result)){
    $row['title']=addslashes($row['title']);
    $row['image']=addslashes($row['image']);
    if(!is_numeric($row['recipe_id'])){
        print 'Invalid recipe ID from database';
        exit();
    };
    
    $recipeOutput[]=$row;
}
$encodedRecipes= json_encode($recipeOutput);
print_r($encodedRecipes);

?>