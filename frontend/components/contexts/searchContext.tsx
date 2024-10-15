"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  results: any[];
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  search: (term: string) => void;
  clearResults: () => void;
}

// Create the context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = async (term: string) => {
    if (term.trim() === '') {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    try {
      const response = await axios.get('http://localhost:3000/api/songs/search', {
        params: { query: term },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const clearResults = () => {
    setResults([]);
    setSearchTerm('');
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      search(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        results,
        isSearching,
        setIsSearching,
        search,
        clearResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Hook to use the context
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
      throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
  };
  