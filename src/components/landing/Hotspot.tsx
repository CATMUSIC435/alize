'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Inter, Playfair_Display } from 'next/font/google';
import { useState } from 'react';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

type SpecItem = {
  label: string;
  value: string;
  colSpan?: number;
};

type ProjectOverview = {
  name: string;
  subtitle: string;
  specs: SpecItem[];
};

function HotspotCardContent(props: {
  title?: string;
  description?: string;
  overview?: ProjectOverview;
  onClose: () => void;
  isMobile?: boolean;
}) {
  return (
    <>
      {/* Inner Decorative Border */}
      {props.isMobile ? (
        <div className="pointer-events-none absolute inset-2 rounded-xl border border-[#C5B49C]/50" />
      ) : (
        <div
          className="pointer-events-none absolute inset-2 bg-[#C5B49C]/50 sm:inset-3"
          style={{
            clipPath:
              'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
          }}
        >
          <div
            className="absolute inset-[1px] bg-sand-card"
            style={{
              clipPath:
                'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)',
            }}
          />
        </div>
      )}

      {props.overview ? (
        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* Close button - hidden on mobile */}
          {!props.isMobile && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                props.onClose();
              }}
              aria-label="Close"
              className="absolute -top-1 -right-1 z-20 flex h-7 w-7 items-center justify-center rounded-full text-[#151926]/70 transition-colors hover:bg-black/5 hover:text-[#151926]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}

          {/* Header */}
          <div className={props.isMobile ? 'border-b border-[#C8BEAE]/70 pb-2' : 'border-b border-[#C8BEAE]/70 pb-5 pr-8'}>
            <h2
              className={`font-semibold tracking-wider text-[#151926] uppercase ${
                props.isMobile ? 'text-lg' : 'text-3xl md:text-[38px]'
              } ${playfair.className}`}
            >
              {props.overview.name}
            </h2>
            <p
              className={`font-semibold text-[#7D5C2C] uppercase ${inter.className} ${
                props.isMobile
                  ? 'mt-0.5 text-[8.5px] leading-snug tracking-[0.12em]'
                  : 'mt-2 text-[11px] md:text-[12px] tracking-[0.18em] leading-relaxed'
              }`}
            >
              {props.overview.subtitle}
            </p>
          </div>

          {/* Specifications Grid */}
          <div
            className={`grid grid-cols-2 ${
              props.isMobile
                ? 'gap-x-3 gap-y-2 pt-2.5 pb-2'
                : 'gap-x-8 gap-y-4 pt-5 pb-1'
            }`}
          >
            {props.overview.specs.map((item) => (
              <div
                key={item.label}
                className={item.colSpan === 2 ? 'col-span-2' : 'col-span-1'}
              >
                <div
                  className={`font-semibold text-[#665B4C] uppercase leading-tight ${
                    props.isMobile ? 'text-[8.5px] tracking-[0.08em]' : 'text-[10px] md:text-[11px] tracking-[0.13em]'
                  }`}
                >
                  {item.label}
                </div>
                <div
                  className={`font-medium text-[#151926] ${inter.className} ${
                    props.isMobile ? 'mt-0.5 text-[10.5px] leading-snug' : 'mt-1 text-[13px] md:text-[13.5px] leading-relaxed'
                  }`}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex h-full flex-col justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              props.onClose();
            }}
            aria-label="Close"
            className="absolute -top-1 -right-1 z-20 flex h-8 w-8 items-center justify-center rounded-full text-[#151926]/60 transition-colors hover:bg-black/5 hover:text-[#151926]"
          >
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M1 13L13 1"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h2
            className={`text-xl leading-snug tracking-tight text-[#151926] uppercase sm:text-4xl sm:leading-tight ${playfair.className}`}
          >
            {props.title}
          </h2>
          <p
            className={`mt-4 text-xs leading-[1.6] font-light text-[#2D3346] sm:mt-6 sm:text-[13px] ${inter.className}`}
          >
            {props.description}
          </p>
        </div>
      )}
    </>
  );
}

export function Hotspot(props: {
  x: string;
  y: string;
  title?: string;
  description?: string;
  overview?: ProjectOverview;
  isOpen?: boolean;
  onHover?: () => void;
  onToggle?: () => void;
  onClose?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isCardOpen = props.isOpen !== undefined ? (props.isOpen || isHovered) : isHovered;
  const xPercent = Number.parseFloat(props.x) || 0;
  const isRightSide = xPercent > 50;

  const handleToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768 && props.overview) {
      return; // On mobile, overview card is default visible and not dismissible
    }
    if (props.onToggle) {
      props.onToggle();
    } else {
      setIsHovered((prev) => !prev);
    }
  };

  const handleClose = () => {
    setIsHovered(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <div
      className="absolute z-40"
      style={{ left: props.x, top: props.y, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => {
        setIsHovered(true);
        props.onHover?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Interaction target (Dot or Active state) */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isCardOpen ? 'Close hotspot' : 'Open hotspot'}
        className="relative flex h-14 w-14 cursor-pointer items-center justify-center focus:outline-none"
      >
        <AnimatePresence mode="wait">
          {isCardOpen && !props.overview ? (
            <motion.div
              key="active-beacon"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border-2 border-[#151926]/40 bg-sand-card shadow-xl" />
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L12 12M2 12L12 2"
                  stroke="#151926"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ) : isCardOpen && props.overview ? (
            <motion.div
              key="active-overview-beacon"
              className="relative flex h-10 w-10 items-center justify-center"
            >
              {/* Desktop shows X button when open */}
              <div className="hidden md:flex absolute inset-0 rounded-full border-2 border-[#151926]/40 bg-sand-card shadow-xl items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 2L12 12M2 12L12 2"
                    stroke="#151926"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* Mobile shows steady glowing beacon dot */}
              <div className="flex md:hidden absolute inset-0 rounded-full border border-white/80 bg-white/5 backdrop-blur-[1px] items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
              </div>
            </motion.div>
          ) : (
            // Idle Dot State with radiating pulse rings
            <motion.div
              key="dot"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-none absolute flex h-10 w-10 items-center justify-center"
            >
              {[0, 0.6, 1.2].map((delay, index) => (
                <motion.div
                  key={`ring-${index}`}
                  className="absolute inset-0 rounded-full border border-white/60"
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay }}
                />
              ))}
              <div className="absolute inset-0 rounded-full border border-white/80 bg-white/5 backdrop-blur-[1px]" />
              <div className="relative z-10 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Desktop Popup Card (Positioned next to pin) */}
      <div className="hidden md:block">
        <AnimatePresence>
          {isCardOpen && (
            <div
              className={`absolute top-1/2 -translate-y-1/2 z-50 pointer-events-auto ${
                isRightSide ? 'right-10 left-auto' : 'left-10 right-auto'
              }`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 12 }}
                transition={{
                  type: 'spring',
                  damping: 26,
                  stiffness: 240,
                  mass: 0.8,
                }}
                className={`bg-sand-card border border-[#D9CEBD]/90 relative flex cursor-default flex-col justify-between rounded-sm shadow-[0_24px_70px_rgba(21,25,38,0.22)] ${
                  props.overview
                    ? 'w-[460px] p-7 lg:w-[490px] lg:p-8'
                    : 'w-[380px] min-h-[340px] p-8'
                }`}
              >
                <HotspotCardContent
                  title={props.title}
                  description={props.description}
                  overview={props.overview}
                  onClose={handleClose}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Card (Positioned lower under hotspot button, non-fixed, default visible for overview) */}
      {(props.overview || isCardOpen) && (
        <div
          className="pointer-events-auto absolute top-[calc(100%+38px)] z-40 block md:hidden"
          style={{
            left: `calc(50vw - ${xPercent}vw + 28px)`,
            transform: 'translateX(-50%)',
            width: 'calc(100vw - 32px)',
            maxWidth: '380px',
          }}
        >
          <div className="bg-sand-card border border-[#D9CEBD]/90 relative flex w-full cursor-default flex-col justify-between rounded-2xl p-4.5 pb-5 shadow-[0_20px_50px_rgba(21,25,38,0.25)]">
            <HotspotCardContent
              title={props.title}
              description={props.description}
              overview={props.overview}
              onClose={handleClose}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
