function updateContent(content) {
    // About Section - Title and Intro
    document.querySelector("#about h2").textContent = content.about.title;
    document.querySelector("#about p").textContent = content.about.intro;

    // Skills Section
    const skillsSection = document.querySelector(".skills");
    skillsSection.innerHTML = `
        <h3>${content.about.skillsTitle}</h3>
        <ul>
            <li><strong>Languages:</strong> ${content.about.skills.languages}</li>
            <li><strong>Frameworks:</strong> ${content.about.skills.frameworks}</li>
            <li><strong>Tools:</strong> ${content.about.skills.tools}</li>
        </ul>
    `;

    // Hobbies Section
    const hobbiesSection = document.querySelector(".hobbies");
    hobbiesSection.innerHTML = `
        <h3>${content.about.hobbiesTitle}</h3>
        <p>${content.about.hobbies}</p>
    `;
}
