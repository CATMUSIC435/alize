import { Inter, Playfair_Display } from 'next/font/google';

/**
 * Shared Playfair Display serif font configuration across the application.
 * Centralized to avoid duplicate font chunks, redundant preloads, and browser warnings.
 */
export const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-playfair',
});

/**
 * Shared Playfair Display Italic serif font configuration.
 */
export const playfairItalic = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  style: 'italic',
  display: 'swap',
  variable: '--font-playfair-italic',
});

/**
 * Shared Inter sans-serif font configuration across the application.
 * Centralized to avoid duplicate font chunks, redundant preloads, and browser warnings.
 */
export const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});
