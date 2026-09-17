type WaveDividerProps = {
  inverted?: boolean;
  color?: string;
  className?: string;
};

/**
 * An artistic undulating wave SVG divider reflecting the condotel ocean-ripple aesthetic.
 * @param props The divider component properties.
 * @returns The SVG wave element.
 */
export function WaveDivider(props: WaveDividerProps) {
  const strokeColor = props.color ?? '#8B7043';

  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none ${props.inverted ? 'rotate-180' : ''} ${props.className ?? ''}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-full md:h-16 lg:h-20"
        preserveAspectRatio="none"
      >
        {/* Soft atmospheric wave background */}
        <path
          d="M0 60C240 110 480 20 720 70C960 120 1200 30 1440 80V120H0V60Z"
          fill="currentColor"
          className="text-[#E0AC87]/10"
        />
        {/* Primary golden wave line */}
        <path
          d="M0 45C240 95 480 10 720 55C960 100 1200 15 1440 65"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeOpacity="0.45"
          strokeDasharray="4 6"
        />
        {/* Secondary continuous crisp ripple line */}
        <path
          d="M0 75C280 25 560 115 840 60C1120 10 1320 90 1440 50"
          stroke={strokeColor}
          strokeWidth="1"
          strokeOpacity="0.7"
        />
      </svg>
    </div>
  );
}
