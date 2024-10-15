import { useSearchContext } from '@/components/contexts/searchContext';
import { Input } from './ui/input';
import SearchResults from './SearchResults';
import Link from 'next/link';

export default function SearchBar() {
  const { searchTerm, setSearchTerm, results, isSearching, setIsSearching } = useSearchContext();
  const showResults = results.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Set isSearching based on whether input is empty or not
    if (term.trim() !== '') {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
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
          onChange={handleInputChange} // Updated to use handleInputChange
        />
        </Link>
      </div>
    </div>
  );
}
