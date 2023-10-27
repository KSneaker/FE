import React, { createContext, useState, useEffect } from "react";

export const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
    const [width, setWidth] = useState(getWindowDimensions());
    function getWindowDimensions() {
        const width = window.innerWidth;
        return width;
    }
    useEffect(() => {
        function handleResize() {
            setWidth(getWindowDimensions());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <ScreenContext.Provider value={{ width }}>
            {children}
        </ScreenContext.Provider>
    )
}