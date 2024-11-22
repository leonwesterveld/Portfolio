function updateContent(content) {
    // Home Section
    document.title = content.home.title;
    document.querySelector("#naam").alt = content.home.imageAlt;
    document.querySelector(".info").textContent = content.home.greeting;
    document.querySelector("#button__projects").textContent =
        content.home.projectsButton;
    document.querySelector("#button__about").textContent =
        content.home.aboutButton;
    document.querySelector("#button__contact").textContent =
        content.home.contactButton;

}
