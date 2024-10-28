"use client";
import { useSearchContext } from "@/components/contexts/searchContext";
import SearchResults from "@/components/SearchResults";
import SkeletonLoading from "@/components/loaders/SearchLoader"; // Import the Loader component
import { X } from "lucide-react";
import Link from "next/link";

const Page: React.FC = () => {
  const { results, isSearching, clearResults } =
    useSearchContext();
  const showResults = results.length > 0 && isSearching;
  const showLoader = isSearching && results.length === 0; // Show loader when searching and no results

  return (
    <div className="flex flex-col max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-full lg:bg-secondary rounded-md lg:rounded-3xl pt-2 lg:p-4">
      {/* Header Section */}
      <div className="flex flex-row justify-between text-xl text-white underline underline-offset-4 decoration-muted-foreground font-semibold font-sans mb-2 px-2">
        <h1 className="text-base lg:text-xl">Search Results</h1>
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
