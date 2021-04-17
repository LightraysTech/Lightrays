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
  
    connectedCallback() {
      // browser calls this method when the element is added to the document
      // (can be called many times if an element is repeatedly added/removed)
    }
  
    disconnectedCallback() {
      // browser calls this method when the element is removed from the document
      // (can be called many times if an element is repeatedly added/removed)
    }
  
    static get observedAttributes() {
      return [/* array of attribute names to monitor for changes */];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      // called when one of attributes listed above is modified
    }
  
    adoptedCallback() {
      // called when the element is moved to a new document
      // (happens in document.adoptNode, very rarely used)
    }
}
customElements.define("lwd-nav", LwdNav);

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