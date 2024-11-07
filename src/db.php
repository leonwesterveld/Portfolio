<?php
$db = new mysqli("db", "root", "root", "portfolio_db"); 

if ($db->connect_error) {
    die("Verbindingsfout: " . $db->connect_error);
}
?>
