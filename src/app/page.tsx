'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Star, Utensils } from 'lucide-react';
import ImageWithLoading from '@/components/ImageWithLoading';
import { useState } from 'react';

export default function Home() {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleImageError = (itemId: number) => {
    setFailedImages(prev => new Set([...prev, itemId]));
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithLoading
            src="/images/hero.jpg"
            alt="Restaurant hero image"
            className="object-cover"
            priority
            loading="eager"
            placeholderColor="bg-gray-800"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Delicious Food for Every{` `}
            <span className="text-orange-400">Occasion</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100">
            Experience the finest culinary delights crafted with passion and expertise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
            >
              View Our Menu
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 backdrop-blur-sm"
            >
              Make Reservation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <Clock className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Open Daily</h3>
              <p className="text-gray-600">11:00 AM - 10:00 PM</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <Star className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Top Rated</h3>
              <p className="text-gray-600">4.9/5 Customer Rating</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <Utensils className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">Locally Sourced Daily</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Dishes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our chef&apos;s special selection of signature dishes, crafted with the finest ingredients
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: 1,
              name: 'Signature Pasta',
              description: 'Handmade pasta with truffle cream sauce and wild mushrooms',
              image: '/images/food/featured/pasta.jpg',
              price: '$24.99'
            },
            {
              id: 2,
              name: 'Grilled Salmon',
              description: 'Fresh Atlantic salmon with citrus butter sauce and asparagus',
              image: '/images/food/featured/salmon.jpg',
              price: '$28.99'
            },
            {
              id: 3,
              name: 'Chocolate Soufflé',
              description: 'Warm chocolate soufflé with vanilla ice cream',
              image: '/images/food/featured/souffle.jpg',
              price: '$12.99'
            }
          ].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithLoading
                  src={item.image}
                  alt={item.name}
                  className="transition-transform duration-300 group-hover:scale-110"
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  placeholderColor={failedImages.has(item.id) ? 'bg-gray-100' : 'bg-gray-200'}
                  onError={() => handleImageError(item.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-semibold">{item.name}</h3>
                  <span className="text-orange-500 font-semibold text-lg">{item.price}</span>
                </div>
                <p className="text-gray-600 mb-6">
                  {item.description}
                </p>
                <Link
                  href="/menu"
                  className="inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold group-hover:translate-x-2 transition-transform"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Experience Great Food?</h2>
            <p className="text-xl mb-8 text-orange-100">
              Join us for an unforgettable dining experience
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
            >
              Make a Reservation
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
