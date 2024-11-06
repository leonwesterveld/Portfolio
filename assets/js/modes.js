const htmltag = document.querySelector("html");
const invertElements = document.getElementsByClassName("invert");

// Fetch content from JSON based on language
async function fetchContent(lang) {
    try {
        const response = await fetch('assets/json/content.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const content = lang ? data.languages.en : data.languages.nl;
        updateContent(content);
    } catch (error) {
        console.error('Error fetching content:', error);
    }
}

// Apply dark mode functionality
function applyDarkMode(darkMode) {
    document.body.style.backgroundImage = darkMode
        ? "url('/assets/img/portfoliodark.png')"
        : "url('/assets/img/portfolio.png')";
    for (let i = 0; i < invertElements.length; i++) {
        invertElements[i].style.filter = darkMode ? "invert(100%)" : "invert(0%)";
    }

    document.getElementById("darkmode").style.rotate = darkMode ? "360deg" : "0deg";
    document.getElementById("darkmode").innerText = darkMode ? "☽" : "☼";
}

// Handle language changes
function applyLanguage(lang) {
    htmltag.setAttribute("lang", lang ? "en" : "nl");
    document.getElementById("taal").innerText = lang ? "EN" : "NL";
    fetchContent(lang);
    
    tabsCreated = false;
    createTabs(lang);
}

let darkMode = localStorage.getItem("darkMode");
if (darkMode === null) {
    darkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
} else {
    darkMode = darkMode === "true";
}

applyDarkMode(darkMode);

document.getElementById("darkmode").onclick = function () {
    darkMode = !darkMode;
    applyDarkMode(darkMode);
    localStorage.setItem("darkMode", darkMode);
};

let lang = localStorage.getItem("lang") === null ? true : localStorage.getItem("lang") === "true";
applyLanguage(lang);

document.getElementById("taal").onclick = function () {
    lang = !lang;
    applyLanguage(lang);
    localStorage.setItem("lang", lang);
};



