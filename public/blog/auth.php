<?php

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function restrictAccess() {
    if (!isLoggedIn()) {
        header("Location: login.php");
        exit();
    }
}