// TokenContext.tsx
"use client"
import React, { createContext, useContext, ReactNode } from 'react';

// Define the shape of the context value
interface TokenContextType {
  sessionToken: string | null;
}

// Create the context with default value
const TokenContext = createContext<TokenContextType | undefined>(undefined);

// Create a provider component
export const TokenProvider: React.FC<{ children: ReactNode; token: string | null }> = ({ children, token }) => {
  return (
    <TokenContext.Provider value={{ sessionToken: token }}>
      {children}
    </TokenContext.Provider>
  );
};

// Custom hook to use the TokenContext
export const useToken = (): TokenContextType => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
