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

                let header = lrNav.querySelector("lr-navHeader, .header-navGroup");
                if (header != null && header.childElementCount != 0) {
                    if (header.firstElementChild?.nodeName != "LR-NAVITEM") {
                        let headerItem = document.createElement("lr-navItem");
                        headerItem.addEventListener("click", () => {
                            lrNav.toggleAttribute("alt-state");
                        });
                        if (header.getAttribute("onclick") != null) {
                            headerItem.setAttribute("onclick", header.getAttribute("onclick") + "");
                            header.removeAttribute("onclick");
                        }
                        headerItem.append(...header.childNodes);
                        header.append(headerItem);
                    }                    
                } else {
                    let header = document.createElement("lr-navHeader");
                    let headerItem = document.createElement("lr-navItem");
                    headerItem.addEventListener("click", () => {
                        lrNav.toggleAttribute("alt-state");
                        console.log("sfgfs");
                    });

                    headerItem.innerHTML = `
                        <div class="navItemIcon fluentIcon"></div>
                        <span class="navItemLabel">`+(lrNav.hasAttribute("title")?lrNav.getAttribute("title"):document.title)+`</span>
                    `;
                    header.append(headerItem);
                    if (lrNav.firstElementChild != null) {
                        lrNav.insertBefore(header, lrNav.firstElementChild);
                    } else {
                        lrNav.append(header);
                    }
                }
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
        setTimeout(() => {this.onNavTypeChange()}, 0);
    }

    private onNavTypeChange() {
        let newNavType = LRNav.getNavTypeByName(this.getAttribute("type") as string);
        let newMobileNavType = LRNav.getNavTypeByName(this.getAttribute("mobile-type") as string);

        newNavType = newNavType == null?LRNav.navTypes[0]:newNavType;
        newMobileNavType = newMobileNavType == null?LRNav.navTypes[0]:newMobileNavType;
                
        document.body.setAttribute("nav-type", newNavType.name);
        document.body.setAttribute("mobile-nav-type", newMobileNavType.name);

        if (newNavType != this.currentNavType || newMobileNavType != this.currentMobileNavType) {            
            this.removeGeneratedElements();
            
            this.currentNavType = newNavType;
            this.currentMobileNavType = newMobileNavType;

            this.regenerateNav()
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