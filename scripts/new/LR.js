class LR {
    static transparency = false;
    static darkTheme = window.matchMedia('(prefers-color-scheme: dark)');

    static setTransparency(t) {
        if (this.transparency) {
            this.transparency = false
            this.setCSSVar("--transparency", 0.5);
        }
    }

    static setCSSVar(property, value) {
        document.documentElement.style.setProperty(property, value);
    }
}

let bgHighlight = document.querySelector(".background-highlight");
if (bgHighlight) {
    document.addEventListener("mousemove", (e) => {
        bgHighlight.style.setProperty("--posX", e.clientX + "px")
        bgHighlight.style.setProperty("--posY", e.clientY + "px")
    })
}