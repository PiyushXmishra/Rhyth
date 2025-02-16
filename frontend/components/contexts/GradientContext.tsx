import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { FastAverageColor } from "fast-average-color";
interface GradientContextType {
  gradient: string;
  extractColorFromImage: (imageUrl:string) => void;
}

const GradientContext = createContext<GradientContextType | undefined>(undefined);

export const GradientProvider = ({ children }: { children: ReactNode }) => {
  const darkColors = [
   "#C4E0F9",
   "#B95F89",
   "#606c38",
   "#ccd5ae",
   "#3a5a40",
   "#be95c4",
   "#a4ac86"
  ];

  const getRandomDarkColor = () => {
    return darkColors[Math.floor(Math.random() * darkColors.length)];
  };

  const [gradient, setGradient] = useState(
    `linear-gradient(to bottom, ${getRandomDarkColor()}, transparent)`
  );

  const extractColorFromImage = (imageUrl: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; 
    img.src = imageUrl;

    img.onload = async () => {
      const fac = new FastAverageColor();
      const color = await fac.getColorAsync(img);

      if (color) {
        setGradient(`linear-gradient(to bottom, ${color.hex}, transparent)`);
        console.log(color.hex);
        console.log(imageUrl)
      }
    };
  };

  return (
    <GradientContext.Provider value={{ gradient, extractColorFromImage }}>
      {children}
    </GradientContext.Provider>
  );
};

export const useGradient = () => {
  const context = useContext(GradientContext);
  if (!context) {
    throw new Error("useGradient must be used within a GradientProvider");
  }
  return context;
};
