'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

type FilterType = 'categories' | 'colors' | 'sizes' | 'priceRanges';

interface SelectedFilters {
  categories: Set<string>;
  colors: Set<string>;
  sizes: Set<string>;
  priceRanges: Set<string>;
}

const products = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: '$29.90',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    colors: ['White', 'Black', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'T-Shirts',
    isNew: true
  },
  {
    id: 2,
    name: 'Slim Fit Chino Pants',
    price: '$39.90',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80',
    colors: ['Khaki', 'Black', 'Navy'],
    sizes: ['28', '30', '32', '34'],
    category: 'Pants',
    isNew: false
  },
  // Add more products...
];

const filters = {
  categories: ['T-Shirts', 'Shirts', 'Pants', 'Outerwear', 'Accessories'],
  colors: ['White', 'Black', 'Navy', 'Beige', 'Khaki'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  priceRanges: ['Under $20', '$20 - $40', '$40 - $60', 'Over $60']
};

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    categories: new Set<string>(),
    colors: new Set<string>(),
    sizes: new Set<string>(),
    priceRanges: new Set<string>()
  });

  const toggleFilter = (type: FilterType, value: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      const currentSet = new Set(newFilters[type]);
      
      if (currentSet.has(value)) {
        currentSet.delete(value);
      } else {
        currentSet.add(value);
      }
      
      newFilters[type] = currentSet;
      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      categories: new Set<string>(),
      colors: new Set<string>(),
      sizes: new Set<string>(),
      priceRanges: new Set<string>()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Men's Collection</h1>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              colors={product.colors}
              sizes={product.sizes}
              isNew={product.isNew}
            />
          ))}
        </div>
      </div>

      {/* Filter Sidebar */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Filter Sections */}
              {Object.entries(filters).map(([key, values]) => (
                <div key={key} className="mb-6">
                  <h3 className="font-medium mb-3 capitalize">{key}</h3>
                  <div className="space-y-2">
                    {values.map((value) => (
                      <label
                        key={value}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters[key as FilterType].has(value)}
                          onChange={() => toggleFilter(key as FilterType, value)}
                          className="rounded border-gray-300"
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={clearFilters}
                className="w-full py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 