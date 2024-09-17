/* darkmode en taal */
const htmltag = document.querySelector("html");
const invertElements = document.getElementsByClassName("invert");


function applyDarkMode(darkMode) {
    document.body.style.backgroundImage = darkMode
        ? "url('assets/img/portfoliodark.png')"
        : "url('assets/img/portfolio.png')";
        for (let i = 0; i < invertElements.length; i++) {
            invertElements[i].style.filter = darkMode ? "invert(100%)" : "invert(0%)";
        }


    document.getElementById("darkmode").style.rotate = darkMode ? "360deg" : "0deg";
    document.getElementById("darkmode").innerText = darkMode ? "☽" : "☼";
}

function applyLanguage(lang) {
    htmltag.setAttribute("lang", lang ? "en" : "nl");
    document.getElementById("taal").innerText = lang ? "EN" : "NL";
}

let darkMode = localStorage.getItem("darkMode");
if (darkMode === null) {
    darkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
} else {
    darkMode = darkMode === "true";
}

applyDarkMode(darkMode);



document.getElementById("darkmode").onclick = function () {
    darkMode = !darkMode;
    applyDarkMode(darkMode);
    localStorage.setItem("darkMode", darkMode);
};

let lang =
    localStorage.getItem("lang") === null
        ? true
        : localStorage.getItem("lang") === "true";

applyLanguage(lang);

document.getElementById("taal").onclick = function () {
    lang = !lang;
    applyLanguage(lang);
    localStorage.setItem("lang", lang);
};
