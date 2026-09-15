'use client';

import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uProgress;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec2 uPlaneRes;
uniform vec2 uImageRes;

void main() {
  vec2 ratio = vec2(
    min((uPlaneRes.x / uPlaneRes.y) / (uImageRes.x / uImageRes.y), 1.0),
    min((uPlaneRes.y / uPlaneRes.x) / (uImageRes.y / uImageRes.x), 1.0)
  );
  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  // 3D Parallax & Slide Effect (Lighter than before)
  float scale1 = mix(1.0, 0.95, uProgress);
  vec2 slide1 = vec2(-uProgress * 0.05, uProgress * 0.05);
  vec2 uv1 = (uv - 0.5) / scale1 + 0.5 - slide1;
  
  float scale2 = mix(1.05, 1.0, uProgress);
  vec2 slide2 = vec2((1.0 - uProgress) * 0.1, -(1.0 - uProgress) * 0.1);
  vec2 uv2 = (uv - 0.5) / scale2 + 0.5 - slide2;

  // Wavy/Ripple Diagonal Mask
  float wave = sin((vUv.x - vUv.y) * 20.0 - uProgress * 15.0) * 0.05;
  float sum = vUv.x + (1.0 - vUv.y) + wave; 
  float edge = 2.4 - uProgress * 2.8; // Sweeps across
  float diff = sum - edge;
  
  // Softer liquid blend
  float mixVal = smoothstep(-0.15, 0.15, diff);
  
  // Liquid UV distortion concentrated at the wipe edge
  float edgeDistort = exp(-abs(diff) * 5.0) * 0.05;
  vec2 distortVec = vec2(wave, wave) * edgeDistort * 5.0;
  
  vec4 t1 = texture2D(uTexture1, uv1 + distortVec);
  vec4 t2 = texture2D(uTexture2, uv2 - distortVec);
  
  // Very light edge darkening (10%) to replace the heavy shadow
  float shadow = smoothstep(-0.3, 0.0, diff) * smoothstep(0.3, 0.0, diff) * 0.1;
  t1.rgb -= shadow;
  
  gl_FragColor = mix(t1, t2, mixVal);
}
`;

type WebGLSliderProps = {
  images: string[];
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  hideControls?: boolean;
  absoluteFill?: boolean;
  fullHeight?: boolean;
  alignRight?: boolean;
  controlsLeft?: boolean;
  noRounded?: boolean;
  autoplay?: boolean;
  className?: string;
};

export function WebGLSlider({
  images,
  activeIndex,
  onIndexChange,
  hideControls = false,
  absoluteFill = false,
  fullHeight = false,
  alignRight = false,
  controlsLeft = false,
  noRounded = false,
  autoplay = false,
  className = '',
}: WebGLSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isControlled = activeIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = isControlled ? activeIndex : internalIndex;

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const isAnimatingRef = useRef(false);
  const progressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const prevIndexRef = useRef(currentIndex);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) {
      return () => {
        /* do nothing */
      };
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    rendererRef.current = renderer;

    const { clientWidth, clientHeight } = containerRef.current;
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = images.map((src) => textureLoader.load(src));
    texturesRef.current = loadedTextures;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uTexture1: { value: loadedTextures[currentIndex] },
        uTexture2: { value: loadedTextures[currentIndex] },
        uPlaneRes: { value: new THREE.Vector2(clientWidth, clientHeight) },
        uImageRes: { value: new THREE.Vector2(1920, 1080) },
      },
      transparent: true,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const render = () => {
      if (materialRef.current) {
        const { uniforms } = materialRef.current;
        if (uniforms.uProgress) {
          uniforms.uProgress.value = progressRef.current;
        }
      }
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      if (!containerRef.current) {
        return;
      }
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      renderer.setSize(w, h);
      if (materialRef.current) {
        const { uniforms } = materialRef.current;
        if (uniforms.uPlaneRes) {
          uniforms.uPlaneRes.value.set(w, h);
        }
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToIndex = useCallback(
    (newIndex: number) => {
      if (isAnimatingRef.current || !materialRef.current) {
        return;
      }
      if (newIndex === prevIndexRef.current) {
        return;
      }

      const { uniforms } = materialRef.current;

      if (uniforms.uTexture1) {
        uniforms.uTexture1.value = texturesRef.current[prevIndexRef.current];
      }
      if (uniforms.uTexture2) {
        uniforms.uTexture2.value = texturesRef.current[newIndex];
      }
      if (uniforms.uProgress) {
        uniforms.uProgress.value = 0;
      }

      isAnimatingRef.current = true;

      let startTime = 0;
      const duration = 1200;

      const animateTransition = (timestamp: number) => {
        if (startTime === 0) {
          startTime = timestamp;
        }
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeProgress = Math.sin((progress * Math.PI) / 2);
        progressRef.current = easeProgress;

        if (progress < 1) {
          requestAnimationFrame(animateTransition);
        } else {
          isAnimatingRef.current = false;
          prevIndexRef.current = newIndex;
          if (!isControlled) {
            setInternalIndex(newIndex);
          }
          if (onIndexChange) {
            onIndexChange(newIndex);
          }
        }
      };

      requestAnimationFrame(animateTransition);
    },
    [isControlled, onIndexChange],
  );

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    goToIndex(nextIndex);
  }, [currentIndex, images.length, goToIndex]);

  const goToPrev = useCallback(() => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToIndex(prevIndex);
  }, [currentIndex, images.length, goToIndex]);

  useEffect(() => {
    if (isControlled && activeIndex !== undefined && activeIndex !== prevIndexRef.current) {
      goToIndex(activeIndex);
    }
  }, [activeIndex, isControlled, goToIndex]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (autoplay) {
      intervalId = setInterval(() => {
        goToNext();
      }, 4000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoplay, goToNext]);

  const formattedIndex = String(currentIndex + 1).padStart(2, '0');

  let containerClasses = `relative mx-auto mb-20 aspect-[4/3] w-full max-w-[1000px] md:mb-28 md:aspect-[16/9] ${className}`;
  if (absoluteFill) {
    containerClasses = `absolute inset-0 h-full w-full ${className}`;
  } else if (fullHeight && alignRight) {
    containerClasses = `relative ml-auto w-[95%] md:w-[85%] h-[80vh] md:h-[90vh] ${className}`;
  }

  const viewportClasses = `h-full w-full overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] ${noRounded ? 'rounded-none' : 'rounded-xl'}`;

  let controlsClasses =
    'pointer-events-auto absolute -bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-8 md:-bottom-20 md:gap-12';
  if (controlsLeft) {
    controlsClasses =
      'pointer-events-auto absolute -bottom-16 left-0 z-30 flex items-center gap-4 md:-bottom-20 md:gap-8';
  }

  return (
    <div className={containerClasses}>
      {/* WebGL Viewport */}
      <div className={viewportClasses} ref={containerRef}>
        <canvas ref={canvasRef} aria-label="WebGL Slider" className="block h-full w-full" />
      </div>

      {/* Controls */}
      {!hideControls && (
        <div className={controlsClasses}>
          <button
            onClick={goToPrev}
            className="group relative flex h-12 w-12 cursor-pointer items-center justify-center text-[#151926]/50 transition-colors duration-300 hover:text-[#151926]"
            aria-label="Previous image"
          >
            <svg
              width="28"
              height="10"
              viewBox="0 0 28 10"
              fill="none"
              className="transition-transform duration-500 ease-out group-hover:-translate-x-2"
            >
              <path
                d="M5 1L1 5L5 9"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 5H27"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-6">
            <span
              className={`text-[11px] text-[#151926] md:text-xs ${inter.className} font-light tracking-widest`}
            >
              {formattedIndex}
            </span>
            <div className="relative h-[1px] w-16 overflow-hidden bg-[#151926]/20 md:w-24">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-[#151926]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span
              className={`text-[11px] text-[#151926]/50 md:text-xs ${inter.className} font-light tracking-widest`}
            >
              {String(images.length).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={goToNext}
            className="group relative flex h-12 w-12 cursor-pointer items-center justify-center text-[#151926]/50 transition-colors duration-300 hover:text-[#151926]"
            aria-label="Next image"
          >
            <svg
              width="28"
              height="10"
              viewBox="0 0 28 10"
              fill="none"
              className="transition-transform duration-500 ease-out group-hover:translate-x-2"
            >
              <path
                d="M23 1L27 5L23 9"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M27 5H1"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
