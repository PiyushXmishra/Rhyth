import Bowser from "bowser";
export const getBrowserInfo = () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
      const browserName = browser.getBrowser();
      //@ts-ignore
      const isBrave = window.navigator.brave && window.navigator.brave.isBrave() || 
                      window.navigator.userAgent.includes("Brave");
      return {
          name: isBrave ? "Brave" : browserName.name,
          version: isBrave ? browser.getBrowserVersion() : browserName.version
      };
  };