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
    <div className="flex flex-col h-full w-full pt-2 lg:pt-4">
      <div className="flex flex-row justify-between text-white underline underline-offset-4 decoration-muted-foreground font-bold mb-2 ">
        <h1 className="text-base lg:text-2xl">Search Results</h1>
        <div className="flex items-center">
          <Link href={"/"}>
            <X className="cursor-pointer" onClick={clearResults} />
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto h-full overflow-x-hidden">
        {showLoader ? (
          <SkeletonLoading count={20} />
        ) : showResults ? (
          <SearchResults results={results} onClose={clearResults} />
        ) : null}
      </div>
    </div>
  );
};

export default Page;
