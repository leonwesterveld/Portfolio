
const dark = document.getElementById("darkmode");
let darkMode = localStorage.getItem("darkMode") === "true";

function setColorScheme(scheme) {
    const root = document.documentElement.style;
    if (scheme === 'dark') {
        root.setProperty('--black', '#ffffff');
        root.setProperty('--blackST', '#ffffff9e');
        root.setProperty('--white', '#000000');
        root.setProperty('--orange', '#ffab40');
        document.body.style.backgroundImage = "url('/assets/img/portfoliodark.png')";
        document.getElementById("darkmode").innerText = "☽";
        const naam = document.getElementById("naam");
        if (naam) naam.style.filter = "invert(0%)";
    } else {
        root.setProperty('--black', '#000000');
        root.setProperty('--blackST', '#0000009e');
        root.setProperty('--white', '#ffffff');
        root.setProperty('--orange', '#ff5252');
        document.body.style.backgroundImage = "url('/assets/img/portfolio.png')";
        document.getElementById("darkmode").innerText = "☼";
        const naam = document.getElementById("naam");
        if (naam) naam.style.filter = "invert(100%)";
    }
    darkMode = scheme === 'dark';
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