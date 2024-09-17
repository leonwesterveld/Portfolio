function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "flex";
    evt.currentTarget.className += " active";
}

let tabsCreated = false;
function createTabs() {
    if (tabsCreated) return;
    fetch("../assets/json/sites.json")
        .then((response) => response.json())
        .then((data) => {
            const tabButton = document.getElementById("tab-buttons");
            const tabContent = document.getElementById("tab-content");

            data.tabs.forEach((tab) => {
                const button = document.createElement("button");
                button.className = "tablinks hover";
                button.innerText = tab.title;
                button.onclick = (event) => openTab(event, tab.id);
                tabButton.appendChild(button);

                const contentDiv = document.createElement("div");
                contentDiv.id = tab.id;
                contentDiv.className = "tabcontent";

                tab.content.forEach((sub) => {
                    const subSection = document.createElement("div");
                    subSection.className = "sub-section";

                    const subtitle = document.createElement("h4");
                    subtitle.innerText = sub.subtitle;
                    subtitle.className = "invert"
                    subSection.appendChild(subtitle);

                    const image = document.createElement("img");
                    image.src = sub.image;
                    image.alt = sub.subtitle;
                    image.style.height = "20rem";
                    subSection.appendChild(image);

                    const textParagraph = document.createElement("p");
                    textParagraph.innerText = sub.text;
                    textParagraph.className = "invert"
                    subSection.appendChild(textParagraph);

                    contentDiv.appendChild(subSection);
                });
                tabContent.appendChild(contentDiv);
            });
            tabsCreated = true;
            applyHoverEffects();
            applyDarkMode(darkMode);
        });
}