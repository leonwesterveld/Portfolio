window.onload = function () {
    let img = document.getElementById("naam");
    setTimeout(() => {
        img.src = "/assets/img/tekst.png";
    }, 1900);

};

const knop = document.querySelectorAll(".knop");

const projects = document.getElementById("projects");
const about = document.getElementById("about");
const contact = document.getElementById("contact");
const blog = document.getElementById("blog");
const button__projects = document.getElementById("button__projects");
const button__about = document.getElementById("button__about");
const button__contact = document.getElementById("button__contact");
const button__blog = document.getElementById("button__blog");
const home_button = document.getElementById("home");
let pressed = false;

for (let i = 0; i < knop.length; i++) {
    knop[i].addEventListener("click", () => {

        let main;
        if (pressed === false) {
            if (knop[i] === button__projects) {
                main = projects;
                createTabs();
                window.location.href = 'projects.html';
            } else if (knop[i] === button__about) {
                main = about;
                window.location.href = 'about.html';
            } else if (knop[i] === button__contact) {
                main = contact;
                window.location.href = 'contact.html';
            } else if (knop[i] === button__blog) {
                main = blog;
                window.location.href = 'inlog.php';
            }
            pressed = true;
        }

    });
}
home_button.addEventListener("click", () => {
    const home = document.getElementById("homepage");
    setTimeout(() => {
        home.style.filter = darkMode ? "invert(100%)" : "invert(0%)";
    }, 610);

    const sections = [projects, about, contact, blog];
    sections.forEach((section) => {
        if (section) {
            window.location.href = '/index.html';
        }
    });
    pressed = false;
});

