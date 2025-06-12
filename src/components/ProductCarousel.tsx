import { useState } from 'react';
import ImageWithLoading from './ImageWithLoading';
import Link from 'next/link';
import styles from './ProductCarousel.module.css';

interface ColorVariant {
  colorCode: string;
  imageUrl: string;
  chipImageUrl: string;
  name: string;
}

interface Product {
  id: string;
  priceGroup: string;
  colorCode: string;
  name: string;
  price: string;
  gender: string;
  sizes: string;
  futureExhibition?: string;
  colorVariants: ColorVariant[];
}

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  return (
    <div className={styles['fr-bff-products']}>
      {products.map((product) => (
        <div key={product.id} className={styles['fr-bff-product']}>
          <Link 
            href={`/products/${product.id}?colorCode=COL${product.colorCode}`}
            className={styles['fr-bff-product_inner']}
            data-color-code={product.colorCode}
          >
            <div className={styles['fr-bff-product_imgWrapper']}>
              <figure className={styles['u-imgAdjustBox']} data-aspect-ratio="3:4">
                <picture className={styles['u-imgAdjustBox_inner']}>
                  <ImageWithLoading
                    src={product.colorVariants.find(v => v.colorCode === product.colorCode)?.imageUrl || ''}
                    dataSrc={product.colorVariants.find(v => v.colorCode === product.colorCode)?.imageUrl || ''}
                    alt={product.name}
                    colorCode={product.colorCode}
                    expand={300}
                    className={styles['fr-img']}
                  />
                </picture>
              </figure>

              <div className={styles['fr-bff-product_colorChipsAndFavorite']}>
                <div className={styles['fr-bff-product_colorChipsAndIcon']}>
                  <div className={styles['fr-bff-product_colorChips_container']}>
                    <ul className={styles['fr-bff-product_colorChips']}>
                      {product.colorVariants.map((variant) => (
                        <li
                          key={variant.colorCode}
                          className={`${styles['fr-bff-product_colorChip']} ${styles['u-Hover']}`}
                          data-color-code={variant.colorCode}
                        >
                          <img
                            className={styles['fr-bff-product_colorChip_img']}
                            src={variant.chipImageUrl}
                            alt={variant.name}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  className={`${styles['fr-bff-favorite']} ${
                    favorites.has(product.id) ? styles['is-active'] : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(product.id);
                  }}
                  aria-label="Add to wish list"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    focusable="false"
                    className={styles['fr-bff-favorite_icon']}
                    role="presentation"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.23254 4.93861C9.23984 4.89569 10.2176 5.25233 10.9828 5.92576L11.9951 6.81992L13.0085 5.92576C13.7727 5.25131 14.7616 4.89467 15.7577 4.93861C16.7661 4.9754 17.7154 5.39744 18.4306 6.12605C19.1449 6.85364 19.559 7.82137 19.5987 8.85144C19.6374 9.88049 19.2975 10.8789 18.6412 11.6616L18.5446 11.7761L11.9951 18.4736L5.34904 11.6616C4.69277 10.8779 4.35294 9.88049 4.39262 8.85144C4.43128 7.82137 4.84641 6.85466 5.55965 6.12605C6.27494 5.39744 7.22423 4.9754 8.23254 4.93861Z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles['fr-bff-product_content']}>
              <p className={styles['fr-bff-product_gender']}>{product.gender}</p>
              <p className={styles['fr-bff-product_name']}>{product.name}</p>
              {product.futureExhibition && (
                <p className={styles['fr-bff-product_futureExhibition']}>{product.futureExhibition}</p>
              )}
              <p className={styles['fr-bff-product_price']}>{product.price}</p>
              <p className={styles['fr-bff-product_sizes']}>{product.sizes}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
} 