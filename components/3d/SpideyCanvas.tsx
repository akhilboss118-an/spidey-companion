"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";

export type EmotionType = "neutral" | "happy" | "surprised" | "excited";

export interface SpideyCanvasRef {
  setEmotion: (emotion: EmotionType) => void;
}

interface SpideyCanvasProps {
  className?: string;
  enableMouseTracking?: boolean;
  height?: string;
}

// Emotion → animation file + emissive config
const EMOTION_MAP: Record<
  EmotionType,
  {
    anim: string;
    emissiveColor: THREE.ColorRepresentation;
    emissiveIntensity: number;
    glowIntensity: number;
    label: string;
  }
> = {
  neutral:   { anim: "/animations/Standing Idle.fbx",    emissiveColor: 0x220000, emissiveIntensity: 0.06, glowIntensity: 0,   label: "Idle" },
  happy:     { anim: "/animations/Waving Gesture.fbx",   emissiveColor: 0xff2200, emissiveIntensity: 0.45, glowIntensity: 0.8, label: "Waving" },
  surprised: { anim: "/animations/Thinking.fbx",         emissiveColor: 0xff8800, emissiveIntensity: 0.35, glowIntensity: 0.5, label: "Thinking" },
  excited:   { anim: "/animations/Wave Hip Hop Dance.fbx",emissiveColor: 0xff0033, emissiveIntensity: 0.75, glowIntensity: 1.5, label: "Dancing" },
};

const SpideyCanvas = forwardRef<SpideyCanvasRef, SpideyCanvasProps>(
  ({ className = "", enableMouseTracking = true, height = "100%" }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mutable state kept in refs to avoid re-renders
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);
    const modelRef = useRef<THREE.Object3D | null>(null);
    const currentActionRef = useRef<THREE.AnimationAction | null>(null);
    const emotionRef = useRef<EmotionType>("neutral");
    const pendingEmotionRef = useRef<EmotionType | null>(null);
    const glowLightRef = useRef<THREE.PointLight | null>(null);
    const targetRotYRef = useRef(0);
    const animIdRef = useRef(0);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    useImperativeHandle(ref, () => ({
      setEmotion: (emotion: EmotionType) => {
        pendingEmotionRef.current = emotion;
        emotionRef.current = emotion;
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // ── Scene ────────────────────────────────────────────────────────
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        35,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 1.0, 5.2);
      camera.lookAt(0, 0.8, 0);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);
      container.style.opacity = "0";
      container.style.transition = "opacity 0.8s ease";

      // ── Lights ───────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const key = new THREE.DirectionalLight(0xffffff, 2.5);
      key.position.set(2, 5, 3);
      key.castShadow = true;
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xe31c25, 2.0);
      rim.position.set(-3, 2, -2);
      scene.add(rim);
      const fill = new THREE.DirectionalLight(0x88aaff, 0.4);
      fill.position.set(0, -1, 2);
      scene.add(fill);
      const glow = new THREE.PointLight(0xe31c25, 0, 6);
      glow.position.set(0, 1, 2);
      scene.add(glow);
      glowLightRef.current = glow;

      // ── Load the Spider-Man diffuse texture first ─────────────────────
      const textureLoader = new THREE.TextureLoader();
      const spiderTexture = textureLoader.load("/models/spiderman/Body_D.png");
      const normalTexture = textureLoader.load("/models/spiderman/Body_N.png");
      const emissiveTexture = textureLoader.load("/models/spiderman/Body_E.png");

      // ── Load FBX model ───────────────────────────────────────────────
      const loadModel = async () => {
        try {
          const { FBXLoader } = await import("three/addons/loaders/FBXLoader.js");
          const loader = new FBXLoader();
          const fbxModel = await loader.loadAsync(EMOTION_MAP.neutral.anim);

          // Scale + center the FBX model
          fbxModel.scale.setScalar(0.012); // Mixamo models are huge
          fbxModel.position.set(0, -1.1, 0);

          // Apply Spider-Man texture to all mesh materials
          fbxModel.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              // Replace material with Spider-Man-textured standard material
              mesh.material = new THREE.MeshStandardMaterial({
                map: spiderTexture,
                normalMap: normalTexture,
                emissiveMap: emissiveTexture,
                emissive: new THREE.Color(0x220000),
                emissiveIntensity: 0.06,
                roughness: 0.4,
                metalness: 0.5,
              });
            }
          });

          // Set up animation mixer
          const mixer = new THREE.AnimationMixer(fbxModel);
          mixerRef.current = mixer;

          // Play the idle animation (already baked into the FBX)
          if (fbxModel.animations.length > 0) {
            const idleAction = mixer.clipAction(fbxModel.animations[0]);
            idleAction.play();
            currentActionRef.current = idleAction;
          }

          modelRef.current = fbxModel;
          scene.add(fbxModel);
          container.style.opacity = "1";

          // Preload other animation clips in background
          preloadAnimations(loader, mixer, fbxModel);
        } catch (err) {
          console.error("FBX load failed:", err);
          // Fallback sphere
          const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.8, 32, 32),
            new THREE.MeshStandardMaterial({ color: 0xe31c25, roughness: 0.3, metalness: 0.7 })
          );
          sphere.position.set(0, 0, 0);
          scene.add(sphere);
          modelRef.current = sphere;
          container.style.opacity = "1";
        }
      };

      // Preload all emotion animation FBXs
      const animCache = new Map<string, THREE.AnimationClip>();
      const preloadAnimations = async (loader: any, mixer: THREE.AnimationMixer, model: THREE.Object3D) => {
        const emotionKeys = Object.keys(EMOTION_MAP) as EmotionType[];
        for (const key of emotionKeys) {
          if (key === "neutral") continue; // already loaded
          try {
            const fbx = await loader.loadAsync(EMOTION_MAP[key].anim);
            if (fbx.animations.length > 0) {
              const clip = fbx.animations[0];
              clip.name = key;
              animCache.set(key, clip);
            }
          } catch (e) {
            console.warn(`Could not preload animation for ${key}`);
          }
        }
      };

      loadModel();

      // ── Mouse tracking (zero delay on dot, slight lerp on character) ─
      let mouseX = 0;
      const isTouchDevice = window.matchMedia("(hover: none)").matches;
      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        targetRotYRef.current = mouseX * 0.3;
      };
      if (enableMouseTracking && !isTouchDevice) {
        window.addEventListener("mousemove", onMouseMove);
      }

      // ── Animation loop ────────────────────────────────────────────────
      const clock = new THREE.Clock();
      let currentRotY = 0;
      let excitedPhase = 0;

      // Transition to a new animation clip
      const switchAnimation = (emotion: EmotionType) => {
        if (!mixerRef.current || !modelRef.current) return;
        const config = EMOTION_MAP[emotion];

        // Get cached clip
        const clip = animCache.get(emotion);
        if (!clip) return; // still loading

        const newAction = mixerRef.current.clipAction(clip);
        newAction.reset();

        if (currentActionRef.current && currentActionRef.current !== newAction) {
          currentActionRef.current.fadeOut(0.4);
          newAction.fadeIn(0.4);
        }
        newAction.play();
        currentActionRef.current = newAction;

        // Update emissive on all meshes
        modelRef.current.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
            if (mat?.emissive) {
              mat.emissive.set(config.emissiveColor);
              mat.emissiveIntensity = config.emissiveIntensity;
            }
          }
        });

        if (glowLightRef.current) {
          glowLightRef.current.intensity = config.glowIntensity;
        }
      };

      const animate = () => {
        animIdRef.current = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const t = clock.getElapsedTime();

        // Check if emotion changed
        if (pendingEmotionRef.current !== null) {
          const em = pendingEmotionRef.current;
          pendingEmotionRef.current = null;
          switchAnimation(em);
        }

        // Update mixer
        if (mixerRef.current) {
          mixerRef.current.update(delta);
        }

        const model = modelRef.current;
        if (model) {
          // Subtle idle float (even during animations)
          model.position.y = -1.1 + Math.sin(t * 0.6) * 0.025;

          // Smooth mouse rotation
          currentRotY += (targetRotYRef.current - currentRotY) * 0.08;
          model.rotation.y = currentRotY;

          // Excited pulsing glow
          if (emotionRef.current === "excited" && glowLightRef.current) {
            excitedPhase += delta * 5;
            glowLightRef.current.intensity = 1.5 + Math.sin(excitedPhase) * 1.0;
          }
        }

        renderer.render(scene, camera);
      };
      animate();

      // ── Resize ───────────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(animIdRef.current);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }, [enableMouseTracking]);

    return (
      <div
        ref={containerRef}
        className={className}
        style={{ height }}
        data-cursor="interactive"
      />
    );
  }
);

SpideyCanvas.displayName = "SpideyCanvas";
export default SpideyCanvas;
