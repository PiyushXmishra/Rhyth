"use client";
import { useSearchContext } from "@/components/contexts/searchContext";
import SearchResults from "@/components/SearchResults";
import { X } from "lucide-react";
import Link from "next/link";

const page: React.FC = () => {
  const { searchTerm, setSearchTerm, results, isSearching, clearResults } =
    useSearchContext();
  const showResults = results.length > 0 && isSearching;
  console.log(results)
  return (
    <div className="z-50 flex flex-col max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-5/12 bg-secondary rounded-3xl p-4">
      <div className=" flex flex-row justify-between text-xl text-muted-foreground px-5 font-semibold w-full overflow-y-auto">
        <h1>Search Results</h1>
        <div className="flex items-center">
<Link href={"/"}>
        <X/>
        </Link>
        </div>

      </div>
      {showResults && (
        <SearchResults results={results} onClose={clearResults} />
      )}
    </div>
  );
};

export default page;
