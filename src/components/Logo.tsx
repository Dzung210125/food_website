'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <Link href="/" className={`inline-block ${className}`}>
      <motion.div
        className={`font-bold ${sizeClasses[size]}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-orange-500">d</span>
        <span className="text-gray-800">zung</span>
        <motion.span
          className="text-orange-500 ml-1"
          animate={{
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          .
        </motion.span>
      </motion.div>
    </Link>
  );
} 