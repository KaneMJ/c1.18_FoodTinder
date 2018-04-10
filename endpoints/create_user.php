<?php
require_once 'mysql_connect.php';
$_POST['email'] = "mkane4@something.com";
$_POST['password'] = "password";
$_POST['diet'] = "vegan";

$_POST['allergies'][] = 'peanut';
$_POST['allergies'][] = 'tree nut';




$email = $_POST['email'];
$password = $_POST['password'];
$diet = $_POST['diet'];


if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
    echo 'Your email is invalid';
} else {
    if (!preg_match('/^[a-zA-Z0-9]{8,32}$/', $password)){
        echo 'Password is not corect';
    } else {
        if ($diet !== 'vegan' && $diet !== 'vegetarian' && $diet !== 'normal' && $diet !== 'ketogenic'){
            echo 'We do not support that diet';
        } else {
            $stmt = $myconn->prepare("INSERT INTO `users`(`email`, `password`, `diet`) VALUES (?, ?, ?)");
            $stmt->bind_param('sss', $email, $password, $diet);
            $stmt->execute();
            if($stmt->affected_rows === 0) exit('No rows updated');
            $user_id = $stmt->insert_id;
            $stmt->close();
        }
    }
}
if ($user_id === 0){
    echo "User was not successfully added";
} else {
    $allergyCount = count($_POST['allergies']);

    if ($allergyCount > 0){
        for($count = 0; $count < $allergyCount; $count++){
            switch ($_POST['allergies']["$count"]){
                case 'dairy':
                    $userAllergies[] = 'dairy';
                    break;
                case 'egg':
                    $userAllergies[] = 'egg';
                    break;
                case 'gluten':
                    $userAllergies[] = 'gluten';
                    break;
                case 'peanut':
                    $userAllergies[] = 'peanut';
                    break;
                case 'seafood':
                    $userAllergies[] = 'seafood';
                    break;
                case 'sesame':
                    $userAllergies[] = 'sesame';
                    break;
                case 'shellfish':
                    $userAllergies[] = 'shellfish';
                    break;
                case 'soy':
                    $userAllergies[] = 'soy';
                    break;
                case 'tree nut':
                    $userAllergies[] = 'tree nut';
                    break;
                case 'wheat':
                    $userAllergies[] = 'wheat';
            }
        }
        $acceptedAllergyCount = count($userAllergies);

        for($countAccepted = 0; $countAccepted < $acceptedAllergyCount; $countAccepted++){
            $stmt = $myconn->prepare("INSERT INTO `allergy`(`allergy`,`user_id`) VALUES (?, ?)");
            $stmt->bind_param('si', $userAllergies[$countAccepted], $user_id);
            $stmt->execute();
            if($stmt->affected_rows === 0) exit('No rows updated');
            $stmt->close();
        }
    }
}
?>