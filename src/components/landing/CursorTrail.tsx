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

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return () => {
        window.removeEventListener('pointermove', onPointerMove);
      };
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const render = () => {
      const points = trail.current;
      const [firstPoint] = points;

      if (!firstPoint) {
        return;
      }

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

        points[i] = {
          x: curr.x + (prev.x - curr.x) * 0.15,
          y: curr.y + (prev.y - curr.y) * 0.15,
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
            // First segment: from point 0 to the midpoint of 0 and 1
            const nextMidX = (p0.x + p1.x) / 2;
            const nextMidY = (p0.y + p1.y) / 2;
            d = `M ${p0.x},${p0.y} L ${nextMidX},${nextMidY}`;
          }
        } else {
          const prev = points[i - 1];
          const curr = points[i];
          const next = points[i + 1];
          if (prev && curr && next) {
            // Middle segments: from prev midpoint, using current point as control, to next midpoint
            const prevMidX = (prev.x + curr.x) / 2;
            const prevMidY = (prev.y + curr.y) / 2;
            const nextMidX = (curr.x + next.x) / 2;
            const nextMidY = (curr.y + next.y) / 2;
            d = `M ${prevMidX},${prevMidY} Q ${curr.x},${curr.y} ${nextMidX},${nextMidY}`;
          }
        }

        path.setAttribute('d', d);
      }

      rafId.current = requestAnimationFrame(render);
    };

    const onFirstMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      mouse.current = { x: clientX, y: clientY };
      trail.current = Array.from({ length: TRAIL_LENGTH }, () => ({ x: clientX, y: clientY }));
      window.removeEventListener('pointermove', onFirstMove);
      rafId.current = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onFirstMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointermove', onFirstMove);
      cancelAnimationFrame(rafId.current);
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
