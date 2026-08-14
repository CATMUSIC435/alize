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
  const trail = useRef(Array(TRAIL_LENGTH).fill({ x: 0, y: 0 }));
  
  const rafId = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onPointerMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const render = () => {
      const points = trail.current;
      
      // Slower lerp for the head (creates drag)
      points[0] = {
        x: points[0].x + (mouse.current.x - points[0].x) * 0.2,
        y: points[0].y + (mouse.current.y - points[0].y) * 0.2,
      };

      // Much slower lerp subsequent points for a long, fluid, slow-moving tail
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        points[i] = {
          x: points[i].x + (points[i - 1].x - points[i].x) * 0.15,
          y: points[i].y + (points[i - 1].y - points[i].y) * 0.15,
        };
      }

      // Update individual path segments directly in the DOM using Bezier curves
      for (let i = 0; i < TRAIL_LENGTH - 1; i++) {
        const path = pathsRef.current[i];
        if (!path) continue;

        let d = '';

        if (i === 0) {
          // First segment: from point 0 to the midpoint of 0 and 1
          const nextMidX = (points[0].x + points[1].x) / 2;
          const nextMidY = (points[0].y + points[1].y) / 2;
          d = `M ${points[0].x},${points[0].y} L ${nextMidX},${nextMidY}`;
        } else {
          // Middle segments: from prev midpoint, using current point as control, to next midpoint
          const prevMidX = (points[i - 1].x + points[i].x) / 2;
          const prevMidY = (points[i - 1].y + points[i].y) / 2;
          const nextMidX = (points[i].x + points[i + 1].x) / 2;
          const nextMidY = (points[i].y + points[i + 1].y) / 2;
          d = `M ${prevMidX},${prevMidY} Q ${points[i].x},${points[i].y} ${nextMidX},${nextMidY}`;
        }

        path.setAttribute('d', d);
      }

      rafId.current = requestAnimationFrame(render);
    };

    const onFirstMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      mouse.current = { x: clientX, y: clientY };
      trail.current = Array(TRAIL_LENGTH).fill({ x: clientX, y: clientY });
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
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      <svg ref={svgRef} className="h-full w-full" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}>
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
