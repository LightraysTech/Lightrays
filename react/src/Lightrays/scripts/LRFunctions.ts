import React, { useEffect } from "react";

export const dragElement = (elem: HTMLElement, draggableElem?: HTMLElement | undefined) => {
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
        e = e || window.event;

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

        e = e || window.event;

        let rect = elem.getBoundingClientRect();
        elemWidth = elem.offsetWidth;
        elemHeight = elem.offsetHeight;
        pointerOffsetX = e.touches[0].clientX - rect.left;
        pointerOffsetY = e.touches[0].clientY - rect.top;
        console.log(elemWidth, elemHeight, pointerOffsetX, pointerOffsetY);


        document.ontouchend = closeDragElement;
    }

    function elementDrag(e: TouchEvent | MouseEvent) {
        e = e || window.event;

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

        let finalPosTop = map_range(positionPxTop, 0, windowHeight, 0, 100);
        let finalPosLeft = map_range(positionPxLeft, 0, windowWidth, 0, 100);

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

export const map_range = (value: number, low1: number, high1: number, low2: number, high2: number) => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export const useScript = (url: string) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};

export const getChildrenOfType = (childType: React.ReactNode, children: React.ReactNode) => {
    return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && (child as React.ReactElement<any>).type === childType) {
            return child;
        }
    });
}

export const addAnimation = (component: HTMLElement, cssAnimation: string, duration: number) => {
  // TODO 
}

export enum LightTimes { sunrise = "#F7F9E7", sunset = "#F7F9E7", day = "#d9e8f7", night = "#18436E", midnight = "black" }
export const setBackgroundLight = (timeColor: string, darkTheme?: boolean) => {

    let d = document.querySelector("body");
    if (d) {
        setTheme((darkTheme || timeColor == LightTimes.night) ? "dark" : "light");
        d.style.setProperty("--background-tint", timeColor);
    }
}

let currentTheme: string = "light";

export const setTheme = (theme: string) => {
    currentTheme = theme;

    //var, value light theme, value dark theme
    let cssvars = [
        ["theme", "100%", "0%"],
        ["foreground", "black", "white"],
        ["background", "white", "#2c2c2c"],
        ["component-background", "white", "#2b2b2b"],
        ["background-tint", "#d9e8f7", "#18436E"],
        ["background-transparent", "hsla(0, 0%, 100%, 0.5)", "hsla(204, 8%, 0%, 0.2)"],
        ["background-hover", "hsl(0, 0%, 93%)", "hsl(0, 0%, 18%)"],
        ["background-active", "hsl(0, 3%, 95%)", "hsl(0, 0%, 15%)"],
        ["box-shadow", "0px 1.6px 7px rgb(0 0 0 / 9%)", "1.2px 1.2px 6px rgba(0, 0, 0, 0.2)"],
        ["box-shadow-active", "1px 1px 3px rgba(0, 0, 0, 0.25)", "1px 1px 3px rgba(0, 0, 0, 0.45)"],
        ["border", "solid hsla(0, 0%, 70%, .2) 1px", "solid hsla(0, 0%, 10%, .2) 1px"],
        ["shadow-spec", "97%", "20%"],
        ["shadow-brightness", "30%", "0%"]
    ];

    let d = document.querySelector("body");

    window.addEventListener("load", () => {
        setThemeProperties();
    });

    setThemeProperties();

    function setThemeProperties() {
        if (d !== null) {
            cssvars.forEach(row => {
                if (d !== null) {
                    if (theme == "dark") {
                        d.style.setProperty("--" + row[0], row[2]);
                    } else if (theme == "light") {
                        d.style.setProperty("--" + row[0], row[1]);
                    } else {
                        d.style.removeProperty("--" + row[0]);
                    }
                }
            });

            d.querySelectorAll(".lightModeVisible").forEach(e => {
                theme == "dark" ? e.classList.add("hidden") : e.classList.remove("hidden");
            });

            d.querySelectorAll(".darkModeVisible").forEach(e => {
                theme == "light" ? e.classList.add("hidden") : e.classList.remove("hidden");
            });
        }
    }
}

export const getTheme = () => {
    return currentTheme;
}