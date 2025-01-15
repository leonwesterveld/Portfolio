
const dark = document.getElementById("darkmode");
let darkMode = localStorage.getItem("darkMode") === "true";

function setColorScheme(scheme) {
    const root = document.documentElement.style;

    if (scheme === 'dark') {
        root.setProperty('--black', '#ffffff');
        root.setProperty('--blackST', '#ffffff9e');
        root.setProperty('--white', '#000000');
        root.setProperty('--orange', '#00adad');
        root.setProperty('--ccc', '#333333');
        root.setProperty('--ddd', '#222222');
        root.setProperty('--blue', '#ff8400');
        root.setProperty('--red', '#00cccc');
        root.setProperty('--blur', '#ffffff33');
        root.setProperty('--blurr', '#ffffff1a');
        document.body.style.backgroundImage = "url('/assets/img/portfoliodark.png')";
        document.getElementById("darkmode").innerText = "☽";
        const naam = document.getElementById("naam");
        if (naam) naam.style.filter = "invert(0%)";
        const socials = document.querySelectorAll(".socials");
        if (socials) {
            socials.forEach((social) => {
                social.style.filter = "invert(100%)";
            });
        }
        const circles = document.querySelectorAll(".bottom");
        circles.forEach((button) => {
            button.classList.add('inverted');
        });
    } else {
        root.setProperty('--black', '#000000');
        root.setProperty('--blackST', '#0000009e');
        root.setProperty('--white', '#ffffff');
        root.setProperty('--orange', '#ff5252');
        root.setProperty('--ccc', '#ccc');
        root.setProperty('--ddd', '#ddd');
        root.setProperty('--blue', '#007bff');
        root.setProperty('--red', '#ff3333');
        root.setProperty('--blur', '#00000033');
        root.setProperty('--blurr', '#0000001a');
        document.body.style.backgroundImage = "url('/assets/img/portfolio.png')";
        document.getElementById("darkmode").innerText = "☼";
        const naam = document.getElementById("naam");
        if (naam) naam.style.filter = "invert(100%)";
        const socials = document.querySelectorAll(".socials");
        if (socials) {
            socials.forEach((social) => {
                social.style.filter = "invert(0%)";
            });
        }
        const circles = document.querySelectorAll(".bottom");
        circles.forEach((button) => {
            button.classList.remove('inverted');
        });
    }
    const darkMode = scheme === 'dark';
    localStorage.setItem("darkMode", darkMode);
}

function updateColorScheme() {
    const scheme = darkMode === null 
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : (darkMode ? 'dark' : 'light');
    setColorScheme(scheme);
}

dark.onclick = () => {
    darkMode = !darkMode;
    updateColorScheme();
};

if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem("darkMode") === null) {
            darkMode = null;
            updateColorScheme();
        }
    });
}

updateColorScheme();