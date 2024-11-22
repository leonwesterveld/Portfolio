function updateContent(content) {

    // Projects Section
    document.querySelector("#projects h2").textContent = content.projects.title;
    document.querySelector("#projects p").textContent = content.projects.description;
}
