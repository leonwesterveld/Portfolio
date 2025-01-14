<?php
session_start();
require_once 'config.php';
require 'header.php';

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirmPassword = trim($_POST['confirm_password']);

    if (empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
        $error = 'Vul alle velden in.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Ongeldig e-mailadres.';
    } elseif ($password !== $confirmPassword) {
        $error = 'De wachtwoorden komen niet overeen.';
    } else {
        $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $error = 'Gebruikersnaam of e-mailadres bestaat al. Kies een andere.';
        } else {
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            $role = 'user';

            $stmt = $conn->prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $username, $email, $passwordHash, $role);

            if ($stmt->execute()) {
                $success = 'Registratie geslaagd! Je kunt nu <a href="login.php">inloggen</a>.';
            } else {
                $error = 'Er is een fout opgetreden tijdens de registratie.';
            }
        }
        $stmt->close();
    }
}
?>

<h2>Registreren</h2>
<?php if ($error): ?>
    <p style="color: red;"><?php echo $error; ?></p>
<?php elseif ($success): ?>
    <p style="color: green;"><?php echo $success; ?></p>
<?php endif; ?>

<form class="blogForm" action="registration.php" method="post">
    <label for="username">Gebruikersnaam:</label>
    <input type="text" id="username" name="username" required>

    <label for="email">E-mailadres:</label>
    <input type="email" id="email" name="email" required>

    <label for="password">Wachtwoord:</label>
    <input type="password" id="password" name="password" required>

    <label for="confirm_password">Bevestig Wachtwoord:</label>
    <input type="password" id="confirm_password" name="confirm_password" required>

    <button type="submit">Registreren</button>
</form>

</section>