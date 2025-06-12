'use client';

import { useRef, useState } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className={styles.kvArea}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.video}
          src="https://image.uniqlo.com/UQ/ST3/jp/imagesother/roger-federer-collection/video/rf_kv-sp_v2_min.mp4"
          autoPlay
          loop
          playsInline
          muted
          preload="auto"
          poster="https://image.uniqlo.com/UQ/ST3/jp/imagesother/roger-federer-collection/rf_kv-sp.png"
        />
        <button
          className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isPlaying ? (
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor" />
            ) : (
              <path d="M8 5v14l11-7-11-7z" fill="currentColor" />
            )}
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          The Roger Federer <br />Collection
        </h1>
        <p className={styles.description}>
          A Modern Capsule Of Versatile Sportwear Influenced By Roger Federer, Designed By UNIQLO.
        </p>
      </div>
    </section>
  );
} 