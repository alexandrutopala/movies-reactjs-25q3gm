import React, { useState, useRef } from 'react'

interface SearchFormProps {
    onSearch: (query: string) => void
}

const SearchForm = ({onSearch}: SearchFormProps) => {
  const [query, setQuery] = useState<string>('')
  const lastSearchedQueryRef = useRef<string>('')
  const searchButtonRef = useRef<HTMLButtonElement>(null)

  const handleSearch = () => {
    if (query !== lastSearchedQueryRef.current) {
      onSearch(query)
      lastSearchedQueryRef.current = query
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget === searchButtonRef.current) {
      return
    }
    
    if (query !== lastSearchedQueryRef.current) {
      onSearch(query)
      lastSearchedQueryRef.current = query
    }
  }

  return (
    <div className='flex justify-center items-center space-x-4 font-montserrat'>
        <input 
            type="text" 
            placeholder='What do you want to watch?' 
            className='text-black w-full max-w-lg p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat h-10' 
            onChange={(e) => {
                setQuery(e.target.value)
            }}
            value={query}
            onBlur={handleBlur}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch()
                }
            }}
        />
        <button 
            ref={searchButtonRef}
            className='px-8 bg-red-500 text-white rounded hover:bg-red-600 uppercase font-montserrat font-medium h-10'
            onClick={handleSearch}
        >Search</button>
    </div>
  )
}

export default SearchForm