import { createContext, useState, useContext, ReactNode } from "react";
import { FastAverageColor } from "fast-average-color";

interface GradientContextType {
  gradient: string;
  backgroundColor: string;
  extractColorFromImage: (imageUrl: string) => void;
}

const GradientContext = createContext<GradientContextType | undefined>(
  undefined
);

export const CurrentVidColorProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const darkColors = [
    "#C4E0F9",
    "#B95F89",
    "#606c38",
    "#ccd5ae",
    "#3a5a40",
    "#be95c4",
    "#a4ac86",
  ];

  const getRandomDarkColor = () => {
    return darkColors[Math.floor(Math.random() * darkColors.length)];
  };

  const [backgroundColor, setBackgroundColor] = useState("");
  const [gradient, setGradient] = useState(
    `linear-gradient(to bottom, ${getRandomDarkColor()}, transparent)`
  );

  const extractColorFromImage = async (imageUrl: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
  
    img.onload = async () => {
      const fac = new FastAverageColor();
      const color = await fac.getColorAsync(img, { algorithm: "dominant" });
  
      // Function to calculate luminance
      const getLuminance = (hex: string) => {
        const r = parseInt(hex.substring(1, 3), 16) / 255;
        const g = parseInt(hex.substring(3, 5), 16) / 255;
        const b = parseInt(hex.substring(5, 7), 16) / 255;
        return 0.2126 * r + 0.7152 * g + 0.0722 * b; // Standard luminance formula
      };
  
      const darkenColor = (hex: string, factor: number ) => {
        const r = Math.floor(parseInt(hex.substring(1, 3), 16) * factor);
        const g = Math.floor(parseInt(hex.substring(3, 5), 16) * factor);
        const b = Math.floor(parseInt(hex.substring(5, 7), 16) * factor);
        return `#${r.toString(16).padStart(2, "0")}${g
          .toString(16)
          .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
      };
  
      const isLight = getLuminance(color.hex) > 0.1;
      const finalColor = isLight ? darkenColor(color.hex, 0.2) : color.hex; 
  
      setGradient(`linear-gradient(to bottom, ${finalColor}, transparent)`);
      setBackgroundColor(finalColor);
    };
  };
  

  return (
    <GradientContext.Provider
      value={{ gradient, backgroundColor, extractColorFromImage }}
    >
      {children}
    </GradientContext.Provider>
  );
};

export const useGradient = () => {
  const context = useContext(GradientContext);
  if (!context) {
    throw new Error(
      "useGradient must be used within a CurrentVidColorProvider"
    );
  }
  return context;
};
