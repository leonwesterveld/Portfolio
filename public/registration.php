<?php
session_start();
require_once 'config.php';
require 'header.php';

$error = '';
$success = '';


// Controleer of het formulier is ingediend
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $confirmPassword = trim($_POST['confirm_password']);

    // Validatie van gebruikersnaam en wachtwoord
    if (empty($username) || empty($password) || empty($confirmPassword)) {
        $error = 'Vul alle velden in.';
    } elseif ($password !== $confirmPassword) {
        $error = 'De wachtwoorden komen niet overeen.';
    } else {
        // Controleer of de gebruikersnaam al bestaat
        $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $error = 'Gebruikersnaam bestaat al. Kies een andere naam.';
        } else {
            // Voeg de nieuwe gebruiker toe aan de database
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            $role = 'user';  // Standaard rol voor nieuwe gebruikers

            $stmt = $conn->prepare("INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $username, $passwordHash, $role);

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

<!-- Toon foutmelding of succesbericht indien aanwezig -->
<?php if ($error): ?>
    <p style="color: red;"><?php echo $error; ?></p>
<?php elseif ($success): ?>
    <p style="color: green;"><?php echo $success; ?></p>
<?php endif; ?>

<!-- Registratieformulier -->
<form action="registration.php" method="post">
    <label for="username">Gebruikersnaam:</label>
    <input type="text" id="username" name="username" required>

    <label for="password">Wachtwoord:</label>
    <input type="password" id="password" name="password" required>

    <label for="confirm_password">Bevestig Wachtwoord:</label>
    <input type="password" id="confirm_password" name="confirm_password" required>

    <button type="submit">Registreren</button>
</form>

