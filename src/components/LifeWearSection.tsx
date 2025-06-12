'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import styles from './LifeWearSection.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface LifeWearItem {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  alt: string;
}

const lifeWearItems: LifeWearItem[] = [
  {
    id: '1',
    title: '2025 Spring Summer LifeWear Collection',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/resf1a11c86f87e2c1eb136bd2cd25236b7fr.jpg',
    link: '/special-feature/lifewear-collection',
    alt: '2025 Spring Summer LifeWear Collection'
  },
  {
    id: '2',
    title: 'Simplicity, made even better. This is what UNIQLO\'s products are all about.',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/res6db93ea6587fbfab740bc65960f4d93ffr.jpg',
    link: '/contents/feature/masterpiece',
    alt: 'Simplicity, made even better. This is what UNIQLO\'s products are all about.'
  },
  {
    id: '3',
    title: 'Introducing new spring items you can wear right now!',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/resfed40d56c34edca3f4e0365fe7f69701fr.jpg',
    link: '/special-feature/seasonal',
    alt: 'Introducing new spring items you can wear right now!'
  },
  {
    id: '4',
    title: 'Watch livestream video of new products and shop LifeWear in real time.',
    imageUrl: 'https://im.uniqlo.com/global-cms/spa/res16ad698e55af029d08fb2399f07c797afr.jpg',
    link: '/special-feature/live-station',
    alt: 'Watch livestream video of new products and shop LifeWear in real time.'
  }
];

export default function LifeWearSection() {
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.section}>
      <p className={styles.title}>About LifeWear</p>
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
          {lifeWearItems.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <div>
                <Link href={item.link} className={styles.link}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.imageUrl}
                      alt={item.alt}
                      width={195}
                      height={260}
                      className={styles.image}
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
    </section>
  );
} 