class Lwd {
    static cssVariables = document.querySelector(":root").style;
    static rootFolderPath = document.currentScript.src.substr(0, document.currentScript.src.lastIndexOf("/")) + "/..";

    static currentAccentColor = "blue";
    static currentTheme = "light";

    static init() {
        let accentColor = this.getCookie("lwd-accentColor");
        if (accentColor != "") {
            if (accentColor.startsWith("[obj]")) {
                console.log(accentColor.split("[obj]"));

                this.setAccentColor(JSON.parse(accentColor.split("[obj]")[1]));
            } else if (accentColor.startsWith("[str]")) {
                this.setAccentColor(accentColor.split("[str]")[1]);
            }
        }
    }

    static setAccentColor(color) {
        if (typeof(color) == "object") {
            console.log(color);
            this.setCookie("lwd-accentColor", "[obj]" + JSON.stringify(color));
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
                    this.setCookie("lwd-accentColor", "[str]" + color);
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
    
    static setTheme(theme) {
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
    }

    static getAccentColor(color) {
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
        

    }

    static setCookie(name, value, expiresDays, path) {
        let cookieStr = name + "=" + value + ";";
        if (expiresDays != undefined) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            cookieStr += expires;
        }
        if (path != undefined) {
            cookieStr += ";path=" + expires;
        }
        document.cookie = cookieStr;
    }
    
    static getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static wrapElement(elem, wrapper) {
        elem.parentNode.insertBefore(wrapper, elem);
        wrapper.appendChild(elem);
    }
}


window.addEventListener("load", () => {
    Lwd.init();

    //wrap inputs into container
    document.querySelectorAll("input").forEach(elem => {
        if (elem.type != "radio" && elem.type != "range" && elem.type != "button" && elem.type != "color" && elem.type != "checkbox" && elem.type != "submit" && elem.type != "reset") {
            let container = document.createElement("div");
            container.classList.add("lwd-ip-container");
            Lwd.wrapElement(elem, container);

            elem.addEventListener("focus", () => {
                console.log("focused");
                container.style = "var(--ip-background-size);";
                //Lwd.cssVariables.setProperty("--ip-background-size", "100% auto");
            });
        }
    });
});

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
        floatingSymbol: {
            initialize: function(navElem) {
                document.querySelectorAll(".reversed-alignment")[0].style.setProperty("margin-left", "auto");
                
                let navitems = document.querySelectorAll("lwd-navitem");
                let justTextNavItems = [];
                navitems.forEach(item => {
                    if (item.querySelectorAll(".navItemIcon").length == 0) {
                        justTextNavItems.push(item);
                    }
                });
                justTextNavItems.forEach(item => {item.classList.add("justTextNavItem")});
            }
        }
    }

    mobileNavTypes = {
        side: {
            initialize(navElem) {
                let menuHead = document.createElement("lwd-navitem");
                menuHead.classList.add("hide-in-desktop", "generated-nav-element", "header");

                let navLabel = document.createElement("h4");
                navLabel.classList.add("navItemLabel");
                navLabel.innerHTML = navElem.getNavTitle();

                menuHead.appendChild(navLabel);
                menuHead.appendChild(navElem.getNavButton(18));

                navElem.insertBefore(menuHead, navElem.firstChild);
            }
        },
        floatingSymbol: {
            initialize(navElem) {
                let navItems = document.querySelectorAll("lwd-navitem");

                navItems.forEach((item) => {
                    if (!item.classList.contains("navButton") && !item.classList.contains("justTextNavItem")) {
                        let clonedNavItem = item.cloneNode();
                        for(let child of item.children) {
                            clonedNavItem.appendChild(child.cloneNode());
                        }
                        clonedNavItem.classList.add("hide-in-desktop", "mobile-nav-item");
    
                        navElem.appendChild(clonedNavItem);
                        console.log("inserted clonedItem");
                    }
                });


                let menuHead = document.createElement("lwd-navitem");
                menuHead.classList.add("hide-in-desktop", "generated-nav-element", "header"); 
                menuHead.appendChild(navElem.getNavButton(18));

                navElem.insertBefore(menuHead, navElem.firstChild);
                console.log("inserted menuHead");
            }
        }
    }

    initialize() {
        window.addEventListener("load", () => {
            this.removeGeneratedElements();
            this.getNavType()?.initialize(this);
            this.getMobileNavType().initialize(this);  
        });
    }

    connectedCallback() {
    }

    removeGeneratedElements() {
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
            console.info("LWD: no navButton found, switched to default");
            navButton = document.createElement("img");
            navButton.setAttribute("src", lwd.rootFolderPath + "/img/menu-btn.svg");
            navButton.setAttribute("width", width);
        } else {
            console.info("LWD: navButton found");
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
                console.warn("LWD: Navigation mobile-type '" + this.getAttribute("mobile-type") + "' is not found.");
                return this.mobileNavTypies.sde; // return default
            }
        }
        if (this.hasAttribute("type")) {
            if (this.mobileNavTypes[this.getAttribute("type")] != undefined) {
                return this.mobileNavTypes[this.getAttribute("type")];
            } else {
                console.warn("LWD: Navigation mobile-type '" + this.getAttribute("type") + "' is not found.");
                return null;
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
        var body = document.querySelector("body");
        switch (name) {
            case "type":
                body.setAttribute("nav-type", newValue);
                break;
            case "mobile-type":
                body.setAttribute("mobile-nav-type", newValue);
                break;
            case "alt-state":
                if (newValue == null) {
                    body.removeAttribute("nav-alt-state");
                } else {
                    body.setAttribute("nav-alt-state", "");
                }
                break;
        }
        this.initialize();
    }
    static get observedAttributes() { return ['type', 'mobile-type', 'alt-state']; }
}

// Define the new element
customElements.define('lwd-nav', LwdNav);