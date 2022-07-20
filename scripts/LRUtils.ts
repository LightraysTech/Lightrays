export default class LRUtils {
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

    static addAnimation = (component: HTMLElement, cssAnimation: string, duration: number) => {
        // TODO 
    }
}