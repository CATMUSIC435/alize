'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';

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

  float scale1 = mix(1.0, 0.95, uProgress);
  vec2 slide1 = vec2(-uProgress * 0.05, uProgress * 0.05);
  vec2 uv1 = (uv - 0.5) / scale1 + 0.5 - slide1;
  
  float scale2 = mix(1.05, 1.0, uProgress);
  vec2 slide2 = vec2((1.0 - uProgress) * 0.1, -(1.0 - uProgress) * 0.1);
  vec2 uv2 = (uv - 0.5) / scale2 + 0.5 - slide2;

  float wave = sin((vUv.x - vUv.y) * 20.0 - uProgress * 15.0) * 0.05;
  float sum = vUv.x + (1.0 - vUv.y) + wave; 
  float edge = 2.4 - uProgress * 2.8;
  float diff = sum - edge;
  
  float mixVal = smoothstep(-0.15, 0.15, diff);
  float edgeDistort = exp(-abs(diff) * 5.0) * 0.05;
  vec2 distortVec = vec2(wave, wave) * edgeDistort * 5.0;
  
  vec4 t1 = texture2D(uTexture1, uv1 + distortVec);
  vec4 t2 = texture2D(uTexture2, uv2 - distortVec);
  
  float shadow = smoothstep(-0.3, 0.0, diff) * smoothstep(0.3, 0.0, diff) * 0.1;
  t1.rgb -= shadow;
  
  gl_FragColor = mix(t1, t2, mixVal);
}
`;

type WebGLTransitionOptions = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  images: string[];
  currentIndex: number;
  isInView: boolean;
  onTransitionComplete?: (newIndex: number) => void;
};

type WebGLTransitionReturn = {
  isReady: boolean;
  isContextLost: boolean;
  goToIndex: (index: number) => void;
};

/**
 * Manages Three.js lifecycle, shader uniform animations, and GPU resources for WebGL liquid transitions.
 * Handles viewport pause/resume, context loss/restore, and memory cleanups safely.
 * @param options Target canvas, container, images array, index and view states.
 * @returns Object with readiness state, context loss state, and navigation trigger.
 */
export function useWebGLTransition(options: WebGLTransitionOptions): WebGLTransitionReturn {
  const {
    canvasRef,
    containerRef,
    images,
    currentIndex,
    isInView,
    onTransitionComplete,
  } = options;

  const [isReady, setIsReady] = useState(false);
  const [isContextLost, setIsContextLost] = useState(false);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const isAnimatingRef = useRef(false);
  const progressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const prevIndexRef = useRef(currentIndex);
  const renderSceneRef = useRef<() => void>(() => {});

  const renderScene = useCallback(() => {
    if (!rendererRef.current || !materialRef.current) {
      return;
    }
    const { uniforms } = materialRef.current;
    if (uniforms.uProgress) {
      uniforms.uProgress.value = progressRef.current;
    }
    renderSceneRef.current();
  }, []);

  const goToIndex = useCallback(
    (newIndex: number) => {
      if (
        isAnimatingRef.current ||
        !materialRef.current ||
        newIndex === prevIndexRef.current ||
        !texturesRef.current[newIndex] ||
        !texturesRef.current[prevIndexRef.current]
      ) {
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

        progressRef.current = Math.sin((progress * Math.PI) / 2);
        renderScene();

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animateTransition);
        } else {
          isAnimatingRef.current = false;
          prevIndexRef.current = newIndex;
          animationFrameRef.current = null;
          if (onTransitionComplete) {
            onTransitionComplete(newIndex);
          }
        }
      };

      animationFrameRef.current = requestAnimationFrame(animateTransition);
    },
    [onTransitionComplete, renderScene],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!isInView || !canvas || !container) {
      return () => {};
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setIsContextLost(true);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    const handleContextRestored = () => {
      setIsContextLost(false);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    // Verify WebGL context availability safely before creating Three.js renderer
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      gl =
        (canvas.getContext('webgl2', { alpha: true, antialias: true }) as WebGL2RenderingContext | null) ||
        (canvas.getContext('webgl', { alpha: true, antialias: true }) as WebGLRenderingContext | null) ||
        (canvas.getContext('experimental-webgl', { alpha: true, antialias: true }) as WebGLRenderingContext | null);
    } catch {
      gl = null;
    }

    if (!gl) {
      setIsContextLost(true);
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl,
        alpha: true,
        antialias: true,
      });
    } catch {
      setIsContextLost(true);
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }

    rendererRef.current = renderer;

    const clientWidth = container.clientWidth || 300;
    const clientHeight = container.clientHeight || 200;
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    renderSceneRef.current = () => {
      if (rendererRef.current) {
        rendererRef.current.render(scene, camera);
      }
    };

    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;
    const totalCount = images.length;
    const initialIndex = prevIndexRef.current;

    const loadedTextures = images.map((src) =>
      textureLoader.load(
        src,
        () => {
          loadedCount += 1;
          if (loadedCount === totalCount) {
            setIsReady(true);
          }
          if (rendererRef.current) {
            rendererRef.current.render(scene, camera);
          }
        },
        undefined,
        () => {
          // On texture load error, still allow readiness without breaking
          loadedCount += 1;
          if (loadedCount === totalCount) {
            setIsReady(true);
          }
        },
      ),
    );
    texturesRef.current = loadedTextures;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uTexture1: { value: loadedTextures[initialIndex] ?? null },
        uTexture2: { value: loadedTextures[initialIndex] ?? null },
        uPlaneRes: { value: new THREE.Vector2(clientWidth, clientHeight) },
        uImageRes: { value: new THREE.Vector2(1920, 1080) },
      },
      transparent: true,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer.render(scene, camera);

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !materialRef.current) {
        return;
      }
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      if (w > 0 && h > 0) {
        rendererRef.current.setSize(w, h);
        materialRef.current.uniforms.uPlaneRes?.value.set(w, h);
        rendererRef.current.render(scene, camera);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      loadedTextures.forEach((tex) => tex.dispose());
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      rendererRef.current = null;
      materialRef.current = null;
      texturesRef.current = [];
      setIsReady(false);
    };
  }, [isInView, canvasRef, containerRef, images]);

  return {
    isReady,
    isContextLost,
    goToIndex,
  };
}
