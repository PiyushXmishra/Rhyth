import { useSearchContext } from '@/components/contexts/searchContext';
import { Input } from './ui/input';
import SearchResults from './SearchResults';
import Link from 'next/link';
import useDebounce from '@/components/hooks/useDebounce'; // Import the debounce hook
import React from 'react';

export default function SearchBar() {
  const { searchTerm, setSearchTerm, isSearching, setIsSearching } = useSearchContext();

  // Use the debounce hook with a delay of 300 milliseconds (adjust as needed)
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Effect to trigger searching based on the debounced search term
  React.useEffect(() => {
    if (debouncedSearchTerm.trim() !== '') {
      setIsSearching(true);
      // You can call your search API here or dispatch an action to update results
    } else {
      setIsSearching(false);
    }
  }, [debouncedSearchTerm, setIsSearching]); // Run when the debounced search term changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term); // Update the context state immediately
  };

  return (
    <div className="relative flex-grow mx-4 max-w-lg">
      <div className="relative">
        <Link href={"/search"}>
          <Input
            type="search"
            placeholder="Search"
            className="block w-full pl-5 bg-secondary text-md"
            value={searchTerm}
            onChange={handleInputChange} // Remains the same
          />
        </Link>
      </div>
    </div>
  );
}
