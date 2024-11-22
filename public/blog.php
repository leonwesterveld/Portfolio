<?php
session_start();
require 'auth.php';
require_once 'config.php';
require 'header.php';

// Controleer of een blog-ID is opgegeven in de URL
if (!isset($_GET['id'])) {
    header("Location: index.php");
    exit();
}

$blogId = $_GET['id'];


// Haal het blogbericht op uit de database
$stmt = $conn->prepare("SELECT title, date, content, category FROM blogs WHERE id = ?");
$stmt->bind_param("i", $blogId);
$stmt->execute();
$result = $stmt->get_result();
$blog = $result->fetch_assoc();
$stmt->close();

// Controleer of het blogbericht bestaat
if (!$blog) {
    echo "<p>Blogbericht niet gevonden.</p>";
    exit();
}

// Toon het blogbericht
echo "<article>";
echo "<h2>{$blog['title']}</h2>";
echo "<p><small>Datum: {$blog['date']}</small></p>";
echo "<p><small>Categorie: {$blog['category']}</small></p>";
echo "<div>{$blog['content']}</div>";
echo "</article>";

// Haal de bijbehorende commentaren op
$stmt = $conn->prepare("SELECT comments.comment, comments.date, users.username 
                      FROM comments 
                      JOIN users ON comments.user_id = users.id 
                      WHERE comments.blog_id = ? 
                      ORDER BY comments.date DESC");
$stmt->bind_param("i", $blogId);
$stmt->execute();
$comments = $stmt->get_result();
$stmt->close();

// Toon de commentaren
echo "<section>";
echo "<h3>Reacties</h3>";

if ($comments->num_rows > 0) {
    while ($comment = $comments->fetch_assoc()) {
        echo "<div class='comment'>";
        echo "<p><strong>{$comment['username']}</strong> zei:</p>";
        echo "<p>{$comment['comment']}</p>";
        echo "<small>{$comment['date']}</small>";
        echo "</div>";
    }
} else {
    echo "<p>Er zijn nog geen reacties.</p>";
}
echo "</section>";

// Toon het reactieformulier indien de gebruiker is ingelogd
if (isLoggedIn()) {
    echo "<section>";
    echo "<h3>Plaats een reactie</h3>";
    echo "<form action='comment.php' method='post'>";
    echo "<input type='hidden' name='blog_id' value='$blogId'>";
    echo "<label for='comment'>Reactie:</label>";
    echo "<textarea id='comment' name='comment' required></textarea>";
    echo "<button type='submit'>Reactie plaatsen</button>";
    echo "</form>";
    echo "</section>";
} else {
    echo "<p><a href='login.php'>Log in</a> om een reactie te plaatsen.</p>";
}

?>
</main>