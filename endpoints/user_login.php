<?php
require_once 'mysql_connect.php';
$_POST['email'] = "mkane3@something.com";
$_POST['password'] = "password";

$email = $_POST['email'];
$password = $_POST['password'];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
    echo 'Your email is invalid';
} else {
    if (!preg_match('/^[a-zA-Z0-9]{8,32}$/', $password)){
        echo 'Password is not corect';
    } else {
        $stmt = $myconn->prepare("SELECT `id`, `email`, `status` FROM `users` WHERE `email` = ? AND `password` = ? LIMIT 1");
        $stmt->bind_param('ss', $email, $password);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($user_id, $username, $status);
        if($stmt->num_rows > 0) {
            if($stmt->fetch()){
                if($status === 'banned'){
                    echo "you have been banned";
                } else {
                    $_SESSION['logged'] = 1;
                    $_SESSION['user_id'] = $user_id;
                    $_SESSION['username'] = $username;
                    echo 'Success!';
                    exit();
                }
            }
        } else {
            echo "invalid username/password Combination";
        }
        $stmt->close();
    } 
}
$myconn->close();