'use client';

import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

export function SmartVideo({ src, className, ...props }: React.VideoHTMLAttributes<HTMLVideoElement>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { margin: '200px' });

  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      if (props.autoPlay) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      videoRef.current.pause();
    }
  }, [isInView, props.autoPlay]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      {...props}
    />
  );
}
