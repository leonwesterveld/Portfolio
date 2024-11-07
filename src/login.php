<?php
session_start();
require 'db.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $db->prepare("SELECT id, password_hash, role FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($userId, $passwordHash, $role);
        $stmt->fetch();

        if (password_verify($password, $passwordHash)) {
            $_SESSION['user_id'] = $userId;
            $_SESSION['username'] = $username;
            $_SESSION['role'] = $role;
            header("Location: index.php");
            exit();
        } else {
            $error = 'Ongeldig wachtwoord.';
        }
    } else {
        $error = 'Gebruiker niet gevonden.';
    }

    $stmt->close();
}
?>

<?php include 'header.php'; ?>

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

<h2>Inloggen</h2>

<?php if ($error): ?>
    <p style="color: red;"><?php echo $error; ?></p>
<?php endif; ?>

<form action="login.php" method="post">
    <label for="username">Gebruikersnaam:</label>
    <input type="text" id="username" name="username" required>

    <label for="password">Wachtwoord:</label>
    <input type="password" id="password" name="password" required>

    <button type="submit">Inloggen</button>
</form>

