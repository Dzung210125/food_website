'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search menu items...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Debounce search to avoid too many calls
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative group">
      <div className={`
        relative flex items-center
        bg-white rounded-full
        transition-all duration-200
        ${isFocused ? 'ring-2 ring-orange-500 shadow-lg' : 'border border-gray-200 hover:border-gray-300'}
      `}>
        <div className="absolute left-4 text-gray-400 group-hover:text-gray-500">
          <Search size={20} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            w-full px-12 py-3
            bg-transparent
            text-gray-700 placeholder-gray-400
            focus:outline-none
            text-sm
          "
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {/* Search suggestions container */}
      {isFocused && query && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100">
          <div className="p-2">
            <div className="text-xs text-gray-500 px-3 py-2">
              Popular searches
            </div>
            <div className="space-y-1">
              {['Pasta', 'Pizza', 'Salad', 'Dessert'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-md transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 