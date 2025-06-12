'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedCollections.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  colors: string[];
}

interface FeaturedCollectionsProps {
  products: Product[];
}

export default function FeaturedCollections({ products }: FeaturedCollectionsProps) {
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <div>
        <p className={styles.title}>Featured Collections</p>
        <div className={styles.swiperContainer}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView="auto"
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== 'boolean') {
                const navigation = swiper.params.navigation;
                if (navigation) {
                  navigation.prevEl = navigationPrevRef.current;
                  navigation.nextEl = navigationNextRef.current;
                }
              }
            }}
            className={styles.swiper}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className={styles.slide}>
                <div>
                  <Link 
                    href={`/products/${product.id}`}
                    className={styles.link}
                    data-category="featured_product"
                    data-label={`product_${product.id}`}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={195}
                        height={260}
                        className={styles.image}
                        data-expand="300"
                      />
                    </div>
                    <p className={styles.itemTitle}>{product.name}</p>
                    <p className={styles.price}>{product.price}</p>
                    <div className={styles.colors}>
                      {product.colors.map((color, index) => (
                        <span key={index} className={styles.color}>{color}</span>
                      ))}
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
            <div ref={navigationPrevRef} className={styles.navigationPrev} />
            <div ref={navigationNextRef} className={styles.navigationNext} />
          </Swiper>
        </div>
      </div>
    </section>
  );
} 