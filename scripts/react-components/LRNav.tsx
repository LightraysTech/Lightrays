import React, { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import * as LRUtils from "../LRUtils";
import * as LRReactUtils from "../LRReactUtils"
import {NavLink, useMatch} from "react-router-dom";

interface LRNavProps {
    children?: React.ReactNode,
    className?: string,
    style?: Object,

    type?: NavTypes,
    mobileType?: NavTypes,
    tabletAt?: string,
    mobileAt?: string,
}

export enum NavTypes {
    side = "side",
    bottom = "bottom",
    top = "top",
}

 export const LRNav = ({ children, type, mobileType, tabletAt, mobileAt, className, style}: LRNavProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(true);
    let toggleNavButton = () => setIsOpen(!isOpen);

    const [cssClasses, setCSSclasses] = useState<string>();
    const [header, setHeader] = useState<JSX.Element>();

    let headerChildren = LRReactUtils.getChildrenOfType(Header, children);
        
    //Seperate Nav Elements from Content and Header element
    let navChildren = React.Children.map(children, (child) => {
        let childType = (child as React.ReactElement<any>).type;
        if (childType !== Content && childType !== Header) {return child;}
    });
    
    let contentChildren = LRReactUtils.getChildrenOfType(Content, children);


    //When NavType or isOpen state changes, update CSS classes and generated elements
    useEffect(() => {
        let headerJSX;

        switch (type) {
            case NavTypes.side:
                console.log("generating side");
                if (headerChildren && headerChildren.length != 0) {
                    headerJSX = (<>{headerChildren}</>);
                } else {
                    headerJSX = (
                        <Header>
                            <Icon className='fluentIcon'></Icon><Label>Navigation</Label>
                        </Header>
                    );
                }
                break;
            case NavTypes.bottom:
                console.log("generating bottom Nav");
                break;
            case NavTypes.top:
                console.log("generating top Nav");
                break;
            default:
                console.log("generating side");
                break;
        }

        //css classes
        let classListString = "";
        classListString += (isOpen) ? "" : " alt-state";
        classListString += (type) ? ` ${type}` : " side";
        if (mobileType) {
            classListString += ` mobile-${mobileType}`;
        } else {
            classListString += type ? ` mobile-${type}` : ` mobile-side`;
        }

        setCSSclasses(classListString);
        setHeader(headerJSX);

        window.addEventListener("resize", handleRezise);
        //Remove when component is unmounted
        return () => {window.removeEventListener('rezise', handleRezise);};

    }, [type, mobileType, isOpen]);

    let handleRezise = () => {
        if (window.innerWidth < 1000) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    return (
        <div className={"lr-navRoot" + cssClasses}>
            <div className={"nav" + cssClasses + " " + (className ? className : "")} style={style}>
                <span onClick={toggleNavButton}>{header}</span>
                {navChildren}
            </div>
            {contentChildren}
        </div>
    );
}


//Nav Children (NavItem, Label, Icon, NavButton, NavGroup)
interface NavComponentProps {
    children?: ReactNode,
    className?: string,
    style?: Object,
    onClick?: MouseEventHandler<HTMLElement>
}

interface ItemProps extends NavComponentProps {
    open?: boolean,
    to?: any,
    activeOnlyWhenExact?: any,
}

export const Item: any = ({ children, className, style, open, to, activeOnlyWhenExact }: ItemProps) => {
    let classes = className ? `lr-navItem ${className}` : "lr-navItem";

    let [foldoutOpen, setFoldoutOpen] = useState(open ? "open" : "");

    //Seperate child elements
    //let label = React.Children.map(children, child => {return (child as React.ReactElement<any>).type === Label ? child : undefined});
    //let icon = React.Children.map(children, child => { return (child as React.ReactElement<any>).type === Icon ? child : undefined});
    let foldoutItems = React.Children.map(children, (child) => {return (child as React.ReactElement<any>).type === Item ? child : undefined});
    

    //Foldout
    if (foldoutItems && foldoutItems.length !== 0) {
        let iconJSX: Array<JSX.Element> = [];
        let labelJSX: Array<JSX.Element> = [];
        React.Children.map(children, (child) => {
            if (React.isValidElement(child) && (child as React.ReactElement<any>).type === Icon) { iconJSX.push(child); }
            if (React.isValidElement(child) && (child as React.ReactElement<any>).type === Label) { labelJSX.push(child); }
        });

        let toggleFoldout = () => (foldoutOpen === "open") ? setFoldoutOpen("") : setFoldoutOpen("open");
        
        if (to) {          
            return (
                <div className={`lr-navFoldout ${foldoutOpen}`}>
                    <NavLink to={to} className={classes + " " + foldoutOpen} style={style} onClick={toggleFoldout}>
                        {iconJSX[0]} {labelJSX[0]}
                        <Icon className="toggle"></Icon>
                    </NavLink>
                    <div className={`foldoutItems ${foldoutOpen}`}>{foldoutItems}</div>
                </div>
            )
        } else {
            return (
                <div className={`lr-navFoldout ${foldoutOpen}`}>
                    <div className={classes + " " + foldoutOpen} style={style} onClick={toggleFoldout}>
                        {iconJSX[0]} {labelJSX[0]}
                        <Icon className="toggle"></Icon>
                    </div>
                    <div className={`foldoutItems ${foldoutOpen}`}>{foldoutItems}</div>
                </div>
            )
        }


    } else { //No Foldout
        if (to) {
            return (<NavLink to={to} className={classes} style={style}>{children}</NavLink>);
        } else {
            return (<div className={classes} style={style}>{children}</div>);
        }
    }
}

export const Foldout: any = ({ children, className, style, open }: ItemProps) => {
    return (<Item className={className} style={style} open={open}>{children}</Item>);
}

export const Label = ({ children, className, style }: NavComponentProps) => {
    return <div className={className ? `navItemLabel ${className}` : "navItemLabel"} style={style}>{children}</div>
}

export const Icon = ({ children, className, style, onClick }: NavComponentProps) => {
    return <div onClick={onClick} className={className ? `navItemIcon ${className}` : "navItemIcon"} style={style}>{children}</div>
}

export const NavButton = ({ children, className, style, onClick }: NavComponentProps) => {
    return (<div onClick={onClick} className={`${className}`} style={style}>{children}</div>);
}

export const Group = ({ children, className, style }: NavComponentProps) => {
    return <div className={className ? `lr-navGroup ${className}` : "lr-navGroup"} style={style}>{children}</div>
}

interface ContentProps extends NavComponentProps {scroll: boolean}
export const Content: any = ({ children, className, style, scroll }: ContentProps) => {
    let classnames = className ? `content ${className}` : "content";
    if (scroll) {classnames += " scroll"}
    return <div className={classnames} style={style}>{children}</div>
}

export const Header: any = ({ children, className, style }: NavComponentProps) => {
    let classnames = className ? `header-navGroup ${className}` : "header-navGroup";

    let icon = LRReactUtils.getChildrenOfType(Icon, children);
    let label = LRReactUtils.getChildrenOfType(Label, children);

    return ( 
        <Group className={classnames} style={style}>
            <Item>
                {icon}
                {label}
            </Item>
        </Group>
    );
}