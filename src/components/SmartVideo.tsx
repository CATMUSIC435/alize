'use client';

import { useInView } from 'framer-motion';
import { useEffect, useRef, useSyncExternalStore } from 'react';

const MEDIA_QUERY = '(min-width: 768px)';

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(MEDIA_QUERY);
  mediaQuery.addEventListener('change', callback);
  return () => {
    mediaQuery.removeEventListener('change', callback);
  };
}

function getSnapshot() {
  return window.matchMedia(MEDIA_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Render an optimized video element that pauses out of view and skips rendering on mobile viewports.
 *
 * @param props - Video element attributes and optional desktopOnly configuration.
 * @returns The video element or null when hidden on mobile.
 */
export function SmartVideo(
  props: React.VideoHTMLAttributes<HTMLVideoElement> & {
    desktopOnly?: boolean;
  },
) {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const videoRef = useRef<HTMLVideoElement>(null);
  // 80px buffer: smooth margin before pausing to avoid jarring cutoffs
  const isInView = useInView(videoRef, { margin: '80px' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (isInView && !document.hidden) {
      if (props.autoPlay !== false) {
        video.play().catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isInView, props.autoPlay]);

  // Pause when browser tab is inactive to preserve CPU/GPU
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isInView && props.autoPlay !== false) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isInView, props.autoPlay]);

  if (props.desktopOnly !== false && !isDesktop) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      src={props.src}
      className={`pointer-events-none ${props.className ?? ''}`}
      autoPlay={false}
      loop={props.loop}
      muted={props.muted}
      playsInline={props.playsInline ?? true}
      preload="metadata"
      controls={false}
      controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
      tabIndex={-1}
      style={{
        ...props.style,
        visibility: isInView ? 'visible' : 'hidden',
      }}
      {...({
        'webkit-playsinline': 'true',
        'x5-playsinline': 'true',
        'x5-video-player-type': 'h5-page',
        'x5-video-player-fullscreen': 'false',
      } as Record<string, string>)}
      disablePictureInPicture
      disableRemotePlayback
      aria-label={props['aria-label']}
      aria-hidden={props['aria-hidden']}
    />
  );
}
