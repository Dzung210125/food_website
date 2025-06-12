'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './AppBanner.module.css';

export default function AppBanner() {
  return (
    <Link 
      href="https://uniqlo-vn.onelink.me/hUBc/ekiw68ii"
      className={styles.banner}
      data-category="common_feature_banner"
      data-label="app_banner"
    >
      <picture>
        <source
          data-srcset="https://im.uniqlo.com/global-cms/spa/resa388978f81df19ec9ce00a749ac9d38bfr.jpg"
          type="image/jpeg"
          media="(min-width: 813px)"
          srcSet="https://im.uniqlo.com/global-cms/spa/resa388978f81df19ec9ce00a749ac9d38bfr.jpg"
        />
        <source
          data-srcset="https://im.uniqlo.com/global-cms/spa/res7c3ac3889c840b84cff9522f3cd23b59fr.jpg"
          type="image/jpeg"
          srcSet="https://im.uniqlo.com/global-cms/spa/res7c3ac3889c840b84cff9522f3cd23b59fr.jpg"
        />
        <Image
          src="https://im.uniqlo.com/global-cms/spa/res7c3ac3889c840b84cff9522f3cd23b59fr.jpg"
          alt="GIRLS"
          width={1200}
          height={400}
          className={styles.image}
          data-expand="300"
        />
      </picture>
    </Link>
  );
} 