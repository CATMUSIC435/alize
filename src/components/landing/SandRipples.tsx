import { motion } from 'framer-motion';

export function SandRipples(props: { position?: 'left' | 'right' }) {
  const isLeft = (props.position ?? 'left') === 'left';

  // Generate overlapping, flowing ribbon waves
  const ribbonPaths = [];
  const numLines = 30; // Optimized but rich

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
      opacity: 0.05 + Math.abs(Math.sin(i * 0.4)) * 0.15,
    });
  }

  return (
    <div
      className={`pointer-events-none absolute top-[-1400px] bottom-[-800px] z-0 w-[45vw] max-w-[800px] overflow-hidden ${
        isLeft ? 'left-0' : 'right-0'
      }`}
      style={{
        // Radial gradient ensures a soft fade out on ALL edges (Top, Bottom, Left, Right)
        // This completely eliminates any "hard cut" horizontal lines.
        maskImage: `radial-gradient(ellipse at ${isLeft ? '0%' : '100%'} 50%, black 10%, transparent 70%)`,
        WebkitMaskImage: `radial-gradient(ellipse at ${isLeft ? '0%' : '100%'} 50%, black 10%, transparent 70%)`,
      }}
    >
      <svg viewBox="0 -1600 500 5600" preserveAspectRatio="none" className="h-full w-full">
        {ribbonPaths.map((path, i) => (
          <motion.path
            key={i}
            d={path.d}
            fill="none"
            stroke="#151926"
            strokeWidth="0.4"
            style={{ opacity: path.opacity }}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '400px' }}
            animate={{
              x: isLeft ? [0, 20, 0] : [0, -20, 0],
            }}
            transition={{
              pathLength: { duration: 4, ease: 'easeOut', delay: i * 0.08 },
              x: { duration: 6 + (i % 4), ease: 'easeInOut', repeat: Infinity },
            }}
          />
        ))}
      </svg>
    </div>
  );
}
