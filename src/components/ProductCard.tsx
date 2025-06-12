'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  discount?: number;
}

export default function ProductCard({
  name,
  price,
  image,
  colors,
  sizes,
  isNew = false,
  discount
}: ProductCardProps) {
  return (
    <motion.div
      className="group bg-white"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Main Image */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay Effects */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-black text-white text-xs px-3 py-1.5 tracking-wider">
              NEW ARRIVAL
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-xs px-3 py-1.5 tracking-wider">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Color Swatches */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            {colors.map((color) => (
              <div
                key={color}
                className="w-6 h-6 rounded-full border-2 border-white"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 group-hover:text-gray-600 transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-gray-600 font-medium">{price}</p>
          {discount && (
            <p className="text-red-500 text-sm line-through">
              ${(parseFloat(price.replace('$', '')) * (1 + discount / 100)).toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {colors.map((color) => (
              <span
                key={color}
                className="text-xs text-gray-500 border border-gray-200 px-2 py-1 rounded-full"
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex gap-1">
            {sizes.map((size) => (
              <span
                key={size}
                className="text-xs text-gray-500 border border-gray-200 px-2 py-1 rounded-full hover:border-gray-300 cursor-pointer"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 