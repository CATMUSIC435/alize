'use client';

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Hotspot } from './Hotspot';

export function HotspotLayer() {
  const t = useTranslations('Index');
  const [activeHotspotId, setActiveHotspotId] = useState<number | null>(null);
  const [userExplicitlyClosed, setUserExplicitlyClosed] = useState(false);

  // Fade in as the user scrolls past 60px to 160px so it is fully solid before auto-opening.
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [60, 160], [0, 1]);

  // Initial check on mount in case user is already scrolled into Section 1
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const currentScroll = window.scrollY;
    const isMobile = window.innerWidth < 768;
    const heroEnd = isMobile ? window.innerHeight * 0.95 : window.innerHeight * 1.5;
    if (currentScroll >= 60 && currentScroll < heroEnd) {
      setActiveHotspotId(1);
    }
  }, []);

  // Auto-expand Hotspot 1 when scrolling into Section 1 (from top OR when scrolling back up from below).
  // Auto-close when leaving Section 1 (scrolling down to Section 2 or back to top).
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const heroEnd = isMobile
      ? (typeof window !== 'undefined' ? window.innerHeight * 0.95 : 800)
      : (typeof window !== 'undefined' ? window.innerHeight * 1.5 : 1350);

    const isInHeroSection = latest >= 60 && latest < heroEnd;

    if (isInHeroSection) {
      if (activeHotspotId === null && !userExplicitlyClosed) {
        setActiveHotspotId(1);
      }
    } else {
      if (activeHotspotId !== null) {
        setActiveHotspotId(null);
      }
      // Reset explicit close when scrolling away so returning to Section 1 shows it again
      setUserExplicitlyClosed(false);
    }
  });

  // Prevent clicks when invisible
  const pointerEvents = useTransform(opacity, (v) => (v > 0.2 ? 'auto' : 'none'));

  // MATCH THE PARALLAX OF THE BACKGROUND EXACTLY
  const y = useTransform(scrollY, [0, 1000], ['0%', '-15%']);

  const projectOverview = {
    name: t('project_name'),
    subtitle: t('project_subtitle'),
    specs: [
      { label: t('project_developer_label'), value: t('project_developer_val'), colSpan: 1 },
      { label: t('project_operator_label'), value: t('project_operator_val'), colSpan: 1 },
      { label: t('project_location_label'), value: t('project_location_val'), colSpan: 2 },
      { label: t('project_area_label'), value: t('project_area_val'), colSpan: 1 },
      { label: t('project_scale_label'), value: t('project_scale_val'), colSpan: 1 },
      { label: t('project_handover_label'), value: t('project_handover_val'), colSpan: 1 },
      { label: t('project_total_units_label'), value: t('project_total_units_val'), colSpan: 1 },
      { label: t('project_product_types_label'), value: t('project_product_types_val'), colSpan: 2 },
    ],
  };

  return (
    <motion.div
      className="absolute inset-0 z-30 h-[120vh] w-full"
      style={{ opacity, pointerEvents, y, willChange: 'transform' }}
    >
      {/* Hotspot 1: Left Architectural Staircase - Alizé Project Overview */}
      <Hotspot
        x="18%"
        y="44%"
        overview={projectOverview}
        isOpen={activeHotspotId === 1}
        onHover={() => {
          if (!userExplicitlyClosed) {
            setActiveHotspotId(1);
          }
        }}
        onToggle={() => {
          if (activeHotspotId === 1) {
            setActiveHotspotId(null);
            setUserExplicitlyClosed(true);
          } else {
            setActiveHotspotId(1);
            setUserExplicitlyClosed(false);
          }
        }}
        onClose={() => {
          setActiveHotspotId(null);
          setUserExplicitlyClosed(true);
        }}
      />

      {/* Hotspot 2: Kitchen Island */}
      <Hotspot
        x="60%"
        y="38%"
        title={t('crafted')}
        description={t('stone_desc')}
        onHover={() => setActiveHotspotId(null)}
      />

      {/* Hotspot 3: Sunlit Outdoor Terrace */}
      <Hotspot
        x="82%"
        y="48%"
        title={t('crafted')}
        description={t('stone_desc')}
        onHover={() => setActiveHotspotId(null)}
      />
    </motion.div>
  );
}
