import React, {useEffect, useRef, useState } from "react";
import "../style/main.css";
import LRUtils from "../LRUtils";

interface LRWindowProps {
    isOpen: boolean;
    isOpenCallback: (open: boolean) => void;
    header?: {text: string, style?: Object};
    width?: string;
    height?: string;
    style?: Object;
    children?: React.ReactNode;
}

const LRWindow = ({isOpen, isOpenCallback, children, header, width, height, style}: LRWindowProps) => {

    //window state
    const [windowOpen, setWindowOpen] = useState<boolean>(isOpen);

    //every time isOpen changes, setWIndowOpen
    useEffect(() => {setWindowOpen(isOpen)}, [isOpen]);

    //Close window button
    const closeWindow = () => {setWindowOpen(false)}

    //window style, changes every time the window state changes
    const [windowVisibility, setWindowVisibility] = useState({});
    const [windowSize, setWindowSize] = useState({});
    const [userWindowStyle ,setUserWindowStyle] = useState({});
    const [windowAnimationStyle, setWindowAnimationStyle] = useState({});
    const [h2Style, seth2Style] = useState({});

    //when windowOpen state changes, change window style and report to parent component
    useEffect(() => {
        if (windowOpen) {
            setWindowAnimationStyle({animation: "fade-up .3s"});
            setWindowVisibility({zIndex: "102"});
            isOpenCallback(true);
        } else {
            setWindowAnimationStyle({animation: "fade-down .6s"});
            setTimeout(() => {setWindowVisibility({display: "none"})}, 400)
            isOpenCallback(false);
        }
    }, [windowOpen]);

    //on resize
    useEffect(() => {
        if (width !== undefined && height !== undefined) {
            setWindowSize({width: width, height: height});
        }
    }, [width, height]);

    //header
    useEffect(() => {
        if (header === undefined || header.text === "") {
            seth2Style({height: "35px", ...header?.style});
        } else {
            seth2Style({...header?.style});
        }
    }, [header]);

    //general style
    useEffect(()=> setUserWindowStyle({...style}), [style]);

    //window dragging
    const h2Element = useRef<HTMLHeadingElement>(null);
    const windowElement = useRef<HTMLDivElement>(null);

    //first render
    useEffect(() => {         
        setWindowVisibility({display: "none"});
        if(windowElement.current && h2Element.current) {
            LRUtils.dragElement(windowElement.current, h2Element.current);
            windowElement.current.addEventListener("click", () => setWindowVisibility({zIndex: "102"}) );
        }
    }, [])
    

    return (
        <div ref={windowElement} className="lr-window" style={{...windowVisibility, ...windowSize, ...userWindowStyle, ...windowAnimationStyle}}>
            <svg viewBox='0 0 512 512' onClick={closeWindow}>
                <path d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z'/>
            </svg>
            <h2 ref={h2Element} style={h2Style}>{header?.text}</h2>
            <div className="content">
            {children}
            </div>
        </div>
    );
}

export default LRWindow;