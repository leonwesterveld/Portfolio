window.onload = function () {
    let img = document.getElementById("naam");
    setTimeout(() => img.src = "assets/img/tekst.png", 1900);
};

const htmltag = document.querySelector("html");
let darkMode = true;

document.getElementById("darkmode").onclick = function () {
    htmltag.style.filter = darkMode ? "invert(100%)" : "invert(0%)";
    this.style.rotate = darkMode ? "360deg" : "0deg";
    this.innerText = darkMode ? "☽" : "☼";
    darkMode = !darkMode;
};

let lang = true;

document.getElementById("taal").onclick = function () {
    this.innerText = lang ? "EN" : "NL";
    htmltag.setAttribute("lang", lang ? "en" : "nl");
    lang = !lang;
};

const mouse = document.getElementById("mouse");
const inner = document.getElementById("inner");

document.addEventListener("mousemove", e => {
    mouse.style.left = `${e.clientX}px`;
    mouse.style.top = `${e.clientY}px`;
});

function handleMouse(scale, borderWidth, innerHeight, innerWidth) {
    return function () {
        mouse.style.transform = `translate(-50%, -50%) scale(${scale})`;
        mouse.style.borderWidth = `${borderWidth}`;
        inner.style.height = `${innerHeight}`;
        inner.style.width = `${innerWidth}`;
    };
}

document.addEventListener("mousedown", handleMouse(2, ".1rem", ".15rem", ".15rem"));
document.addEventListener("mouseup", handleMouse(1, ".15rem", ".2rem", ".2rem"));

const hover = document.querySelectorAll(".hover");

for (let i = 0; i < hover.length; i++) {
    hover[i].addEventListener("mouseenter", () => {
        mouse.style.opacity = "0.35";
        mouse.style.background = "black";
        mouse.style.transform = "translate(-50%, -50%) scale(2)";
        mouse.style.borderWidth = ".075rem";
        inner.style.opacity = "0";
    });

    hover[i].addEventListener("mouseleave", () => {
        mouse.style.opacity = "1";
        mouse.style.background = "transparent";
        mouse.style.transform = "translate(-50%, -50%) scale(1)";
        mouse.style.borderWidth = ".15rem";
        inner.style.opacity = "1";
    });
}

const knop = document.querySelectorAll(".knop");

for (let i = 0; i < knop.length; i++) {
    knop[i].addEventListener("click", () => {
        const main = document.querySelector("main");
        main.style.filter = "blur(20rem)";
        main.style.opacity = "0";
        setTimeout(() => main.style.display = "none", 2000);
    });
}