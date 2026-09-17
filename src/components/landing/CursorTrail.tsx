'use client';

import { useEffect, useRef } from 'react';

// Amount of trail points (longer for calligraphy feel)
const TRAIL_LENGTH = 80;

export function CursorTrail() {
  const svgRef = useRef<SVGSVGElement>(null);
  // Store refs to multiple path segments for the tapering + smooth curve effect
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);

  // Store the actual mouse coordinates
  const mouse = useRef({ x: 0, y: 0 });
  // Store the trail points coordinates
  const trail = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 })));

  const rafId = useRef<number>(0);
  const isRunning = useRef(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return () => {};
    }

    const render = () => {
      const points = trail.current;
      const [firstPoint] = points;

      if (!firstPoint) {
        isRunning.current = false;
        return;
      }

      let totalDelta = Math.abs(mouse.current.x - firstPoint.x) + Math.abs(mouse.current.y - firstPoint.y);

      // Slower lerp for the head (creates drag)
      points[0] = {
        x: firstPoint.x + (mouse.current.x - firstPoint.x) * 0.2,
        y: firstPoint.y + (mouse.current.y - firstPoint.y) * 0.2,
      };

      // Much slower lerp subsequent points for a long, fluid, slow-moving tail
      for (let i = 1; i < TRAIL_LENGTH; i += 1) {
        const curr = points[i];
        const prev = points[i - 1];
        if (!curr || !prev) {
          continue;
        }

        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        totalDelta += Math.abs(dx) + Math.abs(dy);

        points[i] = {
          x: curr.x + dx * 0.15,
          y: curr.y + dy * 0.15,
        };
      }

      // Update individual path segments directly in the DOM using Bezier curves
      for (let i = 0; i < TRAIL_LENGTH - 1; i += 1) {
        const path = pathsRef.current[i];
        if (!path) {
          continue;
        }

        let d = '';

        if (i === 0) {
          const [p0, p1] = points;
          if (p0 && p1) {
            const nextMidX = (p0.x + p1.x) / 2;
            const nextMidY = (p0.y + p1.y) / 2;
            d = `M ${p0.x},${p0.y} L ${nextMidX},${nextMidY}`;
          }
        } else {
          const prev = points[i - 1];
          const curr = points[i];
          const next = points[i + 1];
          if (prev && curr && next) {
            const prevMidX = (prev.x + curr.x) / 2;
            const prevMidY = (prev.y + curr.y) / 2;
            const nextMidX = (curr.x + next.x) / 2;
            const nextMidY = (curr.y + next.y) / 2;
            d = `M ${prevMidX},${prevMidY} Q ${curr.x},${curr.y} ${nextMidX},${nextMidY}`;
          }
        }

        path.setAttribute('d', d);
      }

      // Idle pause: When trail converges to the mouse position, stop RAF to save 100% CPU/battery
      if (totalDelta > 0.1) {
        rafId.current = requestAnimationFrame(render);
      } else {
        isRunning.current = false;
      }
    };

    const startRender = () => {
      if (!isRunning.current) {
        isRunning.current = true;
        rafId.current = requestAnimationFrame(render);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      startRender();
    };

    const onFirstMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      mouse.current = { x: clientX, y: clientY };
      trail.current = Array.from({ length: TRAIL_LENGTH }, () => ({ x: clientX, y: clientY }));
      window.removeEventListener('pointermove', onFirstMove);
      startRender();
    };

    window.addEventListener('pointermove', onFirstMove, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointermove', onFirstMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      isRunning.current = false;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden overflow-hidden md:block">
      <svg
        ref={svgRef}
        className="h-full w-full"
        style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
      >
        {Array.from({ length: TRAIL_LENGTH - 1 }).map((_, index) => {
          // Calculate tapering effect (thicker at head, thinner at tail)
          const ratio = 1 - index / (TRAIL_LENGTH - 1);
          const strokeWidth = Math.max(0.1, 1.5 * ratio);
          const opacity = Math.max(0, 0.8 * ratio);

          return (
            <path
              key={index}
              ref={(el) => {
                pathsRef.current[index] = el;
              }}
              fill="none"
              stroke="#B3C6D3"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mix-blend-difference"
              style={{ opacity }}
            />
          );
        })}
      </svg>
    </div>
  );
}
