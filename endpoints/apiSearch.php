<?php
//lookup recipes - burgers


require __DIR__ . '/vendor/autoload.php';
use RapidApi\RapidApiConnect;
$rapid = new RapidApiConnect('ding_5abd42cae4b084deb4eac1cd', '/connect/auth/ding_5abd42cae4b084deb4eac1cd');
Unirest\Request::verifyPeer(false);
$response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?offset=0&diet=vegetarian&number=10&query=burger&excludeIngredients=coconut&type=main+course",
  array(
    "X-Mashape-Key" => "ctPBKJeb9MmshN8R3JwGbc9RxXhgp1lBAx0jsnYrEYZq29XdRS",
    "X-Mashape-Host" => 'spoonacular-recipe-food-nutrition-v1.p.mashape.com'
  )
);

$id = json_decode($response->raw_body)->results[0]->id;
?>





<?php
//lookup recipes by ID
require __DIR__ . '/vendor/autoload.php';
// use RapidApi\RapidApiConnect;
$rapid = new RapidApiConnect('ding_5abd42cae4b084deb4eac1cd', '/connect/auth/ding_5abd42cae4b084deb4eac1cd');
Unirest\Request::verifyPeer(false);
// $id = '492923';
$response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/".$id."/information?includeNutrition=true",
  array(
    "X-Mashape-Key" => "ctPBKJeb9MmshN8R3JwGbc9RxXhgp1lBAx0jsnYrEYZq29XdRS",
    "X-Mashape-Host" => "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
  )
);
$returnedItems = json_decode($response->raw_body, true);

$name = $returnedItems['title'];
$picSrc = $returnedItems['image'];
$unparsedIngredients = $returnedItems['extendedIngredients'];
$ingredlength = count($unparsedIngredients);
$ingredientsArray=Array();
print($name);
print($picSrc);
print('Ingredients: ');
for($i = 0; $i<$ingredlength; $i++){
  
  print($unparsedIngredients[$i]['amount']. $unparsedIngredients[$i]['unit'].' '. $unparsedIngredients[$i]['name']);
  ?><br><?php
  // $ingredientsArray[] = $unparsedIngredients[$i]['amount']. $unparsedIngredients[$i]['unit'].' '. $unparsedIngredients[$i]['name'];
}
$encoded = json_encode($ingredientsArray);

$unparsedSteps = $returnedItems['analyzedInstructions'][0]['steps'];
$stepsLength = count($unparsedSteps);
for($x=0; $x<$stepsLength; $x++){
  print('Step '.$unparsedSteps[$x]['number'].': '.$unparsedSteps[$x]['step']);
  ?><br><?php
}

?><br><?php

//nutrition
$response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/".$id."/nutritionWidget",
  array(
    "X-Mashape-Key" => "ctPBKJeb9MmshN8R3JwGbc9RxXhgp1lBAx0jsnYrEYZq29XdRS",
    "X-Mashape-Host" => "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
  )
);

print_r($response->raw_body);

?>