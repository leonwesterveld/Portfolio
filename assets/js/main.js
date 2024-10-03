window.onload = function () {
    let img = document.getElementById("naam");
    setTimeout(() => {
        img.src = "/assets/img/tekst.png";
    }, 1900);

    applyHoverEffects();
};


const knop = document.querySelectorAll(".knop");

const projects = document.getElementById("projects");
const about = document.getElementById("about");
const contact = document.getElementById("contact");
const button__projects = document.getElementById("button__projects");
const button__about = document.getElementById("button__about");
const button__contact = document.getElementById("button__contact");
const home_button = document.getElementById("home");
let pressed = false;



for (let i = 0; i < knop.length; i++) {
    knop[i].addEventListener("click", () => {
        const home = document.getElementById("homepage");
        if (home) {
            home.style.filter = "blur(20rem)";
            home.style.opacity = "0";
            setTimeout(() => {
                home.style.display = "none";
            }, 600);
        }

        let main;
        if (pressed === false) {
            if (knop[i] === button__projects) {
                main = projects;
                createTabs();
            } else if (knop[i] === button__about) {
                main = about;
            } else if (knop[i] === button__contact) {
                main = contact;
            }
            setTimeout(() => {
                main.style.display = "flex";
            }, 600);
            setTimeout(() => {
                main.style.filter = "blur(0)";
                main.style.opacity = "1";
            }, 610);
            pressed = true;
        }
    });
}
home_button.addEventListener("click", () => {
    const home = document.getElementById("homepage");
    
    setTimeout(() => {
        home.style.display = "flex";
    }, 600);
    setTimeout(() => {
        home.style.filter = darkMode ? "invert(100%)" : "invert(0%)";
        home.style.opacity = "1";
    }, 610);
    
    const sections = [projects, about, contact];
    sections.forEach(section => {
        if (section) {
            section.style.filter = "blur(20rem)";
            section.style.opacity = "0";
            setTimeout(() => {
                section.style.display = "none";
            }, 600);
        }
    });
    pressed = false;
});


document.getElementById('mailtoButton').addEventListener('click', function(event) {
    event.preventDefault();

    // Get form values
    const about = document.getElementById('About').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate form fields
    if (about === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Create the mailto link
    const subject = encodeURIComponent(about);
    const body = encodeURIComponent(`${message}`);
    const mailtoLink = `mailto:leonwesterveld12@gmail.com?subject=${subject}&body=${body}`;

    // Open the user's email client
    window.location.href = mailtoLink;
});