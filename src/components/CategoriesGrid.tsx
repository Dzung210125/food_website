'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoriesGrid.module.css';

interface Category {
  id: number;
  name: string;
  image: string;
  link: string;
}

interface CategoriesGridProps {
  categories: Category[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by Category</h2>
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link key={category.id} href={category.link} className={styles.category}>
            <div className={styles.imageWrapper}>
              <Image
                src={category.image}
                alt={category.name}
                fill
                className={styles.image}
              />
            </div>
            <h3 className={styles.categoryName}>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
} 