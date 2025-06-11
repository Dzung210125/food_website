'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown, Globe, Phone, Clock } from 'lucide-react';
import SearchBar from './SearchBar';

const menuCategories = [
  { name: 'Appetizers', href: '/menu#appetizers' },
  { name: 'Main Courses', href: '/menu#main-courses' },
  { name: 'Desserts', href: '/menu#desserts' },
  { name: 'Beverages', href: '/menu#beverages' },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const menuRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const [searchResults] = useState<string[]>([]);

  const isActive = (path: string) => {
    return pathname === path ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500';
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    // TODO: Implement actual search logic here
    // This is a placeholder that you can replace with your actual search implementation
    console.log('Searching for:', query);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <a href="tel:+1234567890" className="flex items-center hover:text-orange-500">
                <Phone size={16} className="mr-1" />
                (123) 456-7890
              </a>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                Mon-Sun: 11:00 AM - 10:00 PM
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="hover:text-orange-500">Order Online</a>
              <a href="#" className="hover:text-orange-500">Gift Cards</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-orange-500">Foodie</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`${isActive('/')} transition-colors duration-200 font-medium`}
              >
                Home
              </Link>
              
              {/* Menu Dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`${isActive('/menu')} flex items-center space-x-1 transition-colors duration-200 font-medium`}
                >
                  <span>Menu</span>
                  <ChevronDown size={16} className={`transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {menuCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`${isActive('/about')} transition-colors duration-200 font-medium`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`${isActive('/contact')} transition-colors duration-200 font-medium`}
              >
                Contact
              </Link>
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-orange-500"
                >
                  <Globe size={20} />
                  <span className="text-sm">{languages.find(lang => lang.code === selectedLanguage)?.name}</span>
                  <ChevronDown size={16} className={`transform transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => {
                            setSelectedLanguage(language.code);
                            setIsLanguageOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {language.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Reservation Button */}
              <Link
                href="/contact"
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors font-medium"
              >
                Make Reservation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="py-4 border-t">
              <div className="max-w-xl mx-auto">
                <SearchBar onSearch={handleSearch} />
                {searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-md shadow-lg">
                    {searchResults.map((result, index) => (
                      <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className={`${isActive('/')} block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                {/* Mobile Menu Categories */}
                <div className="px-3 py-2">
                  <div className="font-medium text-gray-900 mb-2">Menu Categories</div>
                  {menuCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block px-3 py-2 text-gray-600 hover:text-orange-500"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/about"
                  className={`${isActive('/about')} block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`${isActive('/contact')} block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>

                {/* Mobile Language Selector */}
                <div className="px-3 py-2">
                  <div className="font-medium text-gray-900 mb-2">Language</div>
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setSelectedLanguage(language.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-600 hover:text-orange-500"
                    >
                      {language.name}
                    </button>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="block px-3 py-2 mt-4 bg-orange-500 text-white rounded-md text-center font-medium hover:bg-orange-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Make Reservation
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
} 