'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ProductCarousel from '@/components/ProductCarousel';
import LifeWearSection from '@/components/LifeWearSection';
import CategoriesGrid from '@/components/CategoriesGrid';
import FeaturedCollections from '@/components/FeaturedCollections';
import AppBanner from '@/components/AppBanner';
import HeroSection from '@/components/HeroSection';
import UVProtectionSection from '@/components/UVProtectionSection';
import styles from './page.module.css';

const categories = [
  {
    id: 1,
    name: 'Summer Collection',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22',
    link: '/summer-collection'
  },
  {
    id: 2,
    name: 'Dresses',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    link: '/dresses'
  },
  {
    id: 3,
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
    link: '/accessories'
  },
  {
    id: 4,
    name: 'Bestsellers',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80',
    link: '/bestsellers'
  }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Floral Summer Dress',
    price: '$89.90',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    colors: ['Pink', 'Blue', 'White']
  },
  {
    id: 2,
    name: 'Designer Handbag',
    price: '$129.90',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80',
    colors: ['Beige', 'Black', 'Brown']
  },
  {
    id: 3,
    name: 'Elegant Blouse',
    price: '$59.90',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
    colors: ['White', 'Cream', 'Black']
  },
  {
    id: 4,
    name: 'Summer Hat',
    price: '$39.90',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
    colors: ['Straw', 'Black', 'White']
  }
];

const products = [
  {
    id: "SS2024-001",
    priceGroup: "00",
    colorCode: "01",
    name: "Summer Collection Dress",
    price: "89.90 USD",
    gender: "Women, XS-L",
    sizes: "XS-L",
    colorVariants: [
      {
        colorCode: "01",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        chipImageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        name: "PINK"
      },
      {
        colorCode: "02",
        imageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
        chipImageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
        name: "BLUE"
      }
    ]
  }
];

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <CategoriesGrid />
      <FeaturedCollections />
      <LifeWearSection />
      <UVProtectionSection />
      <AppBanner />
      <section className={styles.featuredProducts}>
        <h2 className={styles.sectionTitle}>Featured Collection</h2>
        <div className={styles.productGrid}>
          <ProductCarousel products={products} />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Fashion Community</h2>
          <p className="text-gray-400 mb-8">Subscribe to get exclusive access to new collections, special events, and VIP offers.</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
            />
            <button className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
