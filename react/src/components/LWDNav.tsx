import React, { MouseEventHandler, ReactChild, ReactChildren, ReactNode, useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";

interface LWDNavProps {
    children?: React.ReactNode,
    type?: NavTypes,
    mobileType?: NavTypes,
    content?: ReactChild | ReactChildren,
    navButton?: JSX.Element,
    title?: string,

    className?: string,
    style?: Object,
    width?: string
}

export enum NavTypes {
    side = "side",
    bottom = "bottom",
    top = "top",
}

 export const LWDNav = ({ children, type, mobileType, content, navButton, title, className, style, width}: LWDNavProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const [cssClasses, setCSSclasses] = useState<string>();
    const [header, setHeader] = useState<JSX.Element>();

    //When NavType or isOpen state changes, update CSS classes and generated elements
    useEffect(() => {
        let headerJSX;

        switch (type) {
            case NavTypes.side:
                console.log("generating side");
                headerJSX = (
                    <Group className="header-navGroup">
                        <Item className="header">
                            {generatedNavButton(18)}
                            <Label><h4>Title</h4></Label>
                        </Item>
                    </Group>
                );
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
    }, [type, mobileType, isOpen]);

    let generatedNavButton = (width: number) => {
        let navButtonJSX = React.Children.map(children, (c) => {
            if (React.isValidElement(c) && (c as React.ReactElement<any>).type === NavButton) { return c }
        })

        if (navButton) {
            navButtonJSX?.length !== 0 && console.warn("LWDNav: 2 NavButtons were declared, please only declare one.")
            return <Icon onClick={toggleNavButton}>{navButton}</Icon>
        } else if (navButtonJSX?.length !== 0) {
            return <Icon onClick={toggleNavButton}>{navButtonJSX}</Icon>;
        } else {
            return (
                <Icon onClick={toggleNavButton} className="fluentIcon"></Icon>
            );
        }
    }

    let toggleNavButton = () => setIsOpen(!isOpen);


    //Seperate Nav Elements from Content
    let navChildren = React.Children.map(children, (child) => {
        let childType = (child as React.ReactElement<any>).type;
        if (!(childType === NavButton || childType === Content)) {return child;}
    });
    let contentChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && (child as React.ReactElement<any>).type === Content) {             
            return child;
        }
    });
    
    return (
        <div className={"navRootElem " + cssClasses}>
            <div className={cssClasses + " lwd-nav " + (className ? className : "")} style={style}>
                {header}
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

interface ItemProps extends NavComponentProps { open?: boolean }

export const Item: any = ({ children, className, style, open }: ItemProps) => {
    let classes = className ? `lwd-navItem ${className}` : "lwd-navItem";

    let [foldoutOpen, setFoldoutOpen] = useState(open ? "open" : "");

    //Seperate child elements
    let label = React.Children.map(children, child => {return (child as React.ReactElement<any>).type === Label ? child : undefined});
    let icon = React.Children.map(children, child => { return (child as React.ReactElement<any>).type === Icon ? child : undefined});
    let foldoutItems = React.Children.map(children, (child) => {return (child as React.ReactElement<any>).type === Item ? child : undefined});
    

    //Foldout
    if (foldoutItems?.length !== 0) {
        let iconJSX: Array<JSX.Element> = [];
        let labelJSX: Array<JSX.Element> = [];
        React.Children.map(children, (child) => {
            if (React.isValidElement(child) && (child as React.ReactElement<any>).type === Icon) { iconJSX.push(child); }
            if (React.isValidElement(child) && (child as React.ReactElement<any>).type === Label) { labelJSX.push(child); }
        });

        let toggleFoldout = () => (foldoutOpen === "open") ? setFoldoutOpen("") : setFoldoutOpen("open");
        
        return (
            <div className={`lwd-navFoldout ${foldoutOpen}`}>
                <div className={classes + " " + foldoutOpen} style={style} onClick={toggleFoldout}>
                    {iconJSX[0]} {labelJSX[0]}
                    <Icon className="toggle"></Icon>
                </div>
                <div className={`foldoutItems ${foldoutOpen}`}>{foldoutItems}</div>
            </div>
        )

    } else { //No Foldout
        return (<div className={classes} style={style}>{children}</div>);
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
    return <div className={className ? `lwd-navGroup ${className}` : "lwd-navGroup"} style={style}>{children}</div>
}

export const Content: any = ({ children, className, style }: NavComponentProps) => {
    return <div className={className ? `content ${className}` : "content"} style={style}>{children}</div>
}