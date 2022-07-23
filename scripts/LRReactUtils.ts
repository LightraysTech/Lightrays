import React, { useEffect } from "react";

//React specific
export default class LRReactUtils {
    static useScript = (url: string) => {
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
    
    static getChildrenOfType = (childType: React.ReactNode, children: React.ReactNode) => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child) && (child as React.ReactElement<any>).type === childType) {
                return child;
            }
        });
    }
}
