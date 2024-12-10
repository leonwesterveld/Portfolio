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
        // Haal de e-mail van de gebruiker op
        $stmt = $conn->prepare("SELECT email FROM users WHERE id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $stmt->bind_result($email);
        $stmt->fetch();
        $stmt->close();

        // Verstuur een e-mail
        $to = $email;
        $subject = "Bedankt voor je reactie!";
        $message = "Bedankt voor je reactie op het blogbericht. Je reactie is succesvol geplaatst.";
        $headers = "From: no-reply@synchroncity.com";

        mail($to, $subject, $message, $headers);

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
?>
