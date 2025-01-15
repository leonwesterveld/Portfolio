<?php
session_start();
require_once 'auth.php';
require_once 'config.php';
require_once 'header.php';

// Controleer of de gebruiker een admin is
if ($_SESSION['role'] !== 'admin') {
    echo "<p>Toegang geweigerd. Alleen admins kunnen blogs toevoegen.</p>";
    exit();
}

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title']);
    $content = trim($_POST['content']);
    $stage = intval($_POST['stage']);
    $category = trim($_POST['category']);
    $intro = substr($content, 0, 100) . '...'; // Korte intro genereren

    if (empty($title) || empty($content) || empty($stage) || empty($category)) {
        $error = "Alle velden moeten worden ingevuld.";
    } else {
        $stmt = $conn->prepare("INSERT INTO blogs (title, content, stage, category, intro, date) VALUES (?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param("ssiss", $title, $content, $stage, $category, $intro);

        if ($stmt->execute()) {
            $success = "Blog succesvol toegevoegd!";
            
            // E-mail versturen naar alle gebruikers
            $userQuery = "SELECT email FROM users"; // Zorg dat 'users' je juiste tabel is
            $result = $conn->query($userQuery);

            if ($result->num_rows > 0) {
                $subject = "Nieuwe blogpost: $title";
                $message = "Hallo,\n\nEr is een nieuwe blogpost gepubliceerd: $title.\n\nIntro:\n$intro\n\nBekijk de volledige post op mijn website!\nleonwesterveld.nl";
                $headers = "From: admin@jouwwebsite.com"; // Verander dit naar je echte e-mailadres

                while ($row = $result->fetch_assoc()) {
                    mail($row['email'], $subject, $message, $headers);
                }
            }
        } else {
            $error = "Er is een fout opgetreden tijdens het toevoegen van de blog.";
        }
        $stmt->close();
    }
}
?>

<h2>Nieuwe Blog Toevoegen</h2>

<?php if ($error): ?>
    <p style="color: red;"><?php echo $error; ?></p>
<?php elseif ($success): ?>
    <p style="color: green;"><?php echo $success; ?></p>
<?php endif; ?>

<form class="blogForm" action="add_blog.php" method="post">
    <label for="title">Titel:</label>
    <input type="text" id="title" name="title" required>

    <label for="content">Inhoud:</label>
    <textarea id="content" name="content" required></textarea>

    <label for="stage">Stage:</label>
    <select id="stage" name="stage" required>
        <option value="1">Stage 1</option>
        <option value="2">Stage 2</option>
    </select>

    <label for="category">Categorie:</label>
    <input type="text" id="category" name="category" required>

    <button type="submit">Blog Toevoegen</button>
</form>

</section>