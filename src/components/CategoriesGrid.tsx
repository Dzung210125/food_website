'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoriesGrid.module.css';

const categories = [
  {
    id: 1,
    name: 'Men',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/resf0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0fr.jpg',
    link: '/men'
  },
  {
    id: 2,
    name: 'Women',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/resf0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0fr.jpg',
    link: '/women'
  },
  {
    id: 3,
    name: 'Kids',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/resf0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0fr.jpg',
    link: '/kids'
  },
  {
    id: 4,
    name: 'Baby',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/resf0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0fr.jpg',
    link: '/baby'
  }
];

export default function CategoriesGrid() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by Category</h2>
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link key={category.id} href={category.link} className={styles.category}>
            <div className={styles.imageWrapper}>
              <Image
                src={category.imageUrl}
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