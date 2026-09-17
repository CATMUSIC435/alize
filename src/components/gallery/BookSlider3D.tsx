'use client';

import { useTranslations } from 'next-intl';
import { Inter } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useInViewport } from '@/hooks/useInViewport';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Book Geometry Configuration (Tall luxurious architectural monograph format)
const PAGE_WIDTH = 1.48;
const PAGE_HEIGHT = 2.05;
const PAGE_DEPTH = 0.005;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

// Physics bending strengths (smooth natural spine gutter without corrugated ripples)
const spineArchStrength = 0.035;
const turningCurveStrength = 0.12;
const PAGE_TURN_DURATION = 850; // ms per realistic page flip

/**
 * Smooth cubic ease-in-out interpolation
 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type PageData = {
  id: string;
  tabLabel: string;
  title: string;
  frontImage: string;
  backImage: string;
  isCover?: boolean;
  isBackCover?: boolean;
};



/**
 * Creates high-resolution procedural canvas textures for leather embossed book covers
 */
function createCoverCanvasTexture(isFront: boolean, subtitle?: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1662;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Deep Navy Mediterranean Leather
  const grad = ctx.createLinearGradient(0, 0, 1200, 1662);
  grad.addColorStop(0, '#101420');
  grad.addColorStop(0.5, '#151926');
  grad.addColorStop(1, '#0c0f17');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 1662);

  // Subtle linen texture specks
  ctx.fillStyle = 'rgba(224, 172, 135, 0.04)';
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 1200;
    const y = Math.random() * 1662;
    ctx.fillRect(x, y, 2, 2);
  }

  // Outer Gold Inset Border
  ctx.strokeStyle = '#8B7043';
  ctx.lineWidth = 4.5;
  ctx.strokeRect(50, 50, 1100, 1562);

  // Inner Fine Dashed Gold Border
  ctx.strokeStyle = 'rgba(224, 172, 135, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 8]);
  ctx.strokeRect(70, 70, 1060, 1522);
  ctx.setLineDash([]);

  // Corner Gold Studs
  const corners = [
    [50, 50],
    [1150, 50],
    [50, 1612],
    [1150, 1612],
  ] as const;
  ctx.fillStyle = '#8B7043';
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  if (isFront) {
    ctx.textAlign = 'center';

    // Top Wave Crest
    ctx.strokeStyle = '#8B7043';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(520, 320);
    ctx.bezierCurveTo(560, 290, 640, 350, 680, 320);
    ctx.stroke();

    ctx.fillStyle = '#E0AC87';
    ctx.font = 'bold 22px sans-serif';
    ctx.letterSpacing = '12px';
    ctx.fillText('COLLECTION DE LUXE', 600, 430);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 68px serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('ALIZÉ', 600, 590);

    ctx.fillStyle = '#8B7043';
    ctx.font = '30px sans-serif';
    ctx.letterSpacing = '14px';
    ctx.fillText('RESIDENCE', 600, 660);

    ctx.strokeStyle = '#8B7043';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(460, 740);
    ctx.lineTo(740, 740);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '22px sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('ARCHITECTURAL LOOKBOOK 4K', 600, 820);

    ctx.fillStyle = '#E0AC87';
    ctx.font = '18px sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('ĐÀ NẴNG • VIỆT NAM', 600, 1420);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '16px monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('16°03\'42"N  108°14\'36"E', 600, 1480);
  } else {
    ctx.textAlign = 'center';

    ctx.fillStyle = '#8B7043';
    ctx.font = 'bold 24px sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('ALIZÉ RESIDENCE', 600, 780);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '18px sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText(subtitle ?? 'KIỆT TÁC CONDOTEL VEN BIỂN MỸ KHÊ', 600, 850);

    ctx.strokeStyle = '#8B7043';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(480, 920);
    ctx.lineTo(720, 920);
    ctx.stroke();

    ctx.fillStyle = '#E0AC87';
    ctx.font = '16px monospace';
    ctx.letterSpacing = '2px';
    ctx.fillText('www.alize-residence.com', 600, 1000);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

type SkinnedPageRecord = {
  group: THREE.Group;
  skinnedMesh: THREE.SkinnedMesh;
  bones: THREE.Bone[];
  number: number;
  turnedAt: number;
  lastOpened: boolean;
  startRot: number;
  targetRot: number;
  currentRot: number;
};

export function BookSlider3D() {
  const t = useTranslations('GalleryPage');
  const bookSubtitle = t('book_cover_subtitle');

  const bookPages: PageData[] = [
    {
      id: 'cover',
      tabLabel: t('book_tab_front_cover'),
      title: t('book_monograph_caption'),
      frontImage: '__COVER_FRONT__',
      backImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1400',
      isCover: true,
    },
    {
      id: 'facade',
      tabLabel: t('book_tab_facade'),
      title: t('book_page_facade_title'),
      frontImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1400',
      backImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1400',
    },
    {
      id: 'amenities',
      tabLabel: t('book_tab_amenities'),
      title: t('book_page_amenities_title'),
      frontImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400',
      backImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1400',
    },
    {
      id: 'interior',
      tabLabel: t('book_tab_interior'),
      title: t('book_page_interior_title'),
      frontImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1400',
      backImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1400',
    },
    {
      id: 'lifestyle',
      tabLabel: t('book_tab_lifestyle'),
      title: t('book_page_lifestyle_title'),
      frontImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1400',
      backImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1400',
    },
    {
      id: 'back_cover',
      tabLabel: t('book_tab_back_cover'),
      title: t('book_page_back_cover_title'),
      frontImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1400',
      backImage: '__COVER_BACK__',
      isBackCover: true,
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // User target page
  const [page, setPage] = useState<number>(0);
  // Sequential delayed page (fluttering page-turn effect from Wawa Sensei)
  const [delayedPage, setDelayedPage] = useState<number>(0);

  const [isReady, setIsReady] = useState(false);
  const [isContextLost, setIsContextLost] = useState(false);

  const isInView = useInViewport(containerRef, { rootMargin: '200px' });

  // Sync refs for RAF loop
  const delayedPageRef = useRef(delayedPage);
  delayedPageRef.current = delayedPage;

  const isInViewRef = useRef(isInView);
  isInViewRef.current = isInView;

  const hoveredPageIndexRef = useRef<number | null>(null);

  // Sequential Page Turning Logic (Measured rhythm so each page flips page-by-page)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const goToPage = () => {
      setDelayedPage((currentDelayed) => {
        if (page === currentDelayed) {
          return currentDelayed;
        }

        const step = page > currentDelayed ? 1 : -1;
        // Measured rhythmic interval (650ms) so each page turns distinctly and realistically page-by-page
        const diff = Math.abs(page - currentDelayed);
        const cadence = diff > 1 ? 650 : 0;

        if (cadence > 0) {
          timeout = setTimeout(goToPage, cadence);
        }
        return currentDelayed + step;
      });
    };

    goToPage();

    return () => {
      clearTimeout(timeout);
    };
  }, [page]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return () => {};
    }

    // Context Loss / Restored Handlers
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setIsContextLost(true);
    };

    const handleContextRestored = () => {
      setIsContextLost(false);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    // Verify WebGL availability
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      gl =
        (canvas.getContext('webgl2', { alpha: true, antialias: true }) as WebGL2RenderingContext | null) ||
        (canvas.getContext('webgl', { alpha: true, antialias: true }) as WebGLRenderingContext | null);
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
        alpha: true, // 100% transparent canvas over site sand background!
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setIsContextLost(true);
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 700;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();

    // Camera setup for generous full-width 3D perspective
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 50);
    camera.position.set(0, 0.40, 4.85);
    camera.lookAt(0, 0, 0);

    // Lighting (Balanced high-CRI studio light: vibrant saturated colors without washing out)
    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.25);
    dirLight.position.set(2.4, 4.5, 3.0);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 15;
    dirLight.shadow.bias = 0.0002;
    dirLight.shadow.normalBias = 0.03;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 0.45);
    fillLight.position.set(-3.0, 2.0, -1.0);
    scene.add(fillLight);

    // Ground Shadow Plane (ShadowMaterial renders only shadow over transparent sand background)
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.20;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Master Book Group
    const bookGroup = new THREE.Group();
    // Rotate Y by -Math.PI/2 so pages open across X, and tilt on X backward slightly
    bookGroup.rotation.y = -Math.PI / 2;
    bookGroup.rotation.x = -0.30;
    scene.add(bookGroup);

    // Build Shared Skinned Page Box Geometry
    const pageGeometry = new THREE.BoxGeometry(
      PAGE_WIDTH,
      PAGE_HEIGHT,
      PAGE_DEPTH,
      PAGE_SEGMENTS,
      2,
    );
    pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

    const pos = pageGeometry.attributes.position;
    if (pos) {
      const v = new THREE.Vector3();
      const sIndices: number[] = [];
      const sWeights: number[] = [];

      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        const sIndex = Math.min(PAGE_SEGMENTS - 1, Math.max(0, Math.floor(v.x / SEGMENT_WIDTH)));
        let sWeight = (v.x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
        if (sIndex === PAGE_SEGMENTS - 1 && v.x >= PAGE_WIDTH - 0.0001) {
          sWeight = 1;
        }
        sIndices.push(sIndex, Math.min(PAGE_SEGMENTS, sIndex + 1), 0, 0);
        sWeights.push(1 - sWeight, sWeight, 0, 0);
      }

      pageGeometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(sIndices, 4));
      pageGeometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sWeights, 4));
    }

    const textureLoader = new THREE.TextureLoader();
    const coverFrontTex = createCoverCanvasTexture(true);
    const coverBackTex = createCoverCanvasTexture(false, bookSubtitle);

    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 16);
    const setupTexture = (tex: THREE.Texture) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.anisotropy = maxAnisotropy;
      tex.needsUpdate = true;
    };

    setupTexture(coverFrontTex);
    setupTexture(coverBackTex);

    const paperWhite = new THREE.Color('#FFFFFF');
    const spineGold = new THREE.Color('#8B7043');
    const emissiveGold = new THREE.Color('#8B7043');

    const edgeMaterials = [
      new THREE.MeshStandardMaterial({ color: spineGold, roughness: 0.4 }),
      new THREE.MeshStandardMaterial({ color: '#2B251E', roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: paperWhite, roughness: 0.8 }),
      new THREE.MeshStandardMaterial({ color: paperWhite, roughness: 0.8 }),
    ];

    const pagesRecord: SkinnedPageRecord[] = [];
    const interactiveMeshes: THREE.SkinnedMesh[] = [];

    bookPages.forEach((pageItem, index) => {
      // Build Skeleton chain
      const bones: THREE.Bone[] = [];
      for (let b = 0; b <= PAGE_SEGMENTS; b++) {
        const bone = new THREE.Bone();
        bones.push(bone);
        if (b === 0) {
          bone.position.x = 0;
        } else {
          bone.position.x = SEGMENT_WIDTH;
        }
        if (b > 0) {
          const prev = bones[b - 1];
          if (prev) {
            prev.add(bone);
          }
        }
      }
      const skeleton = new THREE.Skeleton(bones);

      // Resolve Textures with high-res anisotropic filtering
      let frontTex: THREE.Texture;
      if (pageItem.isCover) {
        frontTex = coverFrontTex;
      } else {
        frontTex = textureLoader.load(pageItem.frontImage);
        setupTexture(frontTex);
      }

      let backTex: THREE.Texture;
      if (pageItem.isBackCover) {
        backTex = coverBackTex;
      } else {
        backTex = textureLoader.load(pageItem.backImage);
        setupTexture(backTex);
      }

      const matFront = new THREE.MeshStandardMaterial({
        color: paperWhite,
        map: frontTex,
        roughness: pageItem.isCover ? 0.35 : 0.42,
        metalness: 0.0,
        emissive: emissiveGold,
        emissiveIntensity: 0,
      });

      const matBack = new THREE.MeshStandardMaterial({
        color: paperWhite,
        map: backTex,
        roughness: pageItem.isBackCover ? 0.35 : 0.42,
        metalness: 0.0,
        emissive: emissiveGold,
        emissiveIntensity: 0,
      });

      const pageMaterials = [
        edgeMaterials[0]!,
        edgeMaterials[1]!,
        edgeMaterials[2]!,
        edgeMaterials[3]!,
        matFront,
        matBack,
      ];

      const skinnedMesh = new THREE.SkinnedMesh(pageGeometry, pageMaterials);
      skinnedMesh.castShadow = true;
      skinnedMesh.receiveShadow = false; // Eliminates shadow acne stripes on curved surfaces
      skinnedMesh.frustumCulled = false;
      skinnedMesh.userData = { pageIndex: index };

      const rootBone = skeleton.bones[0];
      if (rootBone) {
        skinnedMesh.add(rootBone);
      }
      skinnedMesh.bind(skeleton);

      const pageGroup = new THREE.Group();
      // Initially all closed on the right stack (+Math.PI / 2)
      pageGroup.rotation.y = Math.PI / 2;
      pageGroup.position.set(0, 0, 0);
      pageGroup.add(skinnedMesh);

      bookGroup.add(pageGroup);

      pagesRecord.push({
        group: pageGroup,
        skinnedMesh,
        bones,
        number: index,
        turnedAt: 0,
        lastOpened: false,
        startRot: Math.PI / 2,
        targetRot: Math.PI / 2,
        currentRot: Math.PI / 2,
      });

      interactiveMeshes.push(skinnedMesh);
    });

    setIsReady(true);

    // Raycaster for Hover & Click
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = pointer.x * 0.12;
      mouseY = pointer.y * 0.08;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0 && intersects[0]?.object) {
        const hitMesh = intersects[0].object as THREE.SkinnedMesh;
        hoveredPageIndexRef.current = hitMesh.userData.pageIndex as number;
        container.style.cursor = 'pointer';
      } else {
        hoveredPageIndexRef.current = null;
        container.style.cursor = 'default';
      }
    };

    container.addEventListener('pointermove', handlePointerMove);

    // Render & Physics Loop
    let animId: number;
    let clock = 0;

    const render = () => {
      animId = requestAnimationFrame(render);

      // Lazy check: if not in viewport, halt rendering loop (0% GPU)
      if (!isInViewRef.current) {
        return;
      }

      clock += 0.016;

      // Soft Floating Oscillation & Responsive Tilt
      const floatY = Math.sin(clock * 1.5) * 0.025;
      const floatRotX = Math.sin(clock * 1.1) * 0.012;
      const floatRotZ = Math.cos(clock * 0.9) * 0.01;

      bookGroup.position.y = floatY;
      bookGroup.rotation.x = -0.30 + floatRotX + mouseY * 0.25;
      bookGroup.rotation.z = floatRotZ - mouseX * 0.2;

      const currentDelayed = delayedPageRef.current;
      const totalPages = pagesRecord.length;
      const isBookClosed = currentDelayed === 0 || currentDelayed === totalPages;

      pagesRecord.forEach((rec) => {
        const isOpened = currentDelayed > rec.number;

        if (rec.lastOpened !== isOpened) {
          rec.turnedAt = performance.now();
          rec.startRot = rec.currentRot;
          rec.targetRot = isOpened ? -Math.PI / 2 : Math.PI / 2;
          rec.lastOpened = isOpened;
        }

        // Emissive hover highlight
        const isHovered = hoveredPageIndexRef.current === rec.number;
        const targetEmissive = isHovered ? 0.18 : 0;
        if (Array.isArray(rec.skinnedMesh.material)) {
          const matFront = rec.skinnedMesh.material[4] as THREE.MeshStandardMaterial | undefined;
          const matBack = rec.skinnedMesh.material[5] as THREE.MeshStandardMaterial | undefined;
          if (matFront && matBack) {
            matFront.emissiveIntensity += (targetEmissive - matFront.emissiveIntensity) * 0.15;
            matBack.emissiveIntensity += (targetEmissive - matBack.emissiveIntensity) * 0.15;
          }
        }

        // Time-based smooth turning progress (0 -> 1 over PAGE_TURN_DURATION)
        const elapsed = performance.now() - rec.turnedAt;
        const progress = Math.min(1, Math.max(0, elapsed / PAGE_TURN_DURATION));
        const ease = easeInOutCubic(progress);

        // Smooth physics-based rotation interpolation
        rec.currentRot = THREE.MathUtils.lerp(rec.startRot, rec.targetRot, ease);
        rec.group.rotation.y = rec.currentRot;

        // Perfectly parallel resting planes: strictly zero angular intersection!
        rec.skinnedMesh.position.z =
          -rec.number * PAGE_DEPTH + currentDelayed * PAGE_DEPTH;

        const turnSin = Math.sin(progress * Math.PI);

        for (let i = 1; i < rec.bones.length; i++) {
          const boneTarget = rec.bones[i];
          if (!boneTarget) {
            continue;
          }

          // Gentle spine gutter arch + dynamic turning arc
          const spineIntensity =
            !isBookClosed && i < 7
              ? Math.sin((i / 7) * (Math.PI / 2)) * spineArchStrength
              : 0;
          const turnIntensity = Math.sin((i * Math.PI) / PAGE_SEGMENTS) * turnSin;

          const rotAngle =
            spineIntensity * (isOpened ? -1 : 1) +
            turningCurveStrength * turnIntensity * (isOpened ? -1 : 1);

          boneTarget.rotation.y = rotAngle;

          // Natural paper fold curl on X while airborne
          const foldIntensity =
            i > 8 ? Math.sin((i * Math.PI) / PAGE_SEGMENTS) * turnSin : 0;
          const foldAngle = (Math.PI / 180) * 2.5 * (isOpened ? 1 : -1) * foldIntensity;
          boneTarget.rotation.x = foldAngle;
        }
      });

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(render);

    // Responsive Canvas Resize
    const handleResize = () => {
      if (!container || !renderer) {
        return;
      }
      const newW = container.clientWidth || 900;
      const newH = container.clientHeight || 700;
      camera.aspect = newW / newH;
      // Responsive camera distance for the taller monograph spread
      camera.position.z = newW < 768 ? 6.2 : 4.85;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup & Memory Disposal
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);

      pageGeometry.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      coverFrontTex.dispose();
      coverBackTex.dispose();
      edgeMaterials.forEach((m) => m.dispose());

      pagesRecord.forEach((rec) => {
        rec.skinnedMesh.geometry.dispose();
        if (Array.isArray(rec.skinnedMesh.material)) {
          rec.skinnedMesh.material.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial && mat.map) {
              mat.map.dispose();
            }
            mat.dispose();
          });
        }
      });

      renderer.dispose();
    };
  }, []);

  const totalPages = bookPages.length;

  const handlePrevPage = () => {
    setPage((p) => Math.max(0, p - 1));
  };

  const handleNextPage = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  // Direct Click on 3D Stage
  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const hovered = hoveredPageIndexRef.current;
    if (hovered !== null) {
      const isOpened = delayedPage > hovered;
      // If clicked on an already-opened page on the left, flip it back!
      // If clicked on a closed page on the right, flip it forward!
      setPage(isOpened ? hovered : hovered + 1);
      return;
    }

    // Fallback: click left half turns back, right half turns forward
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / rect.width;
    if (clickX > 0.5) {
      handleNextPage();
    } else {
      handlePrevPage();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[640px] w-full flex-col justify-end overflow-hidden bg-transparent select-none sm:h-[740px] md:h-[820px] lg:h-[900px]"
    >
      {/* 3D WebGL Canvas Layer - 100% Transparent, floating on site sand background */}
      <div
        onClick={handleStageClick}
        className="absolute inset-0 z-0"
        title={t('book_title_attr')}
      >
        <canvas
          ref={canvasRef}
          className={`h-full w-full transition-opacity duration-700 ${
            isReady && !isContextLost ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Bottom Minimal Navigation Bar (No background, no rounded corners) */}
      <div className="relative z-10 mx-auto mb-4 flex w-full max-w-5xl flex-col items-center gap-3 px-4 sm:mb-6 sm:px-6">
        <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 py-2">
          {/* Previous Page Arrow */}
          <button
            type="button"
            aria-label={t('book_prev_label')}
            disabled={page === 0}
            onClick={handlePrevPage}
            className="flex h-8 w-8 cursor-pointer items-center justify-center border border-[#8B7043]/30 bg-transparent text-[#8B7043] transition-all hover:border-[#8B7043] hover:bg-[#8B7043] hover:text-white disabled:cursor-not-allowed disabled:opacity-20 sm:h-9 sm:w-9"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Quick Page Jump Tabs */}
          {bookPages.map((item, idx) => {
            const isActive = page === idx;
            return (
              <button
                key={item.id}
                type="button"
                title={item.title}
                aria-label={item.tabLabel}
                onClick={() => setPage(idx)}
                className={`cursor-pointer px-2 py-1.5 text-[9px] font-bold tracking-[0.18em] uppercase transition-all duration-300 sm:px-3 sm:text-[10.5px] ${
                  isActive
                    ? 'border-b-2 border-[#8B7043] text-[#8B7043]'
                    : 'border-b-2 border-transparent text-[#151926]/60 hover:border-[#8B7043]/40 hover:text-[#151926]'
                } ${inter.className}`}
              >
                {item.tabLabel}
              </button>
            );
          })}

          {/* Next Page Arrow */}
          <button
            type="button"
            aria-label={t('book_next_label')}
            disabled={page === totalPages}
            onClick={handleNextPage}
            className="flex h-8 w-8 cursor-pointer items-center justify-center border border-[#8B7043]/30 bg-transparent text-[#8B7043] transition-all hover:border-[#8B7043] hover:bg-[#8B7043] hover:text-white disabled:cursor-not-allowed disabled:opacity-20 sm:h-9 sm:w-9"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
