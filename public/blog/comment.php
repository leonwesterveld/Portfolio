<?php
session_start();
require 'auth.php';
require_once 'config.php';

if (!isLoggedIn()) {
    header("Location: login.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $blogId = $_POST['blog_id'];
    $userId = $_SESSION['user_id'];
    $commentText = trim($_POST['comment']);

    if (empty($commentText)) {
        echo "Reactie mag niet leeg zijn.";
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO comments (blog_id, user_id, comment) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $blogId, $userId, $commentText);

    if ($stmt->execute()) {
        header("Location: blog.php?id=$blogId");
        exit();
    } else {
        echo "Fout bij opslaan van reactie.";
    }

    $stmt->close();
} else {
    echo "Ongeldige aanvraagmethode.";
}
?>
