import LR from "../LR";

interface ILrNavType {
    name: string;
    init(lrNav: LRNav): void;
    mobileInit(lrNav: LRNav): void;
}



export default class LRNav extends HTMLElement {
    private static navTypes: Array<ILrNavType> = [
        {
            name: "side",
            init(lrNav: LRNav) {
                if (LR.debugMode) console.log("LR: Generating navigation \"side\"");
                
                let menuHead = document.createElement("lr-navitem");
                menuHead.classList.add("generated-nav-element", "header");

                let navLabel = document.createElement("h4");
                navLabel.classList.add("navItemLabel");
                navLabel.innerHTML = lrNav.getAttribute("title") ? lrNav.getAttribute("title") as string : document.title;

                menuHead.appendChild(navLabel);
                // TODO: menuHead.appendChild(lrNav.getNavButton(18));
                

                lrNav.insertBefore(menuHead, lrNav.firstChild);
            },
            mobileInit(lrNav: LRNav) {
                if (LR.debugMode) console.log("LR: Generating mobile navigation \"side\"");
                
            }
        },
        {
            name: "test",
            init(lrNav: LRNav) {
                console.log("init 2");
                
            },
            mobileInit(lrNav: LRNav) {
                console.log("mobileInit 2");
                
            }
        }
    ];

    static getNavTypeByName(name: string) {
        let type = this.navTypes.find(x => {
            return x.name == name;
        });
        return type? type: null; // return type or null
    }

    static registerNavType(navType: ILrNavType) {
        this.navTypes.push(navType);
    }

    
    currentNavType: ILrNavType | null = null;
    currentMobileNavType: ILrNavType | null = null;
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.onNavTypeChange();
    }

    private onNavTypeChange() {        
        let newNavType = LRNav.getNavTypeByName(this.getAttribute("type") as string);
        let newMobileNavType = LRNav.getNavTypeByName(this.getAttribute("mobile-type") as string);
        if (newNavType == null) {
            this.setAttribute("type", LRNav.navTypes[0].name);
            newNavType = LRNav.navTypes[0];
        }
        if (newMobileNavType == null) {
            this.setAttribute("mobile-type", LRNav.navTypes[0].name);
            newMobileNavType = LRNav.navTypes[0];
        }

        newNavType = newNavType == null?LRNav.navTypes[0]:newNavType;
        newMobileNavType = newMobileNavType == null?LRNav.navTypes[0]:newMobileNavType;
        
        if (this.getAttribute("mobile-type") == null) {
            newMobileNavType = newNavType;
        }
        
        if (newNavType != this.currentNavType || newMobileNavType != this.currentMobileNavType) {
            document.body.setAttribute("nav-type", newNavType.name);
            document.body.setAttribute("mobile-nav-type", newMobileNavType.name);
            
            this.removeGeneratedElements();
            
            this.currentNavType = newNavType;
            if (this.currentNavType) this.currentNavType.init(this);

            this.currentMobileNavType = newMobileNavType;
            if (this.currentMobileNavType) this.currentMobileNavType.mobileInit(this);
        }
    }
    regenerateNav() {
        this.removeGeneratedElements();
            
        if (this.currentNavType) this.currentNavType.init(this);
        if (this.currentMobileNavType) this.currentMobileNavType.mobileInit(this);
    }

    removeGeneratedElements() {
        document.querySelectorAll(".generated-nav-element").forEach(element => {
            element.remove();
        });
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        let body = document.body;
        switch (name) {
            case "type":
                this.onNavTypeChange();
                break;
            case "mobile-type":
                this.onNavTypeChange();
                break;
            case "alt-state":
                if (newValue == null) {
                    body.removeAttribute("nav-alt-state");
                } else {
                    body.setAttribute("nav-alt-state", "");
                }
                break;
            case "title":
                this.regenerateNav();
                break;
        }
    }
    static get observedAttributes() { return ['type', 'mobile-type', 'alt-state', 'title']; }

    //#region setters
    set type(type: string) {
        this.setAttribute("type", type);
    }
    set mobileType(type: string) {
        this.setAttribute("mobile-type", type);
    }
    set title(title: string) {
        this.setAttribute("title", title);
    }
    //#endregion
}