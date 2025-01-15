<?php
session_start();
require_once 'auth.php';
require_once 'config.php';
require_once 'header.php';

// Controleer of de gebruiker is ingelogd
restrictAccess();

$stage = isset($_GET['stage']) ? $_GET['stage'] : null;

if (!$stage) {
    echo "<h2>Kies een stage:</h2>";
    echo "<a href='inlog.php?stage=1'>Stage 1</a> | <a href='inlog.php?stage=2'>Stage 2</a>";
    exit();
}

// Haal blogs op die bij de geselecteerde stage horen
$stmt = $conn->prepare("SELECT id, title, date, intro FROM blogs WHERE stage = ? ORDER BY date DESC");
$stmt->bind_param("i", $stage);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

echo "<h2>Blogs voor Stage $stage</h2>";
echo "<div class='blogContainer'>";

if ($result->num_rows > 0) {
    foreach ($result as $blog) {
        echo "<article class='blogArticle'>";
        echo "<h2><a href='blog.php?id={$blog['id']}'>{$blog['title']}</a></h2>";
        echo "<p>{$blog['date']}</p>";
        echo "<p>{$blog['intro']}</p>";
        echo "</article>";
    }
} else {
    echo "<p>Geen blogs gevonden voor Stage $stage.</p>";
}

echo "</div>";

// Alleen admins kunnen blogs plaatsen
if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin') {
    echo "<a href='add_blog.php'>Voeg een nieuwe blog toe</a>";
}
?>
