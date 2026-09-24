'use client';

import { motion } from 'framer-motion';
import React from 'react';

/** Exact custom easing from Era Residence: CustomEase.create("Out", "0.25,1,0.5,1") */
export const ERA_EASE_OUT = [0.25, 1, 0.5, 1] as const;
export const ERA_EASE_IN_OUT = [0.75, 0, 0.25, 1] as const;

/**
 * 3D Character Heading Reveal (matches Era Residence animateTextH)
 * Splits text into words and characters, rotating each character in 3D around the Y-axis.
 */
export function RevealHeading(props: {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  align?: 'center' | 'left' | 'right';
}) {
  const Tag = props.as ?? 'h2';
  const words = props.text.split(' ');
  const delay = props.delay ?? 0.12;
  const stagger = props.stagger ?? 0.025;
  const justifyClass =
    props.align === 'left'
      ? 'justify-start text-left'
      : props.align === 'right'
        ? 'justify-end text-right'
        : 'justify-center text-center';

  return (
    <Tag className={props.className} style={props.style}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: delay,
            },
          },
        }}
        className={`inline-flex flex-wrap ${justifyClass} [perspective:1000px]`}
      >
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, cIdx) => (
              <motion.span
                key={cIdx}
                variants={{
                  hidden: { opacity: 0, y: '45%', rotateY: 85 },
                  visible: {
                    opacity: 1,
                    y: '0%',
                    rotateY: 0,
                    transition: {
                      duration: 1.1,
                      ease: ERA_EASE_OUT,
                    },
                  },
                }}
                className="inline-block origin-bottom"
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {char}
              </motion.span>
            ))}
            {wIdx < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/**
 * Masked Paragraph Line Reveal (matches Era Residence animateTextP)
 * Smoothly slides words/lines up from beneath an overflow mask.
 */
export function RevealParagraph(props: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const words = props.text.split(' ');
  const delay = props.delay ?? 0.18;

  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.012,
            delayChildren: delay,
          },
        },
      }}
      className={props.className}
      style={props.style}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block overflow-hidden pb-0.5">
          <motion.span
            variants={{
              hidden: { opacity: 0, y: '110%' },
              visible: {
                opacity: 1,
                y: '0%',
                transition: {
                  duration: 0.95,
                  ease: ERA_EASE_OUT,
                },
              },
            }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
          {wIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.p>
  );
}

/**
 * 3D Character Label/Tag Reveal (matches Era Residence animateTextA)
 * For uppercase eyebrow tags, subtitles, dates.
 */
export function RevealLabel(props: {
  text: string;
  className?: string;
  delay?: number;
  align?: 'center' | 'left' | 'right';
}) {
  const chars = Array.from(props.text);
  const delay = props.delay ?? 0.08;
  const justifyClass =
    props.align === 'left'
      ? 'justify-start'
      : props.align === 'right'
        ? 'justify-end'
        : 'justify-center';

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.018,
            delayChildren: delay,
          },
        },
      }}
      className={`inline-flex flex-wrap ${justifyClass} [perspective:800px] ${props.className ?? ''}`}
    >
      {chars.map((char, idx) => (
        <motion.span
          key={idx}
          variants={{
            hidden: { opacity: 0, rotateX: 85, x: 10 },
            visible: {
              opacity: 1,
              rotateX: 0,
              x: 0,
              transition: {
                duration: 0.85,
                ease: ERA_EASE_OUT,
              },
            },
          }}
          className="inline-block origin-bottom will-change-transform"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * Architectural Divider Line Draw-in (matches Era Residence animateLine)
 * Draws vertical or horizontal lines with clipPath / scale.
 */
export function RevealLine(props: {
  direction?: 'vertical' | 'horizontal';
  className?: string;
  delay?: number;
}) {
  const isVertical = props.direction !== 'horizontal';
  const delay = props.delay ?? 0.2;

  return (
    <motion.div
      initial={{ scaleY: isVertical ? 0 : 1, scaleX: isVertical ? 1 : 0 }}
      whileInView={{ scaleY: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.0, delay, ease: ERA_EASE_OUT }}
      style={{
        transformOrigin: isVertical ? 'top center' : 'left center',
        willChange: 'transform',
      }}
      className={props.className}
    />
  );
}

/**
 * Rolling Character Nav Item Hover (matches Era Residence initNavItemHover)
 * Rolling split-flap typography effect for menu items and links on hover.
 */
export function RollingNavText(props: {
  text: string;
  isHovered: boolean;
  className?: string;
}) {
  const chars = Array.from(props.text);

  return (
    <span className={`relative inline-flex overflow-hidden ${props.className ?? ''}`}>
      {/* Primary line - rolls up out of view on hover */}
      <span className="inline-flex">
        {chars.map((char, idx) => (
          <motion.span
            key={idx}
            animate={{
              y: props.isHovered ? '-115%' : '0%',
              opacity: props.isHovered ? 0 : 1,
            }}
            transition={{
              duration: 0.45,
              ease: ERA_EASE_OUT,
              delay: idx * 0.015,
            }}
            className="inline-block will-change-transform"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>

      {/* Duplicate line - rolls up into view from bottom on hover */}
      <span className="pointer-events-none absolute inset-0 inline-flex">
        {chars.map((char, idx) => (
          <motion.span
            key={idx}
            initial={{ y: '115%', opacity: 0 }}
            animate={{
              y: props.isHovered ? '0%' : '115%',
              opacity: props.isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.45,
              ease: ERA_EASE_OUT,
              delay: idx * 0.015,
            }}
            className="inline-block will-change-transform"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
