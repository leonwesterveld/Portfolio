<?php
session_start();
require_once 'config.php';

$error = '';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $stmt = $conn->prepare("SELECT id, password_hash, role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($userId, $passwordHash, $role);
        $stmt->fetch();
        
        if (password_verify($password, $passwordHash)) {
            $_SESSION['user_id'] = $userId;
            $_SESSION['email'] = $email;
            $_SESSION['role'] = $role;
            header("Location: inlog.php");
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


<h2>Inloggen</h2>

<?php if ($error): ?>
    <p style="color: red;"><?php echo $error; ?></p>
    <?php endif; ?>
    
    <form class="blogForm" action="login.php" method="post">
        <label for="email">E-mail:</label>
        <input type="text" id="email" name="email" required>
        
        <label for="password">Wachtwoord:</label>
        <input type="password" id="password" name="password" required>
        
        <button type="submit">Inloggen</button>
    </form>
    </section>
    
    