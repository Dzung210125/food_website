import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  placeholderColor?: string;
  onError?: () => void;
}

export default function ImageWithLoading({
  src,
  alt,
  className = '',
  priority = false,
  loading = 'lazy',
  placeholderColor = 'bg-gray-200',
  onError
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  return (
    <div className="relative overflow-hidden">
      {/* Loading Placeholder */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`absolute inset-0 ${placeholderColor} animate-pulse`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      )}

      {/* Error State */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
        >
          <div className="text-center p-4">
            <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Failed to load image</p>
          </div>
        </motion.div>
      )}

      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={loading}
        className={`
          object-cover
          transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          ${hasError ? 'hidden' : ''}
          ${className}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        onError={handleError}
      />
    </div>
  );
} 