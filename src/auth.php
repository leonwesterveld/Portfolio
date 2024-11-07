<?php
session_start();

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function restrictAccess() {
    if (!isLoggedIn()) {
        header("Location: index.php");
        exit();
    }
}