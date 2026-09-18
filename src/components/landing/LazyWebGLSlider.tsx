'use client';

import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { SimpleSlider } from './SimpleSlider';

const DynamicWebGLSlider = dynamic(
  () => import('./WebGLSlider').then((mod) => mod.WebGLSlider),
  {
    ssr: false,
  },
);

/**
 * Responsive Slider wrapper:
 * - On mobile (< 768px): Uses pure CSS/Image SimpleSlider to avoid Three.js bundle and WebGL context overhead.
 * - On desktop (>= 768px): Lazily mounts DynamicWebGLSlider well ahead of viewport (1200px margin) or during idle.
 */
export function LazyWebGLSlider(props: {
  images: string[];
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  hideControls?: boolean;
  absoluteFill?: boolean;
  fullHeight?: boolean;
  alignRight?: boolean;
  controlsLeft?: boolean;
  noRounded?: boolean;
  autoplay?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '1200px', once: true });
  const [isDesktop, setIsDesktop] = useState(false);
  const [idleLoaded, setIdleLoaded] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => {
        setIdleLoaded(true);
      });
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(() => {
      setIdleLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isDesktop]);

  const wrapperClass = props.absoluteFill ? 'absolute inset-0 h-full w-full' : 'w-full';

  if (!isDesktop || (!isInView && !idleLoaded)) {
    return (
      <div ref={containerRef} className={wrapperClass}>
        <SimpleSlider {...props} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={wrapperClass}>
      <DynamicWebGLSlider {...props} />
    </div>
  );
}
