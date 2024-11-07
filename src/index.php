<?php
require_once 'auth.php';
require_once 'db.php';

if(isLoggedIn())
require_once 'header.php';
restrictAccess();

$blogs = $db->query("SELECT id, title, date, intro FROM blogs ORDER BY date DESC");
?>
<main id="blog" class="invert">
    <div class="blog__menu">
        <a class="hover" href="index.php">Blogs</a>
        <?php if (isLoggedIn()): ?>
            <a class="hover" href="logout.php"><i class="fa-regular fa-user"></i></a>
        <?php else: ?>
            <a class="hover" href="login.php"><i class="fa-solid fa-user"></i></a>
        <?php endif; ?>
        <a class="hover" href="registration.php">registration</a>
    </div>


<?php
foreach ($blogs as $blog) {
    echo "<article>";
    echo "<h2><a href='blog.php?id={$blog['id']}'>{$blog['title']}</a></h2>";
    echo "<p>{$blog['date']}</p>";
    echo "<p>{$blog['intro']}</p>";
    echo "</article>";
}
?>
</main>