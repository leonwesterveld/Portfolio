<?php
require_once 'auth.php';
?>
<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://kit.fontawesome.com/b273e788b2.js" crossorigin="anonymous"></script>
    <title>Portfolio Leon Westerveld</title>
    <link rel="stylesheet" href="../assets/css/style.css" />
    <script src="../assets/js/darkmode.js" defer></script>
    <link rel="preload" href="../assets/img/tekst.png" as="image" />
</head>

<body>
    <header class="menu">
        <button class="hover" id="darkmode">☼</button>
        <a href="../index.html" class="hover" id="home">🏠︎</a>
    </header>
<main id="blog" class="invert">
    <section class="blog__section">
        <div class="blog__menu">
            <a class="hover" href="inlog.php">Blogs</a>
            <?php if (isLoggedIn()): ?>
                <a class="hover" href="logout.php"><i class="fa-regular fa-user"></i></a>
            <?php else: ?>
                <a class="hover" href="login.php"><i class="fa-solid fa-user"></i></a>
            <?php endif; ?>
            <a class="hover" href="registration.php">registration</a>
        </div>