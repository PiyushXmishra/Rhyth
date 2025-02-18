import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { FastAverageColor } from "fast-average-color";

interface GradientContextType {
  gradient: string;
  isLoading: boolean;
  extractColorFromImage: (imageUrl: string) => void;
}

const GradientContext = createContext<GradientContextType | undefined>(undefined);

export const GradientProvider = ({ children }: { children: ReactNode }) => {
  const [gradient, setGradient] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  useEffect(() => {
    // Cleanup function to handle component unmounting
    return () => {
      setIsLoading(false);
    };
  }, []);

  const extractColorFromImage = (imageUrl: string) => {
    // Set loading to true immediately
    setIsLoading(true);
    
    // If same image, don't process
    if (imageUrl === currentImageUrl) {
      setIsLoading(false);
      return;
    }

    setCurrentImageUrl(imageUrl);

    const img = new Image();
    img.crossOrigin = "anonymous";
    const proxiedUrl = `/api/proxy?url=${encodeURIComponent(imageUrl)}`;

    img.onload = async () => {
      try {
        const fac = new FastAverageColor();
        const color = await fac.getColorAsync(img, { algorithm: "sqrt" , mode:"speed" });
        
        if (color) {
          const newGradient = `linear-gradient(to bottom, ${color.hex}, transparent)`;
          setGradient(newGradient);
        }
      } catch (error) {
        console.error("Error extracting color:", error);
      } finally {
        // Only set loading to false if this is still the current image being processed
        if (imageUrl === currentImageUrl) {
          setIsLoading(false);
        }
      }
    };

    img.onerror = () => {
      console.error("Error loading image");
      if (imageUrl === currentImageUrl) {
        setIsLoading(false);
      }
    };

    img.src = proxiedUrl;
  };

  return (
    <GradientContext.Provider value={{ gradient, isLoading, extractColorFromImage }}>
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