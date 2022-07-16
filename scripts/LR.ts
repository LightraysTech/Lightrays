import React, { useEffect } from "react";

import LRNav from "./components/LRNav";
import * as LRUtils from "./LRUtils"

export var saveSettingsToCookies: boolean = false;
export var debugMode = true;

let accentColor: AccentColor | null = null;
let theme: Theme | null = null;

// AccentColor
export function setAccentColor(color: AccentColor) {
    accentColor = color;
    
    setCSSVariable("--color-main", color.main.toHex());
    setCSSVariable("--color-light", color.light.toHex());
    setCSSVariable("--color-dark", color.dark.toHex());
    setCSSVariable("--color-text", color.text.toHex());

    if (saveSettingsToCookies) {
        LRUtils.setCookie("LWD_AccentColor", accentColor.toJsonString());
    }
}

export function getAccentColor(): AccentColor | null {
    return accentColor;
}


//Theme
export function setTheme(thm: Theme) {
    theme = thm;

    setCSSVariable("--text-color", thm.text.toHex());
    setCSSVariable("--background", thm.background.toHex());
    setCSSVariable("--background-tint", thm.backgroundTint.toHex());
    setCSSVariable("--foreground", thm.foreground.toHex());
    setCSSVariable("--border", thm.border);
    setCSSVariable("--box-shadow", thm.boxShadow);
    setCSSVariable("--box-shadow-active", thm.boxShadowActive);
    setCSSVariable("--foreground-transparent", thm.foregroundTransparent.toHex());
    setCSSVariable("--foreground-hover", thm.foregroundHover.toHex());
    setCSSVariable("--foreground-active", thm.foregroundActive.toHex());

    if (saveSettingsToCookies) {
        LRUtils.setCookie("LR_Theme", theme.toJsonString());
    }
}

export function getTheme(): Theme | null {
    return theme;
}

export function setCSSVariable(property: string, value:string) {
    document.documentElement.style.setProperty(property, value);
}

export function loadFromCookies() {
    if(LRUtils.getCookie("LWD_AccentColor") != "") {
        setAccentColor(AccentColor.fromJsonString(LRUtils.getCookie("LWD_AccentColor")))
    }

    saveSettingsToCookies = true;
}


//Basic types
export class Color {
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
        var r, g, b;

        if(saturation == 0){
            r = g = b = lightness;
        }else{
           let hue2rgb = (p: number, q: number, t: number) => {
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
            var p = 2 * lightness - q;
            r = hue2rgb(p, q, hue + 1/3);
            g = hue2rgb(p, q, hue);
            b = hue2rgb(p, q, hue - 1/3);
        }

        return Color.fromRGB(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), alpha);
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
export class Shadow {
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
export class AccentColor {
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

export class Theme {
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
export function init() {
    if (debugMode) console.info("LWD: init");
    if (!accentColor) {
        if (debugMode) console.info("LWD: Setting AccentColor to default");
        setAccentColor(AccentColor.BLUE);
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