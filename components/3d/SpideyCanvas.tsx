"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export type EmotionType =
  | "neutral"
  | "happy"
  | "surprised"
  | "excited"
  | "flip"
  | "clap"
  | "sad";

export interface SpideyCanvasRef {
  setEmotion: (emotion: EmotionType) => void;
}

interface SpideyCanvasProps {
  className?: string;
  enableMouseTracking?: boolean;
  height?: string;
  initialEmotion?: EmotionType;
}

const EMOTION_CONFIGS: Record<
  EmotionType,
  {
    modelPath: string;
    emissiveColor: number;
    emissiveIntensity: number;
    glowColor: number;
    glowIntensity: number;
    loop: boolean;
    scaleMultiplier: number;
  }
> = {
  neutral: {
    modelPath: "/models/standing_idle.glb",
    emissiveColor: 0x220000,
    emissiveIntensity: 0.2,
    glowColor: 0xe31c25,
    glowIntensity: 1.0,
    loop: true,
    scaleMultiplier: 1.0,
  },
  happy: {
    modelPath: "/models/waving_gesture.glb",
    emissiveColor: 0xff3300,
    emissiveIntensity: 0.8,
    glowColor: 0xff4422,
    glowIntensity: 2.2,
    loop: true,
    scaleMultiplier: 1.0,
  },
  surprised: {
    modelPath: "/models/thinking.glb",
    emissiveColor: 0xff8800,
    emissiveIntensity: 0.7,
    glowColor: 0xffaa00,
    glowIntensity: 2.0,
    loop: true,
    scaleMultiplier: 1.0,
  },
  excited: {
    modelPath: "/models/wave_dance.glb",
    emissiveColor: 0xff0044,
    emissiveIntensity: 1.2,
    glowColor: 0xff0055,
    glowIntensity: 3.0,
    loop: true,
    scaleMultiplier: 1.0,
  },
  flip: {
    modelPath: "/models/front_flip.glb",
    emissiveColor: 0x0088ff,
    emissiveIntensity: 1.0,
    glowColor: 0x00e5ff,
    glowIntensity: 2.8,
    loop: true,
    scaleMultiplier: 1.0,
  },
  clap: {
    modelPath: "/models/clapping.glb",
    emissiveColor: 0x00cc66,
    emissiveIntensity: 0.9,
    glowColor: 0x00e676,
    glowIntensity: 2.4,
    loop: true,
    scaleMultiplier: 1.0,
  },
  sad: {
    modelPath: "/models/sad_idle.glb",
    emissiveColor: 0x112244,
    emissiveIntensity: 0.4,
    glowColor: 0x3b82f6,
    glowIntensity: 1.2,
    loop: true,
    scaleMultiplier: 1.0,
  },
};

const SpideyCanvas = forwardRef<SpideyCanvasRef, SpideyCanvasProps>(
  (
    {
      className = "",
      enableMouseTracking = true,
      height = "100%",
      initialEmotion = "neutral",
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const emotionRef = useRef<EmotionType>(initialEmotion);
    const emotionTargetRef = useRef(EMOTION_CONFIGS[initialEmotion]);
    const switchModelFnRef = useRef<((emotion: EmotionType) => void) | null>(null);

    useImperativeHandle(ref, () => ({
      setEmotion: (emotion: EmotionType) => {
        emotionRef.current = emotion;
        emotionTargetRef.current = EMOTION_CONFIGS[emotion] || EMOTION_CONFIGS.neutral;
        if (switchModelFnRef.current) {
          switchModelFnRef.current(emotion);
        }
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      let isMounted = true;

      // ── Scene Setup ──────────────────────────────────────────
      const scene = new THREE.Scene();

      const width = container.clientWidth || 400;
      const heightVal = container.clientHeight || 500;

      const camera = new THREE.PerspectiveCamera(38, width / heightVal, 0.1, 100);
      camera.position.set(0, 0.95, 3.2);
      camera.lookAt(0, 0.85, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, heightVal);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      // ── Lighting ─────────────────────────────────────────────
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
      scene.add(ambientLight);

      // Key light from top-right
      const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
      keyLight.position.set(3, 4, 3);
      scene.add(keyLight);

      // Spider red rim light from left-rear
      const redRimLight = new THREE.DirectionalLight(0xe31c25, 3.0);
      redRimLight.position.set(-3, 2, -2);
      scene.add(redRimLight);

      // Stark cyan tech fill from bottom-right
      const cyanFillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
      cyanFillLight.position.set(2, -2, 2);
      scene.add(cyanFillLight);

      // Dynamic chest/eye reactor point light
      const glowLight = new THREE.PointLight(0xe31c25, 1.2, 6);
      glowLight.position.set(0, 1.0, 1.4);
      scene.add(glowLight);

      // ── Character Root Group ─────────────────────────────────
      const characterRoot = new THREE.Group();
      scene.add(characterRoot);

      // Cache for loaded GLTF scenes and mixers
      const gltfLoader = new GLTFLoader();
      const modelCache: Record<
        string,
        {
          scene: THREE.Group;
          mixer: THREE.AnimationMixer;
          actions: THREE.AnimationAction[];
        }
      > = {};

      let currentActiveModel: THREE.Group | null = null;
      let currentActiveMixer: THREE.AnimationMixer | null = null;

      const loadModelForEmotion = async (emotion: EmotionType) => {
        const config = EMOTION_CONFIGS[emotion] || EMOTION_CONFIGS.neutral;
        const path = config.modelPath;

        if (modelCache[path]) {
          const cached = modelCache[path];
          if (currentActiveModel && currentActiveModel !== cached.scene) {
            characterRoot.remove(currentActiveModel);
          }
          characterRoot.add(cached.scene);
          currentActiveModel = cached.scene;
          currentActiveMixer = cached.mixer;
          cached.actions.forEach((act) => {
            act.reset();
            act.setEffectiveWeight(1.0);
            act.play();
          });
          return;
        }

        try {
          const gltf = await gltfLoader.loadAsync(path);
          if (!isMounted) return;

          const model = gltf.scene;

          // Normalize bounding box & position
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          // Scale to consistent 1.9m height
          const targetHeight = 1.9;
          const scale = targetHeight / (size.y || 1.8);
          model.scale.set(scale, scale, scale);

          // Center horizontally and align feet with base
          model.position.x = -center.x * scale;
          model.position.z = -center.z * scale;
          model.position.y = -box.min.y * scale;

          // Enable shadows and enhance materials
          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if (mesh.material) {
                const mat = mesh.material as THREE.MeshStandardMaterial;
                mat.roughness = Math.min(mat.roughness || 0.4, 0.45);
                mat.metalness = 0.25;
              }
            }
          });

          // Animation Mixer setup
          const mixer = new THREE.AnimationMixer(model);
          const actions: THREE.AnimationAction[] = [];

          if (gltf.animations && gltf.animations.length > 0) {
            gltf.animations.forEach((clip) => {
              const action = mixer.clipAction(clip);
              action.play();
              actions.push(action);
            });
          }

          modelCache[path] = { scene: model, mixer, actions };

          if (emotionRef.current === emotion) {
            if (currentActiveModel && currentActiveModel !== model) {
              characterRoot.remove(currentActiveModel);
            }
            characterRoot.add(model);
            currentActiveModel = model;
            currentActiveMixer = mixer;
          }
        } catch (err) {
          console.error("Failed to load 3D GLB model:", path, err);
        }
      };

      // Connect switch function to ref
      switchModelFnRef.current = (emotion: EmotionType) => {
        loadModelForEmotion(emotion);
      };

      // Initial load
      loadModelForEmotion(emotionRef.current);

      // Preload other models in background
      Object.keys(EMOTION_CONFIGS).forEach((key) => {
        if (key !== emotionRef.current) {
          setTimeout(() => {
            if (isMounted) loadModelForEmotion(key as EmotionType);
          }, 400);
        }
      });

      // ── Mouse / Touch Tracking ───────────────────────────────
      const targetRotYRef = { current: 0 };
      const targetRotXRef = { current: 0 };
      const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

      const handleMouseMove = (e: MouseEvent) => {
        if (!enableMouseTracking || isTouch) return;
        const rect = container.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotYRef.current = nx * 0.5; // rotate horizontally
        targetRotXRef.current = ny * 0.15; // tilt vertically
      };

      if (enableMouseTracking && !isTouch) {
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
      }

      // ── Animation Render Loop ────────────────────────────────
      const clock = new THREE.Clock();
      let currentRotY = 0;
      let currentRotX = 0;
      let rafId = 0;

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const t = clock.getElapsedTime();
        const config = emotionTargetRef.current;

        // Update active animation mixer
        if (currentActiveMixer) {
          currentActiveMixer.update(delta);
        }

        // Smooth mouse rotation lerp
        currentRotY += (targetRotYRef.current - currentRotY) * 0.08;
        currentRotX += (targetRotXRef.current - currentRotX) * 0.08;

        // Subtle organic sway
        const sway = Math.sin(t * 1.2) * 0.015;
        characterRoot.rotation.y = currentRotY + sway;
        characterRoot.rotation.x = currentRotX;

        // Dynamic reactor glow transition
        if (glowLight) {
          glowLight.color.lerp(new THREE.Color(config.glowColor), 0.08);
          glowLight.intensity += (config.glowIntensity - glowLight.intensity) * 0.08;
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
        isMounted = false;
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
        style={{ height, minHeight: "380px" }}
        data-cursor="interactive"
      />
    );
  }
);

SpideyCanvas.displayName = "SpideyCanvas";
export default SpideyCanvas;
