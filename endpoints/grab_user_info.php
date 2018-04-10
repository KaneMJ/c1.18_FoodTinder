<?php
require_once 'mysql_connect.php';
$_POST['id'] = "33";
$user_id = intval($_POST['id']);

if (!preg_match('/^[0-9]+$/', $user_id)){
    echo "This is not a valid number";
} else {
    $stmt = $myconn->prepare("SELECT * FROM `user_choices` WHERE `user_id` = ?");
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $stmt->store_result();
    if($stmt->num_rows === 0) exit('No Rows');
    $stmt->bind_result($idRow, $userIdRow, $recipeIdRow, $choiceNumRow, $completeRow);
    while ($stmt->fetch()) {
        $ids[] = $idRow;
        $userIds[] = $userIdRow;
        $recipeIds[] = $recipeIdRow;
        $choiceNums[] = $choiceNumRow;
        $completeRows[] = $completeRow;
    }
    var_export($ids);
    $stmt->close();
}
?>