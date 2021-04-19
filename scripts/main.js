var lwd = {
    cssVariables: document.querySelector(":root").style,
    settingsPath: document.currentScript.src.substr(0, document.currentScript.src.lastIndexOf("/")) + "/../settings.json",

    currentAccentColor: "blue",
    currentTheme: "light",
    

    setAccentColor: function(color) {
        fetch(this.settingsPath)
        .then(res => res.json())
        .then(out => {
            if (typeof(out.colors[color]) != "undefined") {
                this.currentAccentColor = color;
                let keys = Object.keys(out.colors[color]);
                for (let i = 0; i < keys.length; i++) {
                    this.cssVariables.setProperty("--color-" + keys[i], out.colors[color][keys[i]]);
                }
            } else {
                console.error("LWD:  Accent-color '" + color + "' was not found.");
            }
        })
        .catch(err => { throw err });
    },
    
    setTheme: function(theme) {
        this.currentTheme = theme;
    },
}

class LwdNav extends HTMLElement {
    constructor() {
        super();
    }

    expanded = false;
    set (val) { this.expanded = val; this.onExpandedChange(); }
    toggleExpanded() {
        this.expanded = !this.expanded;
    }

    navTypes = {
        side: {expandable: true}
    }

    connectedCallback() {
        this.createMediaQuery();
        this.createTypeSpecificElements();
        this.onExpandedChange();
    }

    createTypeSpecificElements() {
        this.querySelectorAll(".generated-nav-element").forEach(element => {  // first remove all elements
            element.remove()
        });

        switch (this.getNavType()) {
            case this.navTypes:
                break;
            
            case this.navTypes.side:
            default:
                let menuHead = document.createElement("lwd-navitem");
                menuHead.classList.add("hide-in-mobile", "generated-nav-element");

                let navBtn = document.createElement("img");
                navBtn.classList.add("navItemIcon");
                navBtn.setAttribute("src", "img/menu-btn.svg");
                navBtn.setAttribute("width", "18");
                navBtn.addEventListener("click", () => {
                    this.toggleExpanded();
                });

                let navLabel = document.createElement("h4");
                navLabel.classList.add("navItemLabel");
                navLabel.innerText = this.getNavTitle();
                menuHead.appendChild(navLabel);
                menuHead.appendChild(navBtn);
                this.insertBefore(menuHead, this.firstChild);
                break;
        }
    }

    createMediaQuery() {
        if (this.getNavType() != null) {
            switch (this.getNavType()) {
                case this.navTypes.side:                
                default:
                    if (this.querySelector("#navMediaQueryStyle") != null) {
                        this.querySelector("#navMediaQueryStyle").innerHTML = "";
                    } else {
                        let newStyle = document.createElement("style");
                        newStyle.innerHTML = "esdfghj";
                        this.appendChild(newStyle);
                    }
                break;
            }
        }
    }

    getNavTitle() {
        return "Lighted Web Design 2.0"; // TODO: getNavTitle
    }

    getNavType() {
        if (this.getAttribute("type") != null) {
            if (this.navTypes[this.getAttribute("type")] != undefined) {
                return this.navTypes[this.getAttribute("type")];
            } else {
                return null;
            }
        }
        return null;
    }

    onExpandedChange() {
        if (this.getNavType() != null && this.getNavType().expandable) {
            switch (this.getNavType()) {
                case this.navTypes.side:
                default:
                    if (this.expanded) {
                        this.style.setProperty("left", "0");
                    } else {
                        this.style.setProperty("left", "-380px");
                    }
                    break;
            }
        } else {
            console.warn("LWD: current nav type is not expandable");
        }
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "type") { // type has changed
            this.createTypeSpecificElements();
        }
        if (name == "expandat") {
            this.createMediaQuery();
        }
    }
    static get observedAttributes() { return ['type', 'expandat']; }
}

// Define the new element
customElements.define('lwd-nav', LwdNav);
//Navigation
/*
//HTML of Navigation links
var navHTMl = document.querySelector(".top-icon-nav .wrap-container").innerHTML;

if (navHTMl != undefined || navHTMl != null) {
    //Number of menuLinks
    var menuItems = navHTMl.split("</a>").length-1;
    
    //Get the middle of all Links (where new element has to be inserted)
    menuMiddle = menuItems/2;

    //Check if number is integer
    if (menuMiddle % 1 == 0) {
        var menuMiddle = document.querySelector("nav .wrap-container a:nth-child(" + menuMiddle + ")");
        menuMiddle.style.margin = "0 100px 0 0";
    } else {
        console.error("LWD2.0 Error: The menu must have an even number of menu items");
    }
} else {
    console.log("LWD2.0 Error: Navigation Error");
}*/