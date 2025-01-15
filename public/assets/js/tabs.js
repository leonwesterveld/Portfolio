let tabsCreated = false;

function openTab(evt, tabName) {
    const tabcontent = document.querySelectorAll(".tabcontent");
    const tablinks = document.querySelectorAll(".tablinks");

    tabcontent.forEach(content => content.style.display = "none");
    tablinks.forEach(link => link.classList.remove("active"));

    document.getElementById(tabName).style.display = "flex";
    setTimeout(() => document.getElementById(tabName).classList.add("show"), 50);

    evt.currentTarget.classList.add("active");
}

function createTabs(lang) {
    const tabButtons = document.getElementById("tab-buttons");
    const tabContent = document.getElementById("tab-content");

    tabButtons.innerHTML = '';
    tabContent.innerHTML = '';
    
    fetchTabsData(lang, tabButtons, tabContent);
}

function fetchTabsData(lang, tabButtons, tabContent) {
    fetch("../assets/json/sites.json")
        .then(response => response.json())
        .then(data => {
            data.tabs.forEach(tab => {
                const button = document.createElement("button");
                button.className = "tablinks";
                button.innerText = lang === "en" ? tab.titleEN : tab.titleNL;
                button.onclick = (event) => openTab(event, tab.id);
                tabButtons.appendChild(button);

                const contentDiv = document.createElement("div");
                contentDiv.id = tab.id;
                contentDiv.className = "tabcontent";

                tab.content.forEach(sub => {
                    const subSection = document.createElement("div");
                    subSection.className = "sub-section";

                    subSection.innerHTML = `
                        <h4>${sub.subtitle}</h4>
                        <a href="${sub.href}" target="_blank">
                            <img src="${sub.image}" alt="${sub.subtitle}" style="width:100%">
                        </a>
                        <p>${lang === "en" ? sub.textEN : sub.textNL}</p>
                    `;
                    contentDiv.appendChild(subSection);
                });

                tabContent.appendChild(contentDiv);
            });

            tabsCreated = true;
            document.querySelector(".tablinks")?.click();
        })
        .catch(error => console.error('Error loading tabs data:', error));
}

const taal = localStorage.getItem("language") || "en";
createTabs(taal);
