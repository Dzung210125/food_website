import React from 'react';
import ImageWithLoading from './ImageWithLoading';
import styles from './UVProtectionSection.module.css';

const UVProtectionSection: React.FC = () => {
  return (
    <section className={styles.uvProtectionSection}>
      <div className={styles.imageContainer}>
        <ImageWithLoading
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
          alt="Summer Collection 2024"
          className={styles.uvImage}
          priority={false}
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default UVProtectionSection; 