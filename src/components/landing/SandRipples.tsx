import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function SandRipples(props: { position?: 'left' | 'right' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '200px' });
  const isLeft = (props.position ?? 'left') === 'left';

  // Generate overlapping, flowing ribbon waves
  const ribbonPaths = [];
  const numLines = 20; // Optimized but rich

  for (let i = 0; i < numLines; i += 1) {
    // Grouping effect adjusted so lines stay closer together
    const groupOffset = Math.sin(i * 0.25) * 20;
    const startX = (isLeft ? 5 : 495) + (isLeft ? 1 : -1) * (groupOffset + i * 3); // Tighter spacing, closer to edge

    const amp = isLeft ? 1 : -1;

    // Smooth organic inward and outward sways to avoid straight barcode lines!
    // inSway goes towards the center (max ~200px)
    const inSway = 180 * amp + Math.cos(i * 0.15) * 35;
    // outSway stays near the edge (max ~60px) to safely pass the carousel
    const outSway = 40 * amp + Math.sin(i * 0.2) * 25;

    const p0X = startX + outSway;
    const p1X = startX + inSway;
    const p2X = startX + outSway; // At carousel
    const p3X = startX + inSway;
    const p4X = startX + outSway;

    // 100% wavy, zero straight lines.
    const d = `M ${p0X},-1000 
               C ${p0X},-200 ${p1X},400 ${p1X},1400
               C ${p1X},2200 ${p2X},2200 ${p2X},3000
               C ${p2X},3800 ${p3X},3800 ${p3X},4600
               C ${p3X},5400 ${p4X},5400 ${p4X},6200`;

    ribbonPaths.push({
      d,
      opacity: Number((0.05 + Math.abs(Math.sin(i * 0.4)) * 0.15).toFixed(4)),
    });
  }

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute top-[-1400px] bottom-[-800px] z-0 w-[45vw] max-w-[800px] overflow-hidden opacity-60 ${
        isLeft ? 'left-0' : 'right-0'
      }`}
    >
      <motion.svg
        viewBox="0 -1600 500 5600"
        preserveAspectRatio="none"
        className="h-full w-full"
        animate={
          isInView
            ? {
                x: isLeft ? [0, 15, 0] : [0, -15, 0],
              }
            : undefined
        }
        transition={{
          duration: 8,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        {ribbonPaths.map((path, i) => (
          <path
            key={i}
            d={path.d}
            fill="none"
            stroke="#151926"
            strokeWidth="0.4"
            opacity={path.opacity}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </motion.svg>
    </div>
  );
}
