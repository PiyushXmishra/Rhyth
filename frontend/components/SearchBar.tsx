'use client'
import { useSearchContext } from '@/components/contexts/searchContext'
import { Input } from './ui/input'
import Link from 'next/link'
import useDebounce from '@/components/hooks/useDebounce'
import React, { useEffect } from 'react'
export default function SearchBar() {
  const { searchTerm, setSearchTerm, isSearching, setIsSearching } = useSearchContext()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== '') {
      setIsSearching(true)
      // You can call your search API here or dispatch an action to update results
    } else {
      setIsSearching(false)
    }
  }, [debouncedSearchTerm, setIsSearching])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
  }

  return (
    <div className="relative flex-grow mx-4 max-w-lg">
      <div className="relative flex items-center">
        <Link href={"/search"} className="flex-grow">
          <Input
            type="search"
            placeholder="Search"
            className="block w-full pl-5 pr-12 bg-secondary text-md"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Link>
      </div>
    </div>
  )
}
