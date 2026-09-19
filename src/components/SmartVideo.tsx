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
  // 150px buffer: smooth margin before pausing to avoid jarring cutoffs
  const isInView = useInView(videoRef, { margin: '150px' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    // Force DOM muted property to ensure browser autoplay policy compliance
    if (props.muted !== false) {
      video.muted = true;
      video.defaultMuted = true;
    }

    const tryPlay = () => {
      if (props.autoPlay !== false) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            const handleInteraction = () => {
              if (videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current.play().catch(() => {});
              }
            };
            window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
            window.addEventListener('click', handleInteraction, { once: true, passive: true });
            window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
          });
        }
      }
    };

    if (isInView && !document.hidden) {
      tryPlay();
    } else {
      video.pause();
    }
  }, [isInView, props.autoPlay, props.muted]);

  // Pause when browser tab is inactive to preserve CPU/GPU
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isInView && props.autoPlay !== false) {
        if (props.muted !== false) {
          video.muted = true;
        }
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isInView, props.autoPlay, props.muted]);

  // Only hide/unmount if desktopOnly is explicitly set to true AND viewport is mobile
  if (props.desktopOnly === true && !isDesktop) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      src={props.src}
      className={`pointer-events-none ${props.className ?? ''}`}
      autoPlay={props.autoPlay ?? true}
      loop={props.loop ?? true}
      muted={props.muted ?? true}
      playsInline={props.playsInline ?? true}
      preload="auto"
      controls={false}
      controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
      tabIndex={-1}
      style={{
        ...props.style,
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
