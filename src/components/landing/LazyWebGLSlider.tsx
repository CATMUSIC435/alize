'use client';

import dynamic from 'next/dynamic';

type LazyWebGLSliderProps = {
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
};

const DynamicWebGLSlider = dynamic(
  () => import('./WebGLSlider').then((mod) => mod.WebGLSlider),
  {
    ssr: false,
  },
);

/**
 * Code-split Lazy WebGL Slider wrapper that delays Three.js bundle parsing until near-viewport.
 * Renders WebGLSlider dynamically on client only to isolate GPU and Three.js memory footprints.
 */
export function LazyWebGLSlider(props: LazyWebGLSliderProps) {
  return <DynamicWebGLSlider {...props} />;
}
