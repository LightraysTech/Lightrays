//#region "scripts/components/LRNav.ts"
interface ILwdNavType {
    name: string;
    init(lwdNavElement: LRNav): void;
    mobileInit(lwdNavElement: LRNav): void;
}



class LRNav extends HTMLElement {
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
//#endregion
//#region "scripts/LRUtils.ts"
class LRUtils {
    static setCookie(name: string, value: string, expiresDays?: number, path?: string): void {
        let cookieStr = name + "=" + value + ";";
        if (expiresDays != undefined) {
            const d = new Date();
            d.setTime(d.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            cookieStr += expires;
        }
        if (path) {
            cookieStr += ";path=" + path;
        }
        document.cookie = cookieStr;
    }
    static getCookie(cname: string): string {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let c of ca) {
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static map_range(value: number, low1: number, high1: number, low2: number, high2: number): number {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }
    static dragElement = (elem: HTMLElement, draggableElem?: HTMLElement | undefined): void => {
        var elemWidth = 0, elemHeight = 0, pointerOffsetX = 0, pointerOffsetY = 0;

        if (draggableElem !== undefined) {
            draggableElem.onmousedown = dragMouseDown;
            draggableElem.addEventListener("touchstart", dragTouchDown);
            draggableElem.addEventListener("touchmove", elementDrag);
        } else {
            elem.onmousedown = dragMouseDown;
            elem.addEventListener("touchstart", dragTouchDown);
            elem.addEventListener("touchmove", elementDrag);
        }

        function dragMouseDown(e: MouseEvent) {
            elemWidth = elem.offsetWidth;
            elemHeight = elem.offsetHeight;
            pointerOffsetX = e.offsetX;
            pointerOffsetY = e.offsetY;

            document.onmouseup = closeDragElement;
            document.ontouchend = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function dragTouchDown(e: TouchEvent) {
            e.preventDefault();
            console.log("touch event: ", e);

            let rect = elem.getBoundingClientRect();
            elemWidth = elem.offsetWidth;
            elemHeight = elem.offsetHeight;
            pointerOffsetX = e.touches[0].clientX - rect.left;
            pointerOffsetY = e.touches[0].clientY - rect.top;

            document.ontouchend = closeDragElement;
        }

        function elementDrag(e: TouchEvent | MouseEvent) {
            let positionPxLeft = 0;
            let positionPxTop = 0;

            if (e instanceof TouchEvent) {
                positionPxLeft = e.targetTouches[0].clientX - pointerOffsetX + (elemWidth / 2);
                positionPxTop = e.targetTouches[0].clientY - pointerOffsetY + (elemHeight / 2);
            } else if (e instanceof MouseEvent) {
                positionPxLeft = e.clientX - pointerOffsetX + (elemWidth / 2);
                positionPxTop = e.clientY - pointerOffsetY + (elemHeight / 2);
            }



            let windowWidth = window.innerWidth;
            let windowHeight = window.innerHeight;

            let finalPosTop = this.map_range(positionPxTop, 0, windowHeight, 0, 100);
            let finalPosLeft = this.map_range(positionPxLeft, 0, windowWidth, 0, 100);

            finalPosTop = Math.round(finalPosTop * 100) / 100;
            finalPosLeft = Math.round(finalPosLeft * 100) / 100;

            function limitPos(elempos: number) {
                if (elempos <= 0) {
                    return 0;
                } else if (elempos >= 100) {
                    return 100;
                } else {
                    return elempos;
                }
            }
            elem.style.setProperty("left", limitPos(finalPosLeft) + "%");
            elem.style.setProperty("top", limitPos(finalPosTop) + "%");
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    static addAnimation = (component: HTMLElement, cssAnimation: string, duration: number) => {
        // TODO 
    }
}
//#endregion
//#region "scripts/LR.ts"


class LR {
        static saveSettingsToCookies: boolean = false;
        static debugMode = true;
        
        private static accentColor: AccentColor | null = null;
        private static theme: Theme | null = null;

    static setAccentColor(color: AccentColor) {
        this.accentColor = color;
        
        this.setCSSVariable("--color-main", color.main.toHex());
        this.setCSSVariable("--color-light", color.light.toHex());
        this.setCSSVariable("--color-dark", color.dark.toHex());
        this.setCSSVariable("--color-text", color.text.toHex());
    
        if (this.saveSettingsToCookies) {
            LRUtils.setCookie("LWD_AccentColor", this.accentColor.toJsonString());
        }
    }

    static getAccentColor(): AccentColor | null {
        return this.accentColor;
    }

    static setTheme(thm: Theme) {
        this.theme = thm;
    
        this.setCSSVariable("--text-color", thm.text.toHex());
        this.setCSSVariable("--background", thm.background.toHex());
        this.setCSSVariable("--background-tint", thm.backgroundTint.toHex());
        this.setCSSVariable("--foreground", thm.foreground.toHex());
        this.setCSSVariable("--border", thm.border);
        this.setCSSVariable("--box-shadow", thm.boxShadow);
        this.setCSSVariable("--box-shadow-active", thm.boxShadowActive);
        this.setCSSVariable("--foreground-transparent", thm.foregroundTransparent.toHex());
        this.setCSSVariable("--foreground-hover", thm.foregroundHover.toHex());
        this.setCSSVariable("--foreground-active", thm.foregroundActive.toHex());
    
        if (this.saveSettingsToCookies) {
            LRUtils.setCookie("LR_Theme", this.theme.toJsonString());
        }
    }

    static getTheme(): Theme | null {
        return this.theme;
    }

    static setCSSVariable(property: string, value:string) {
        document.documentElement.style.setProperty(property, value);
    }

    static loadFromCookies() {
        if(LRUtils.getCookie("LWD_AccentColor") != "") {
            this.setAccentColor(AccentColor.fromJsonString(LRUtils.getCookie("LWD_AccentColor")))
        }
    
        this.saveSettingsToCookies = true;
    }
}


//Basic types
class Color {
    r: number;
    g: number;
    b: number;
    a: number;

    /**
     * 
     * @param hex hex:  color string (Format: "#FFFFFF" / "FFFFFF")
     * @param alpha alpha:  optional value from 0 to 1
     */
    constructor(hex?:string, alpha?:number) {
        if (hex) {
            hex = hex.replace("#", "");
            hex = hex.trim();
            this.r = parseInt(hex.substring(0,2),16);
            this.g = parseInt(hex.substring(2,4), 16);
            this.b = parseInt(hex.substring(4,6),16);
            this.a = alpha ? alpha: 1;
        } else {
            this.r = 0;
            this.g = 0;
            this.b = 0
            this.a = 1
        }
    }

    /**
     * 
     * @param red value from 0 to 255
     * @param green value from 0 to 255
     * @param blue value from 0 to 255
     * @param alpha optional value from 0 to 1
     * @returns Color
     */
    static fromRGB(red: number, green: number, blue: number, alpha?: number):Color {
        let c = new Color();
        c.r = red;
        c.g = green;
        c.b = blue;
        c.a = alpha ? alpha : 1;
        return c;
    }

    /**
     * 
     * @param hue value from 0 to 360
     * @param saturation value from 0 to 100
     * @param lightness value from 0 to 100
     * @param alpha optional value from 0 to 1
     * @returns Color
     */
    static fromHsl(hue: number, saturation: number, lightness: number, alpha?: number) {
        saturation /= 100;
        lightness /= 100;
        let C = (1 - Math.abs(2 * lightness - 1)) * saturation;
        hue / 60;
        let X = C * (1 - Math.abs(hue % 2 - 1));
        let r = 0; let g = 0; let b = 0;

        if (hue >= 0 && hue < 1) {
            r = C;
            g = X;
        } else if (hue >= 1 && hue < 2) {
            r = X;
            g = C;
        } else if (hue >= 2 && hue < 3) {
            g = C;
            b = X;
        } else if(hue >= 3 && hue < 4) {
            g = X;
            b = C;
        } else if (hue >= 4 && hue < 5) {
            r = X;
            b = C;
        } else {
            r = C;
            b = X;
        }
        let m = lightness - C / 2;
        r += m;
        g += m;
        b += m;
        r *= 255.0;
        g *= 255.0;
        b *= 255.0;
        return Color.fromRGB(Math.round(r), Math.round(g), Math.round(b), alpha);
    }

    toHsl() {
        this.r /= 255;
        this.g /= 255;
        this.b /= 255;
        let max = Math.max(this.r, this.g, this.b), min = Math.min(this.r, this.g, this.b);
        let h = (max + min) / 2;
        let s;
        let l = (max + min) / 2;

        if(max == min){
            h = s = 0;
        }else{
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case this.r: h = (this.g - this.b) / d + (this.g < this.b ? 6 : 0); break;
                case this.g: h = (this.b - this.r) / d + 2; break;
                case this.b: h = (this.r - this.g) / d + 4; break;
            }
            h /= 6;
        }
    
        return [h, s, l];
    }

    toHex(): string {
        let red = this.r.toString(16);
        let green = this.g.toString(16);
        let blue = this.b.toString(16);

        if (red.length == 1)
            red = "0" + red;
        if (green.length == 1)
            green = "0" + green;
        if (blue.length == 1)
            blue = "0" + blue;

        return "#" + red + green + blue;
    }
    static WHITE = new Color("FFFFFF");
    static BLACK = new Color("000000");
}

//TODO: shadow class
/*
class Shadow {
    hOffset: number;
    vOffset: number;
    blur: number;
    spread: number;
    color: Color;
    extras?: string;
    
    constructor(hOffset: number, vOffset: number, blur: number, spread: number, color: Color, extras?: string) {
        this.hOffset = hOffset;
        this.vOffset = vOffset;
        this.blur = blur;
        this.spread = spread;
        this.color = color;
        this.extras = extras;
    }

    //TODO: color type switch
    static fromString(s: string) {
        let hOffset, vOffset, blur, spread, color, extras;
        let sSplit = s.split(" ");
        hOffset = parseFloat(sSplit[0]);
        vOffset = parseFloat(sSplit[1]);
        blur = parseFloat(sSplit[2]);
        spread = parseFloat(sSplit[3]);
        color = new Color(sSplit[4]);
        extras = sSplit[5];

        return new Shadow(hOffset, vOffset, blur, spread, color, extras);
    }

    toString() {
        return this.hOffset + " " + this.vOffset + " " + this.blur + " " + this.spread + " " + this.color.toHex() + " " + this.extras;
    }
}
*/

//Lightrays specific
class AccentColor {
    light: Color;
    main: Color;
    dark: Color;

    text: Color;
    
    constructor(light: Color, main: Color, dark: Color, text: Color) {
        this.light = light;
        this.main = main;
        this.dark = dark;
        this.text = text;
    }

    static BLUE = new AccentColor(new Color("50E6FF"), new Color("0078D4"), new Color("184F85"), Color.WHITE);
    static GREEN = new AccentColor(new Color("33C481"), new Color("238655"), new Color("185C37"), Color.WHITE);
    static ORANGE = new AccentColor(new Color("FFD800"), new Color("F2980C"), new Color("E45618"), Color.BLACK);
    static GRAY = new AccentColor(new Color("959595"), new Color("6C6C6C"), new Color("202020"), Color.WHITE);

    toJsonString(): string {
        let obj = {
            light: this.light.toHex(),
            main: this.main.toHex(),
            dark: this.dark.toHex(),
            text: this.text.toHex(),
        };
        return JSON.stringify(obj);
    }
    static fromJsonString(json: string): AccentColor {
        let obj = JSON.parse(json);
        return new AccentColor(new Color(obj.light), new Color(obj.main), new Color(obj.dark), new Color(obj.text));
    }
}

class Theme {
    text: Color;
    background: Color;
    backgroundTint: Color;
    foreground: Color;
    border: string;
    boxShadow: string;

    boxShadowActive: string;
    foregroundTransparent: Color;
    foregroundHover: Color;
    foregroundActive: Color;

    /**
     * 
     * @param text Color
     * @param background Color
     * @param backgroundTint Color
     * @param foreground Color
     * @param boxShadow string
     * @param border string
     * @param foregroundTransparent (optional) Color
     * @param foregroundHover (optional) Color
     * @param foregroundActive (optional) Color
     */
    constructor(text: Color, background: Color, backgroundTint: Color, foreground: Color, border: string, boxShadow: string, boxShadowActive?: string,
        foregroundTransparent?: Color, foregroundHover?: Color, foregroundActive?: Color) {
        this.text = text;
        this.background = background;
        this.backgroundTint = backgroundTint;
        this.foreground = foreground;
        this.border = border;
        this.boxShadow = boxShadow;

        if (boxShadowActive) {
            this.boxShadowActive = boxShadowActive
        } else {
            this.boxShadowActive = boxShadow; //TODO: Shadow color darker
        }

        if (foregroundTransparent) {
            this.foregroundTransparent = foregroundTransparent;
        } else {
            this.foregroundTransparent = foreground;
        }

        if (foregroundHover) {
            this.foregroundHover = foregroundHover;
        } else {
            let [h, s, l] = foreground.toHsl();
            this.foregroundHover = Color.fromHsl(h, s, l-7);
        }

        if (foregroundActive) {
            this.foregroundActive = foregroundActive;
        } else {
            let [h, s, l] = foreground.toHsl();
            this.foregroundActive = Color.fromHsl(h, s, l-5);
        }
    }

    static LIGHT = new Theme(Color.BLACK, Color.WHITE, new Color("d9e8f7"), Color.WHITE,"solid hsla(0, 0%, 70%, .2) 1px", "0px 1.6px 7px rgb(0 0 0 / 9%)","1px 1px 3px rgba(0, 0, 0, 0.25)" , Color.fromHsl(0, 0, 100, 0.5), Color.fromHsl(0, 0, 93), Color.fromHsl(0, 0, 95));
    static DARK = new Theme(Color.WHITE, new Color("272727"), new Color("0D1015"), new Color("313335"), "solid hsla(0, 0%, 10%, .2) 1px", "1.2px 1.2px 6px rgba(0, 0, 0, 0.2)", "1px 1px 3px rgba(0, 0, 0, 0.45)" , Color.fromHsl(204, 8, 0, 0.2), Color.fromHsl(0, 0, 18), Color.fromHsl(0, 0, 15));
    static TESTDARK = new Theme(Color.WHITE, new Color("272727"), new Color("0D1015"), new Color("313335"), "solid hsla(0, 0%, 10%, .2) 1px", "1.2px 1.2px 6px rgba(0, 0, 0, 0.2)", "1px 1px 3px rgba(0, 0, 0, 0.45)");

    /**
     * @param json JSON object with parameters of type Theme
     * @returns Theme
     */
    static fromJsonString(json: string): Theme {
        let obj = JSON.parse(json);
        return new Theme(new Color(obj.text), new Color(obj.background), new Color(obj.backgroundTint), 
                    new Color(obj.foreground), obj.border, obj.boxShadow, obj.boxShadowActive,
                    new Color(obj.foregroundTransparent), new Color(obj.foregroundHover), 
                    new Color(obj.foregroundActive));
    }

    /**
     * @returns Theme as a JSON object
     */
    toJsonString(): string {
        let obj = {
            text: this.text.toHex(),
            background: this.background.toHex(),
            backgroundTint: this.backgroundTint.toHex(),
            foreground: this.foreground.toHex(),
            border: this.border,
            boxShadow: this.boxShadow,
            boxShadowActive: this.boxShadowActive,
            foregroundTransparent: this.foregroundTransparent.toHex(),
            foregroundHover: this.foregroundHover.toHex(),
            foregroundActive: this.foregroundActive.toHex()
        };
        return JSON.stringify(obj);
    }
}


//Init
function init() {
    if (LR.debugMode) console.info("LWD: init");
    if (!LR.getAccentColor) {
        if (LR.debugMode) console.info("LWD: Setting AccentColor to default");
        LR.setAccentColor(AccentColor.BLUE);
    }
}

if (document.readyState != 'complete') {
    window.addEventListener("load", () => {
        init();
    });
} else {
    init();
    console.log("already ready");
}


// Define the new elements
window.customElements.define('lwd-nav', LRNav);
//#endregion
