interface ILwdNavType {
    name: string;
    init(lwdNavElement: LRNav): void;
    mobileInit(lwdNavElement: LRNav): void;
}


export default class LRNav extends HTMLElement {
    private static navTypes: Array<ILwdNavType> = [
        {
            name: "side",
            init(lwdNav: LRNav) {
                //if (LWD.debugMode) console.info("generating SIDE"); TODO

                let menuHead = document.createElement("lwd-navitem");
                menuHead.classList.add("generated-nav-element", "header");

                let navLabel = document.createElement("h4");
                navLabel.classList.add("navItemLabel");
                navLabel.innerHTML = lwdNav.getAttribute("title") ? lwdNav.getAttribute("title") as string : document.title;

                menuHead.appendChild(navLabel);
                // TODO: menuHead.appendChild(lwdNav.getNavButton(18));
                

                lwdNav.insertBefore(menuHead, lwdNav.firstChild);
            },
            mobileInit(lwdNavElement: LRNav) {
                //if (LWD.debugMode) console.info("generating SIDE mobile"); TODO
                
            }
        },
        {
            name: "test",
            init(lwdNavElement: LRNav) {
                console.log("init 2");
                
            },
            mobileInit(lwdNavElement: LRNav) {
                console.log("mobileInit 2");
                
            }
        }
    ];

    static getNavTypeByName(name: string) {
        let type = this.navTypes.find(x => {
            return x.name == name;
        });
        return type? type: this.navTypes[0]; // return type or first navType as default
    }

    static registerNavType(navType: ILwdNavType) {
        this.navTypes.push(navType);
    }

    
    currentNavType: ILwdNavType | null = null;
    currentMobileNavType: ILwdNavType | null = null;
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.onNavTypeChange();
    }

    private onNavTypeChange() {
        let newNavType = LRNav.getNavTypeByName(this.getAttribute("type") as string);
        let newMobileNavType = LRNav.getNavTypeByName(this.getAttribute("mobile-type") as string);
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