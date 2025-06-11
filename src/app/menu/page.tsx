'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Star } from 'lucide-react';

const menuCategories: {
  id: number;
  name: string;
  items: { 
    id: number; 
    name: string; 
    price: string; 
    description: string;
    image: string;
    rating?: number;
    isSpicy?: boolean;
    isVegetarian?: boolean;
    isGlutenFree?: boolean;
  }[];
}[] = [
  {
    id: 1,
    name: 'Appetizers and Salads',
    items: [
      { 
        id: 1, 
        name: 'Fresh Spring Rolls', 
        price: '$8.99', 
        description: 'Crisp vegetables and herbs wrapped in rice paper, served with peanut dipping sauce',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
        rating: 4.5,
        isVegetarian: true,
        isGlutenFree: true
      },
      { 
        id: 2, 
        name: 'Crispy Calamari', 
        price: '$12.99', 
        description: 'Lightly battered and fried squid served with spicy marinara sauce',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
        rating: 4.8
      },
      { 
        id: 3, 
        name: 'Classic Bruschetta', 
        price: '$9.99', 
        description: 'Toasted artisan bread topped with fresh tomatoes, basil, and extra virgin olive oil',
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f',
        rating: 4.3,
        isVegetarian: true
      },
    ],
  },
  {
    id: 2,
    name: 'Main Courses',
    items: [
      { 
        id: 4, 
        name: 'Grilled Salmon', 
        price: '$24.99', 
        description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
        rating: 4.9,
        isGlutenFree: true
      },
      { 
        id: 5, 
        name: 'Beef Tenderloin', 
        price: '$29.99', 
        description: 'Premium cut with red wine reduction and truffle mashed potatoes',
        image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef',
        rating: 4.7
      },
      { 
        id: 6, 
        name: 'Vegetable Pasta', 
        price: '$18.99', 
        description: 'Fresh fettuccine with seasonal vegetables in a light cream sauce',
        image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8f7666',
        rating: 4.4,
        isVegetarian: true
      },
    ],
  },
  {
    id: 3,
    name: 'Desserts',
    items: [
      { 
        id: 7, 
        name: 'Classic Tiramisu', 
        price: '$8.99', 
        description: 'Layers of coffee-soaked ladyfingers and mascarpone cream',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
        rating: 4.6
      },
      { 
        id: 8, 
        name: 'Chocolate Lava Cake', 
        price: '$7.99', 
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729',
        rating: 4.8
      },
      { 
        id: 9, 
        name: 'Crème Brûlée', 
        price: '$8.99', 
        description: 'Classic French vanilla custard with caramelized sugar crust',
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307',
        rating: 4.7,
        isGlutenFree: true
      },
    ],
  },
];

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    alt: 'Restaurant Interior',
    title: 'ELEGANT DINING',
    description: 'Where every moment becomes a cherished memory'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    alt: 'Chef Preparing Food',
    title: 'CULINARY ART',
    description: 'Masterpieces crafted with passion and precision'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    alt: 'Fine Dining Experience',
    title: 'FINE DINING',
    description: 'An experience that transcends the ordinary'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    alt: 'Restaurant Bar',
    title: 'CRAFTED SPIRITS',
    description: 'Where mixology meets artistry'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    alt: 'Wine Selection',
    title: 'VINTAGE SELECTION',
    description: 'A journey through the world\'s finest wines'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    alt: 'Special Events',
    title: 'MOMENTS TO REMEMBER',
    description: 'Creating unforgettable celebrations'
  }
];

type SortOption = 'name' | 'price' | 'rating';
type FilterOption = 'vegetarian' | 'glutenFree' | 'spicy';

export default function Menu() {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeFilters, setActiveFilters] = useState<Set<FilterOption>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set(menuCategories.map(cat => cat.id)));

  const handleImageError = (itemId: number) => {
    setFailedImages(prev => new Set([...prev, itemId]));
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const toggleFilter = (filter: FilterOption) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        next.add(filter);
      }
      return next;
    });
  };

  const filteredAndSortedMenu = useMemo(() => {
    return menuCategories.map(category => ({
      ...category,
      items: category.items
        .filter(item => {
          const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.description.toLowerCase().includes(searchQuery.toLowerCase());
          
          const matchesFilters = Array.from(activeFilters).every(filter => {
            switch (filter) {
              case 'vegetarian':
                return item.isVegetarian;
              case 'glutenFree':
                return item.isGlutenFree;
              case 'spicy':
                return item.isSpicy;
              default:
                return true;
            }
          });

          return matchesSearch && matchesFilters;
        })
        .sort((a, b) => {
          let comparison = 0;
          switch (sortBy) {
            case 'name':
              comparison = a.name.localeCompare(b.name);
              break;
            case 'price':
              comparison = parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
              break;
            case 'rating':
              comparison = (b.rating || 0) - (a.rating || 0);
              break;
          }
          return sortOrder === 'asc' ? comparison : -comparison;
        })
    }));
  }, [searchQuery, sortBy, sortOrder, activeFilters]);

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Menu</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Section */}
          <div className="lg:w-2/3">
            {/* Search and Filter Bar */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Filter size={20} className="text-gray-600" />
                  <button
                    onClick={() => toggleFilter('vegetarian')}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeFilters.has('vegetarian')
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    Vegetarian
                  </button>
                  <button
                    onClick={() => toggleFilter('glutenFree')}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeFilters.has('glutenFree')
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    Gluten Free
                  </button>
                  <button
                    onClick={() => toggleFilter('spicy')}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeFilters.has('spicy')
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    Spicy
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="rating">Sort by Rating</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {sortOrder === 'asc' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {filteredAndSortedMenu.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h2 className="text-2xl font-semibold">{category.name}</h2>
                    {expandedCategories.has(category.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedCategories.has(category.id) && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {category.items.map((item) => (
                          <motion.li 
                            key={item.id} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
                          >
                            <div className="flex flex-col md:flex-row">
                              <div className="relative w-full md:w-48 h-48">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 192px"
                                  className="object-cover"
                                  priority={item.id <= 3}
                                  onError={() => handleImageError(item.id)}
                                />
                              </div>
                              <div className="p-4 flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-lg font-bold">{item.name}</h3>
                                    {item.rating && (
                                      <div className="flex items-center mt-1">
                                        <Star size={16} className="text-yellow-400 fill-current" />
                                        <span className="ml-1 text-sm text-gray-600">{item.rating.toFixed(1)}</span>
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-orange-500 font-semibold text-lg">{item.price}</span>
                                </div>
                                <p className="text-gray-600 mt-2">{item.description}</p>
                                <div className="flex gap-2 mt-3">
                                  {item.isVegetarian && (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                      Vegetarian
                                    </span>
                                  )}
                                  {item.isGlutenFree && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                      Gluten Free
                                    </span>
                                  )}
                                  {item.isSpicy && (
                                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                      Spicy
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Section */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <h2 className="text-2xl font-semibold mb-6">Our Restaurant</h2>
              <div className="grid grid-cols-2 gap-4">
                {galleryImages.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <h3 className="text-white text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 tracking-wider">
                        {image.title}
                      </h3>
                      <p className="text-white/90 text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200 font-light tracking-wide">
                        {image.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 