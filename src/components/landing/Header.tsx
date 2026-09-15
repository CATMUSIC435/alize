'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useUIStore } from '@/store/useUIStore';
import { NavigationMenu } from './NavigationMenu';

export function Header({ alwaysDark }: { alwaysDark?: boolean }) {
  const headerTheme = useUIStore((state) => state.headerTheme);
  const isDark = alwaysDark ?? headerTheme === 'dark';

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.5, duration: 1, ease: 'easeOut' }}
      className={`pointer-events-none fixed top-0 left-0 z-50 flex w-full items-start justify-between p-4 transition-colors duration-700 md:p-8 ${isDark ? 'text-[#151926]' : 'text-white'}`}
    >
      {/* Left side: Logo */}
      <div className="pointer-events-auto ml-2 md:ml-4">
        <Link href="/" aria-label="Home" className="block transition-opacity hover:opacity-80">
          <Image
            src="/logo-alize.png"
            alt="Alize Logo"
            width={80}
            height={160}
            className="h-auto w-12 object-contain md:w-16 lg:w-20"
          />
        </Link>
      </div>

      {/* Right side: Navigation */}
      <NavigationMenu isDark={isDark} />
    </motion.header>
  );
}
