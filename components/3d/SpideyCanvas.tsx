"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export type EmotionType = "neutral" | "happy" | "surprised" | "excited";

export interface SpideyCanvasRef {
  setEmotion: (emotion: EmotionType) => void;
}

interface SpideyCanvasProps {
  className?: string;
  enableMouseTracking?: boolean;
  height?: string;
}

const EMOTION_CONFIGS: Record<
  EmotionType,
  {
    emissiveColor: number;
    emissiveIntensity: number;
    glowColor: number;
    glowIntensity: number;
    bounceSpeed: number;
    bounceHeight: number;
    scaleMultiplier: number;
  }
> = {
  neutral: {
    emissiveColor: 0x220000,
    emissiveIntensity: 0.2,
    glowColor: 0xe31c25,
    glowIntensity: 1.0,
    bounceSpeed: 1.2,
    bounceHeight: 0.04,
    scaleMultiplier: 1.0,
  },
  happy: {
    emissiveColor: 0xff3300,
    emissiveIntensity: 0.8,
    glowColor: 0xff4422,
    glowIntensity: 2.5,
    bounceSpeed: 2.4,
    bounceHeight: 0.09,
    scaleMultiplier: 1.04,
  },
  surprised: {
    emissiveColor: 0xff8800,
    emissiveIntensity: 0.7,
    glowColor: 0xffaa00,
    glowIntensity: 2.2,
    bounceSpeed: 1.8,
    bounceHeight: 0.07,
    scaleMultiplier: 1.08,
  },
  excited: {
    emissiveColor: 0xff0033,
    emissiveIntensity: 1.2,
    glowColor: 0xff0044,
    glowIntensity: 3.5,
    bounceSpeed: 3.5,
    bounceHeight: 0.12,
    scaleMultiplier: 1.06,
  },
};

const SpideyCanvas = forwardRef<SpideyCanvasRef, SpideyCanvasProps>(
  ({ className = "", enableMouseTracking = true, height = "100%" }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const emotionRef = useRef<EmotionType>("neutral");
    const emotionTargetRef = useRef(EMOTION_CONFIGS.neutral);
    const modelGroupRef = useRef<THREE.Group | null>(null);
    const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
    const glowLightRef = useRef<THREE.PointLight | null>(null);
    const targetRotXRef = useRef(0);
    const targetRotYRef = useRef(0);
    const spinAnimRef = useRef(0);

    useImperativeHandle(ref, () => ({
      setEmotion: (emotion: EmotionType) => {
        emotionRef.current = emotion;
        emotionTargetRef.current = EMOTION_CONFIGS[emotion];
        // Trigger a quick joyful reaction tilt on emotion click
        if (emotion === "excited") {
          spinAnimRef.current = Math.PI * 2; // full 360 spin
        } else if (emotion === "surprised") {
          spinAnimRef.current = -0.3;
        } else if (emotion === "happy") {
          spinAnimRef.current = 0.3;
        }
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // ── Scene Setup ──────────────────────────────────────────
      const scene = new THREE.Scene();

      const width = container.clientWidth || 400;
      const heightVal = container.clientHeight || 500;

      const camera = new THREE.PerspectiveCamera(40, width / heightVal, 0.1, 100);
      camera.position.set(0, 0.05, 3.1);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, heightVal);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);

      // ── Lighting ─────────────────────────────────────────────
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      // Key light from top-right
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
      keyLight.position.set(3, 4, 3);
      scene.add(keyLight);

      // Spider red rim light from left-rear
      const redRimLight = new THREE.DirectionalLight(0xe31c25, 2.8);
      redRimLight.position.set(-3, 2, -2);
      scene.add(redRimLight);

      // Stark cyan tech fill from bottom-right
      const cyanFillLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
      cyanFillLight.position.set(2, -2, 2);
      scene.add(cyanFillLight);

      // Dynamic chest/eye reactor point light
      const glowLight = new THREE.PointLight(0xe31c25, 1.0, 5);
      glowLight.position.set(0, 0.2, 1.2);
      scene.add(glowLight);
      glowLightRef.current = glowLight;

      // ── Model Group ──────────────────────────────────────────
      const modelGroup = new THREE.Group();
      scene.add(modelGroup);
      modelGroupRef.current = modelGroup;

      // ── Load Textures & OBJ ───────────────────────────────────
      const textureLoader = new THREE.TextureLoader();

      const loadTexturesAndModel = async () => {
        try {
          const diffuseMap = await textureLoader.loadAsync("/models/spiderman/Body_D.png");
          diffuseMap.colorSpace = THREE.SRGBColorSpace;

          let normalMap: THREE.Texture | null = null;
          try {
            normalMap = await textureLoader.loadAsync("/models/spiderman/Body_N.png");
          } catch (e) {
            console.warn("Normal map load skipped", e);
          }

          let emissiveMap: THREE.Texture | null = null;
          try {
            emissiveMap = await textureLoader.loadAsync("/models/spiderman/Body_E.png");
          } catch (e) {
            console.warn("Emissive map load skipped", e);
          }

          const spiderMaterial = new THREE.MeshStandardMaterial({
            map: diffuseMap,
            normalMap: normalMap,
            emissiveMap: emissiveMap,
            emissive: new THREE.Color(EMOTION_CONFIGS.neutral.emissiveColor),
            emissiveIntensity: EMOTION_CONFIGS.neutral.emissiveIntensity,
            roughness: 0.38,
            metalness: 0.45,
          });

          materialsRef.current = [spiderMaterial];

          const objLoader = new OBJLoader();
          const obj = await objLoader.loadAsync("/models/spiderman/spider.obj");

          // Calculate bounding box and center model precisely
          const box = new THREE.Box3().setFromObject(obj);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          // Center mesh around origin
          obj.position.set(-center.x, -center.y, -center.z);

          // Apply standard material
          obj.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.material = spiderMaterial;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
            }
          });

          // Scale to fit viewport perfectly (height = 1.95)
          const targetHeight = 1.95;
          const scale = targetHeight / (size.y || 1.77);
          modelGroup.scale.set(scale, scale, scale);
          modelGroup.position.set(0, -0.05, 0);

          modelGroup.add(obj);
        } catch (err) {
          console.error("Spider-Man OBJ loading error:", err);
          // Fallback sleek stylized red Spider orb
          const geo = new THREE.SphereGeometry(0.8, 32, 32);
          const mat = new THREE.MeshStandardMaterial({
            color: 0xe31c25,
            roughness: 0.3,
            metalness: 0.6,
            emissive: 0x330000,
            emissiveIntensity: 0.5,
          });
          const mesh = new THREE.Mesh(geo, mat);
          modelGroup.add(mesh);
        }
      };

      loadTexturesAndModel();

      // ── Mouse Tracking (desktop) ─────────────────────────────
      const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

      const handleMouseMove = (e: MouseEvent) => {
        if (!enableMouseTracking || isTouch) return;
        const rect = container.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotYRef.current = nx * 0.45; // rotate Y horizontally
        targetRotXRef.current = ny * 0.2;  // tilt X vertically
      };

      if (enableMouseTracking && !isTouch) {
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
      }

      // ── Animation Loop ───────────────────────────────────────
      const clock = new THREE.Clock();
      let currentRotY = 0;
      let currentRotX = 0;
      let currentScale = 1.0;
      let rafId = 0;

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const delta = clock.getDelta();
        const config = emotionTargetRef.current;

        // Smooth spin decay
        if (Math.abs(spinAnimRef.current) > 0.01) {
          spinAnimRef.current *= 0.92;
        } else {
          spinAnimRef.current = 0;
        }

        // Smooth mouse rotation lerp
        currentRotY += (targetRotYRef.current - currentRotY) * 0.08;
        currentRotX += (targetRotXRef.current - currentRotX) * 0.08;

        if (modelGroupRef.current) {
          // Floating bob + breath animation
          const bob = Math.sin(t * config.bounceSpeed) * config.bounceHeight;
          const sway = Math.sin(t * 0.8) * 0.015;

          modelGroupRef.current.position.y = -0.05 + bob;
          modelGroupRef.current.rotation.y = currentRotY + spinAnimRef.current + sway;
          modelGroupRef.current.rotation.x = currentRotX;
          modelGroupRef.current.rotation.z = -sway * 0.5;

          // Breathing scale effect
          const breath = 1.0 + Math.sin(t * 1.8) * 0.012;
          const targetTotalScale = config.scaleMultiplier * breath;
          currentScale += (targetTotalScale - currentScale) * 0.06;
          modelGroupRef.current.scale.setScalar(currentScale);
        }

        // Dynamic emissive and point light transitions
        materialsRef.current.forEach((mat) => {
          mat.emissive.lerp(new THREE.Color(config.emissiveColor), 0.05);
          mat.emissiveIntensity += (config.emissiveIntensity - mat.emissiveIntensity) * 0.05;
        });

        if (glowLightRef.current) {
          glowLightRef.current.color.lerp(new THREE.Color(config.glowColor), 0.05);
          glowLightRef.current.intensity += (config.glowIntensity - glowLightRef.current.intensity) * 0.05;
        }

        renderer.render(scene, camera);
      };

      animate();

      // ── Responsive Resize Observer ───────────────────────────
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width || container.clientWidth;
          const h = entry.contentRect.height || container.clientHeight;
          if (w > 0 && h > 0) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
          }
        }
      });
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("mousemove", handleMouseMove);
        resizeObserver.disconnect();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }, [enableMouseTracking]);

    return (
      <div
        ref={containerRef}
        className={`w-full relative ${className}`}
        style={{ height, minHeight: "350px" }}
        data-cursor="interactive"
      />
    );
  }
);

SpideyCanvas.displayName = "SpideyCanvas";
export default SpideyCanvas;
