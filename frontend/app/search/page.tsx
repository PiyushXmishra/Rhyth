"use client";
import { useSearchContext } from "@/components/contexts/searchContext";
import SearchResults from "@/components/SearchResults";
import SkeletonLoading from "@/components/loaders/SearchLoader"; // Import the Loader component
import { X } from "lucide-react";
import Link from "next/link";

const Page: React.FC = () => {
  const { searchTerm, setSearchTerm, results, isSearching, clearResults } =
    useSearchContext();
  const showResults = results.length > 0 && isSearching;
  const showLoader = isSearching && results.length === 0; // Show loader when searching and no results

  return (
    <div className="z-50 flex flex-col max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-5/12 bg-secondary rounded-3xl p-4">
      {/* Header Section */}
      <div className="flex flex-row justify-between text-xl text-muted-foreground font-semibold mb-2 px-2">
        <h1>Search Results</h1>
        <div className="flex items-center">
          <Link href={"/"}>
            <X className="cursor-pointer" onClick={clearResults} />
          </Link>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 overflow-y-auto">
        {showLoader ? (
          <SkeletonLoading count={20} /> // Show loader while searching
        ) : showResults ? (
          <SearchResults results={results} onClose={clearResults} />
        ) : null}
      </div>
    </div>
  );
};

export default Page;
