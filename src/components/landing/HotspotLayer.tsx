'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CircleButton } from './CircleButton';
import { Hotspot } from './Hotspot';

export function HotspotLayer() {
  const t = useTranslations('Index');

  // Fade in as the user scrolls past 200px to 500px. It will stay visible until Section 2 covers it.
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [200, 500], [0, 1]);

  // Prevent clicks when invisible
  const pointerEvents = useTransform(opacity, (v) => (v > 0.5 ? 'auto' : 'none'));

  // MATCH THE PARALLAX OF THE BACKGROUND EXACTLY
  const y = useTransform(scrollY, [0, 1000], ['0%', '-15%']);

  return (
    <motion.div
      className="absolute inset-0 z-30 h-[120vh] w-full"
      style={{ opacity, pointerEvents, y, willChange: 'transform' }}
    >
      {/* Hotspot 1: Left Building */}
      <Hotspot x="20%" y="45%" title={t('crafted')} description={t('stone_desc')} />

      {/* Hotspot 2: Palm tree area */}
      <Hotspot x="57%" y="35%" title={t('crafted')} description={t('stone_desc')} />

      {/* Hotspot 3: Poolside */}
      <Hotspot x="70%" y="75%" title={t('crafted')} description={t('stone_desc')} />

      {/* Bottom Center Magnetic Button */}
      <div className="absolute bottom-[calc(20vh+4rem)] left-1/2 z-50 -translate-x-1/2">
        <CircleButton
          text={t('view_available')}
          variant="light"
          href="/"
          className="pointer-events-auto"
        />
      </div>
    </motion.div>
  );
}
