function updateContent(content) {

    // Contact Section
    document.querySelector("#contact h2").textContent = content.contact.title;
    document.querySelector('label[for="name"]').textContent = content.contact.nameLabel;
    document.querySelector('label[for="email"]').textContent = content.contact.emailLabel;
    document.querySelector('label[for="message"]').textContent = content.contact.messageLabel;
    document.querySelector('button[type="submit"]').textContent = content.contact.submitButton;

    // Social Links
    document.querySelector(".social-links h3").textContent = content.social.followMe;
}
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent default form submission

    // Get form data
    const formData = new FormData(this);

    // Send form data to PHP script using fetch
    fetch('send_mail.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            // Check if the server responded with success
            if (data.includes("Message sent successfully")) {
                // Clear the form fields
                document.getElementById('contactForm').reset();

                // Show a success message to the user
                const confirmationMessage = document.createElement('p');
                confirmationMessage.textContent = "Sent :)";
                confirmationMessage.style.color = "green";

                // Replace the form with the success message
                const formContainer = document.querySelector('.contact-container');
                formContainer.innerHTML = '';  // Clear the form container
                formContainer.appendChild(confirmationMessage);  // Add success message
            } else {
                // Handle failure case
                alert("There was a problem sending your message. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem sending your message. Please try again.');
        });
});