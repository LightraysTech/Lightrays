var lwd = {
    cssVariables: document.querySelector(":root").style,
    rootFolderPath: document.currentScript.src.substr(0, document.currentScript.src.lastIndexOf("/")) + "/..",

    currentAccentColor: "blue",
    currentTheme: "light",
    

    setAccentColor: function(color) {
        if (typeof(color) == "object") {
            console.log(color);
            this.currentAccentColor = "custom";
            let keys = Object.keys(color);
            for (let i = 0; i < keys.length; i++) {
                console.log("--color-" + keys[i], color[keys[i]]);
                this.cssVariables.setProperty("--color-" + keys[i], color[keys[i]]);
            }
        } else {
            fetch(this.rootFolderPath + "/settings.json")
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
        }
    },
    
    setTheme: function(theme) {
      fetch(this.rootFolderPath + "/settings.json")
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
    },

    getAccentColor: function(color) {
        return new Promise(resolve => {
            fetch(this.rootFolderPath + "/settings.json")
            .then(res => res.json())
            .then(out => {
                if (typeof(out.colors[color]) != "undefined") {
                    resolve(out.colors[color]);
                } else {
                    console.error("LWD:  Accent-color '" + color + "' was not found.");
                    resolve(null);
                }
            });
        });
        fetch(this.rootFolderPath + "/settings.json")
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

    }
}



class LwdNav extends HTMLElement {
    constructor() {
        super();

    }

    navTypes = {
        side:  {
            initialize: function(navElem) {
                let menuHead = document.createElement("lwd-navitem");
                menuHead.classList.add("hide-in-mobile", "generated-nav-element", "header");

                let navLabel = document.createElement("h4");
                navLabel.classList.add("navItemLabel");
                navLabel.innerHTML = navElem.getNavTitle();

                menuHead.appendChild(navLabel);
                menuHead.appendChild(navElem.getNavButton(18));

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

                let navLabel = document.createElement("h4");
                navLabel.classList.add("navItemLabel");
                navLabel.innerHTML = navElem.getNavTitle();

                menuHead.appendChild(navLabel);
                menuHead.appendChild(navElem.getNavButton(18));

                navElem.insertBefore(menuHead, navElem.firstChild);
            }
        },
    }

    initialize() {
        window.addEventListener("load", () => {
            console.log("in initialize");
            this.removeGeneratedElements();
            this.getNavType()?.initialize(this);
            this.getMobileNavType().initialize(this);  
        });
    }

    connectedCallback() {
        //this.initialize();
        super.connectedCallback;
    }

    removeGeneratedElements() {
        console.log("in removeGEneratedElements");
        this.querySelectorAll(".generated-nav-element").forEach(element => {
            element.remove();
        });
    }

    getNavTitle() {
        let pageTitle = document.querySelector("h1.pageTitle");
        let customNavTitle = document.querySelector(".navTitle");
        if (customNavTitle != undefined) {
            customNavTitle.style.display = "none";
            return customNavTitle.innerHTML;
        } else if (pageTitle != undefined) {
            return pageTitle.innerHTML;
        } else {
            return document.title;
        }
    }

    getNavButton(width) {
        let specifiedNavButton = document.querySelector(".navButton");
        let navButton;
        if (specifiedNavButton == null) {
            console.log("navButton not found");
            navButton = document.createElement("img");
            navButton.setAttribute("src", lwd.rootFolderPath + "/img/menu-btn.svg");
            navButton.setAttribute("width", width);
        } else {
            console.log("navButton found");
            navButton = specifiedNavButton.cloneNode();
            navButton.style.removeProperty("display");
            navButton.classList.remove("navButton");

            specifiedNavButton.style.setProperty("display", "none");
        }
        navButton.classList.add("navItemIcon");
        navButton.addEventListener("click", () => this.toggleAltState());
        return navButton;
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
        console.log("in attributeChangeCallback");
        this.initialize();
    }
    static get observedAttributes() { return ['type', 'mobile-type']; }
}

// Define the new element
customElements.define('lwd-nav', LwdNav);
