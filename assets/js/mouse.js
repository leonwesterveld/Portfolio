const mouse = document.getElementById("mouse");
const inner = document.getElementById("inner");

document.addEventListener("mousemove", (e) => {
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

document.addEventListener(
    "mousedown",
    handleMouse(2, ".1rem", ".15rem", ".15rem")
);
document.addEventListener(
    "mouseup",
    handleMouse(1, ".15rem", ".2rem", ".2rem")
);

function applyHoverEffects() {
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
}