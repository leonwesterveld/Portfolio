<?php
session_start();
require 'auth.php';
require 'db.php';

// Controleer of de gebruiker is ingelogd
if (!isLoggedIn()) {
    header("Location: login.php");
    exit();
}

// Controleer of het formulier is verzonden
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $blogId = $_POST['blog_id'];
    $userId = $_SESSION['user_id'];
    $commentText = trim($_POST['comment']);

    // Validatie
    if (empty($commentText)) {
        echo "Reactie mag niet leeg zijn.";
        exit();
    }

    // Voeg de reactie toe aan de database
    $stmt = $db->prepare("INSERT INTO comments (blog_id, user_id, comment) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $blogId, $userId, $commentText);

    if ($stmt->execute()) {
        // Omleiden naar het blogbericht
        header("Location: blog.php?id=$blogId");
        exit();
    } else {
        echo "Fout bij opslaan van reactie.";
    }

    $stmt->close();
} else {
    echo "Ongeldige aanvraagmethode.";
}

