<?php
session_start();
require_once 'auth.php';
require_once 'config.php';

if(isLoggedIn())
require_once 'header.php';
restrictAccess();

$blogs = $conn->query("SELECT id, title, date, intro FROM blogs ORDER BY date DESC");

foreach ($blogs as $blog) {
    echo "<article>";
    echo "<h2><a href='blog.php?id={$blog['id']}'>{$blog['title']}</a></h2>";
    echo "<p>{$blog['date']}</p>";
    echo "<p>{$blog['intro']}</p>";
    echo "</article>";
}
?>
</main>