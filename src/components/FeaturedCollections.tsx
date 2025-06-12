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

interface FeaturedItem {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  alt: string;
}

const featuredItems: FeaturedItem[] = [
  {
    id: '1',
    title: 'UV PROTECTION COLLECTION',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/res88dcf8754870f840288709c2f224e6acfr.jpg',
    link: '/women/uv-protection',
    alt: 'UV PROTECTION COLLECTION'
  },
  {
    id: '2',
    title: 'BRA TOP COLLECTION',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/rese983c9379a0aeb1983b423354e064e8ffr.jpg',
    link: '/women/t-shirts-sweat-and-fleece/bra-tops',
    alt: 'BRA TOP COLLECTION'
  },
  {
    id: '3',
    title: 'LINEN COLLECTION',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/res91a6abc50bafc6bb4671db753d81ae25fr.jpg',
    link: '/women/linen',
    alt: 'LINEN COLLECTION'
  },
  {
    id: '4',
    title: 'T-SHIRTS COLLECTION',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/res6c199cfa84175feb7659cad1c205cd9efr.jpg',
    link: '/women/t-shirts-sweat-and-fleece/t-shirts',
    alt: 'T-SHIRTS COLLECTION'
  }
];

export default function FeaturedCollections() {
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
            {featuredItems.map((item) => (
              <SwiperSlide key={item.id} className={styles.slide}>
                <div>
                  <Link 
                    href={item.link} 
                    className={styles.link}
                    data-category="common_feature_banner"
                    data-label={`feature_${item.id}`}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={item.imageUrl}
                        alt={item.alt}
                        width={195}
                        height={260}
                        className={styles.image}
                        data-expand="300"
                      />
                    </div>
                    <p className={styles.itemTitle}>{item.title}</p>
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