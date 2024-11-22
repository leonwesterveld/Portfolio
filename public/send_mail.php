<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form inputs
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Validate email
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Email details
        $to_admin = "leonwesterveld12@gmail.com"; // Replace with your email
        $subject = "New Contact Message from $name";
        $body = "You have received a new message from the contact form on your website.\n\n";
        $body .= "Name: $name\n";
        $body .= "Email: $email\n";
        $body .= "Message:\n$message\n";
        
        // Headers for sending email to you (admin)
        $headers_admin = "From: noreply@leonwesterveld.nl\r\n";
        $headers_admin .= "Reply-To: $email\r\n";

        // Send email to you (admin)
        mail($to_admin, $subject, $body, $headers_admin);

        // Send confirmation email to the user
        $to_user = $email;
        $subject_user = "Thank you for contacting us, $name";
        $body_user = "Dear $name,\n\n";
        $body_user .= "Thank you for reaching out to us. We have received your message and will get back to you soon.\n\n";
        $body_user .= "Your Message:\n$message\n\n";
        $body_user .= "Best regards,\nLeon Westerveld";

        // Headers for sending email to the user
        $headers_user = "From: noreply@leonwesterveld.nl\r\n";
        $headers_user .= "Reply-To: noreply@leonwesterveld.nl\r\n";

        // Send email to the user
        mail($to_user, $subject_user, $body_user, $headers_user);

        // Success message
        echo "Message sent successfully!";
    } else {
        echo "Invalid email format.";
    }
} else {
    echo "Invalid request.";
}
?>