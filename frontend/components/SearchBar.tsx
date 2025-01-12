'use client'
import { useSearchContext } from '@/components/contexts/searchContext'
import { Input } from './ui/input'
import Link from 'next/link'
import useDebounce from '@/components/hooks/useDebounce'
import React, { useEffect } from 'react'
import { X } from 'lucide-react'
export default function SearchBar() {
  const { searchTerm, setSearchTerm, setIsSearching ,clearResults } = useSearchContext()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== '') {
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }
  }, [debouncedSearchTerm, setIsSearching])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
  }

  return (
    <div className="relative flex-grow max-w-md">
      <div className="relative flex items-center">
        <Link href={"/search"} className="flex-grow">
          <Input
            placeholder="Search"
            className="block w-full pl-5 bg-secondary text-md font-bold"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Link>
        {
          searchTerm.length > 0 && (
            <button>
              <X className="absolute right-4 top-1/2 transform -translate-y-1/2" 
              onClick={clearResults} />
            </button>
        )}
      </div>
    </div>
  )
}
