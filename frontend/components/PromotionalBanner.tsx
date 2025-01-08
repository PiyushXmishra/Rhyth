"use client";
import Bowser from "bowser";
import React, { useEffect, useState } from "react";

export const getBrowserInfo = () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const browserName = browser.getBrowser();

    // Check for Brave browser
    //@ts-expect-error
    const isBrave = window.navigator.brave && window.navigator.brave.isBrave() || 
                    window.navigator.userAgent.includes("Brave");

    return {
        name: isBrave ? "Brave" : browserName.name, // Store browser name
        version: isBrave ? browser.getBrowserVersion() : browserName.version,
        isBrave // Add isBrave to the return object for easy access
    };
};

const BraveSupportBanner: React.FC = () => {
    const [browserInfo, setBrowserInfo] = useState<{ name?: string; version?: string; isBrave: boolean } | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const info = getBrowserInfo();
            setBrowserInfo(info);
        }
    }, []);

    if (!browserInfo) {
        return null; 
    }

    const { name, isBrave } = browserInfo; 
    
    return (
        <div className="flex items-center justify-between bg-accent rounded-xl p-3">
            {/* Left Section: Conditional Text */}
            <div className="flex-1"> {/* Allow this section to grow */}
                <h2 className="text-lg  font-bold   text-foreground">
                    {isBrave ? "Welcome, Brave User!" : "Use Brave for a better experience!"}
                </h2>
                <p className="text-sm text-foreground mt-2">
                    {isBrave 
                        ? "Thanks for using Brave! Enjoy an enhanced browsing experience."
                        : `You are currently using ${name}. Try Brave for better security and performance. Install our PWA for offline access.`}
                </p>
            </div>

            {/* Right Section: Brave Icon */}
            <div className="flex-shrink-0"> {/* Prevent the icon from shrinking */}
                <img
                    src="https://brave.com/static-assets/images/brave-logo-sans-text.svg" // Ensure this icon is valid
                    alt="Brave Browser"
                    className="w-18 h-18" // Set a fixed size for the icon
                />
            </div>
        </div>
    );
};

export default BraveSupportBanner;
