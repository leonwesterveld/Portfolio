let language = localStorage.getItem("language") || "en";

async function loadTranslationsAndUpdate(lang) {
    try {
        const response = await fetch('../assets/json/content.json');
        const data = await response.json();
        updateContent(data.languages[lang]);
    } catch (error) {
        console.error("Fout bij het laden van de vertalingen:", error);
    }
}

function setLanguage(lang) {
    language = lang;
    localStorage.setItem("language", lang);
    const tabs = document.getElementById("projects");
    if (tabs)createTabs(lang);
    loadTranslationsAndUpdate(lang);
}

document.getElementById("taal").addEventListener("click", () => {
    const newLang = language === "en" ? "nl" : "en";
    document.getElementById("taal").innerText = language === "en" ? "NL" : "EN";
    setLanguage(newLang);
});

loadTranslationsAndUpdate(language);