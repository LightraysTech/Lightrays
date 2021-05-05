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
      fetch(this.settingsPath)
      .then(res => res.json())
      .then(out => {
          if (typeof(out.themes[theme]) != "undefined") {
              this.currentTheme = theme;
              let keys = Object.keys(out.themes[theme]);
              for (let i = 0; i < keys.length; i++) {
                  this.cssVariables.setProperty("--" + keys[i], out.themes[theme][keys[i]]);
              }
          } else {
              console.error("LWD:  Theme '" + theme + "' was not found.");
          }
      })
      .catch(err => { throw err });
    }
}



class LwdNav extends HTMLElement {
    constructor() {
        super();

    }

    navTypes = {
        side: {
            initialize(navElem) {
                let menuHead = document.createElement("lwd-navitem");
                menuHead.classList.add("hide-in-mobile", "generated-nav-element", "header");

                let navBtn = document.createElement("img");
                navBtn.classList.add("navItemIcon");
                navBtn.setAttribute("src", "img/menu-btn.svg");
                navBtn.addEventListener("click", () => {
                    navElem.toggleAltState();
                });

                let navLabel = document.createElement("h4");
                navLabel.classList.add("navItemLabel");
                navLabel.innerHTML = navElem.getNavTitle();
                menuHead.appendChild(navLabel);
                menuHead.appendChild(navBtn);
                navElem.insertBefore(menuHead, navElem.firstChild);
            }
        },
        test: {
            initialize(navElem) {

            }
        }
    }

    mobileNavTypes = {
        side: {
            initialize(navElem) {
                let menuHead = document.createElement("lwd-navitem");
                menuHead.classList.add("hide-in-not-mobile", "generated-nav-element", "header");

                let navBtn = document.createElement("img");
                navBtn.classList.add("navItemIcon");
                navBtn.setAttribute("src", "img/menu-btn.svg");
                navBtn.setAttribute("width", "18");
                navBtn.addEventListener("click", () => {
                    navElem.toggleAltState();
                });

                let navLabel = document.createElement("h4");
                navLabel.classList.add("navItemLabel");
                navLabel.innerHTML = navElem.getNavTitle();
                menuHead.appendChild(navLabel);
                menuHead.appendChild(navBtn);
                navElem.insertBefore(menuHead, navElem.firstChild);
            }
        },
    }

    initialize() {
        this.removeGeneratedElements();
        this.getNavType()?.initialize(this);
        this.getMobileNavType().initialize(this);        
    }

    connectedCallback() {
        //this.initialize();
        super.connectedCallback;
        console.log(this.querySelectorAll("*"));
    }

    removeGeneratedElements() {
        this.querySelectorAll(".generated-nav-element").forEach(element => {
            element.remove();
        });
    }

    getNavTitle() {
        return "Page Title"; // TODO: getNavTitle
    }

    getNavType() {
        if (this.hasAttribute("type")) {
            if (this.navTypes[this.getAttribute("type")] != undefined) {
                return this.navTypes[this.getAttribute("type")];
            } else {
                console.error("LWD: Navigation type '" + this.getAttribute("type") + "' is not found. Valid types: " + Object.keys(this.navTypes).toString());
                return null;
            }
        }
        return this.navTypes.side;
    }

    getMobileNavType() {
        if (this.hasAttribute("mobile-type")) {
            if (this.mobileNavTypes[this.getAttribute("mobile-type")] != undefined) {
                return this.mobileNavTypes[this.getAttribute("mobile-type")];
            } else {
                console.warn("LWD: Navigation mobile-type '" + this.getAttribute("mobile-type") + "' is not found. Switching to default.");
                return this.mobileNavTypes.side; // return default
            }
        }
        return this.mobileNavTypes.side;
    }

    toggleAltState() {
        if (this.hasAttribute("alt-state")) {
            this.removeAttribute("alt-state");
        } else {
            this.setAttribute("alt-state", "");
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.initialize();
    }
    static get observedAttributes() { return ['type', 'mobile-type']; }
}

// Define the new element
customElements.define('lwd-nav', LwdNav);
