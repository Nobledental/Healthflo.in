"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// ─── Organ config ─────────────────────────────────────────────────────────────
const ORGANS = [
  { path: "/models/heart.glb",      specialty: "Cardiology",    condition: "Cardiac Care",   accent: "#ff9999" },
  { path: "/models/brain.glb",      specialty: "Neurology",     condition: "Neurosurgery",   accent: "#ffccaa" },
  { path: "/models/lungs.glb",      specialty: "Pulmonology",   condition: "Thoracic Care",  accent: "#ffaaaa" },
  { path: "/models/kidneys.glb",    specialty: "Nephrology",    condition: "Renal Care",     accent: "#ffbb88" },
  { path: "/models/eye_vision.glb", specialty: "Ophthalmology", condition: "Eye Surgery",    accent: "#99ddff" },
  { path: "/models/liver.glb",      specialty: "Hepatology",    condition: "Liver Care",     accent: "#ffbb77" },
];

// ─── Auto-fit model: normalises every GLB to the same visual size ────────────
function OrganMesh({ path, accent }: { path: string; accent: string }) {
  const { scene } = useGLTF(path);
  const groupRef = useRef<THREE.Group>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!scene) return;

    // Reset scale and position to fix cumulative mutation bugs from useGLTF caching
    scene.scale.setScalar(1);
    scene.position.set(0, 0, 0);
    scene.updateMatrixWorld(true);

    // Normalise size: fit every model into a consistent target bounding sphere
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // 2.3 fits perfectly within the card bounds at camera z=4.2
    const targetSize = 2.3;
    const s = targetSize / (maxDim || 1);
    scene.scale.setScalar(s);

    // Centre the model (and shift it slightly up by 0.2 to account for bottom text)
    const centre = box.getCenter(new THREE.Vector3());
    scene.position.sub(centre.multiplyScalar(s));
    scene.position.y += 0.15; // Visual centering offset

    // Apply consistent material
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(path.includes("brain") ? "#c08070" :
                                 path.includes("lungs") ? "#c06060" :
                                 path.includes("kidney") ? "#8b4a2a" :
                                 path.includes("eye") ? "#3a6a8a" :
                                 path.includes("liver") ? "#7a3820" :
                                 "#7a1220"),
          roughness: 0.55,
          metalness: 0.06,
          clearcoat: 0.5,
          clearcoatRoughness: 0.35,
          sheen: 0.4,
          sheenRoughness: 0.7,
          sheenColor: new THREE.Color(accent),
          envMapIntensity: 1.2,
        });
      }
    });
    setReady(true);
  }, [scene, path, accent]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.25;
    // Heartbeat
    if (path.includes("heart")) {
      const t = state.clock.elapsedTime;
      const beat = Math.max(0, Math.sin(t * Math.PI * 1.4) * Math.sin(t * Math.PI * 2.8));
      groupRef.current.scale.setScalar(1 + beat * 0.06);
    }
  });

  if (!ready) return null;

  return (
    <group ref={groupRef}>
      <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.4} floatingRange={[-0.08, 0.08]}>
        <primitive object={scene} />
      </Float>
    </group>
  );
}

function OrganCanvas({ organIndex }: { organIndex: number }) {
  const organ = ORGANS[organIndex];
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 46 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5 }}
    >
      <Suspense fallback={null}>
        <Environment preset="apartment" />
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 6, 4]}  intensity={4.5} color="#ffffff" castShadow />
        <directionalLight position={[-2, 2, 2]} intensity={1.8} color="#ffeedd" />
        <pointLight position={[0, 2, 3]} intensity={3.5} color="#ffffff" distance={9} decay={2} />
        <pointLight position={[1, -1, 2]} intensity={1.5} color={organ.accent} distance={7} decay={2} />
        <OrganMesh path={organ.path} accent={organ.accent} />
      </Suspense>
    </Canvas>
  );
}

// ─── Card shell ───────────────────────────────────────────────────────────────
function MedicalCard({ organIndex }: { organIndex: number }) {
  const organ = ORGANS[organIndex];
  return (
    <div style={{
      width: 172,
      height: 235,
      borderRadius: 22,
      overflow: "hidden",
      position: "relative",
      background: "linear-gradient(165deg, #f0f8ff 0%, #d6eeff 50%, #b8d8f8 100%)",
      boxShadow: "0 24px 60px rgba(0,60,180,0.16), 0 4px 14px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.9)",
      border: "1.5px solid rgba(255,255,255,0.88)",
    }}>
      {/* 3D canvas full-bleed */}
      <div style={{ position: "absolute", inset: 0 }}>
        <OrganCanvas organIndex={organIndex} />
      </div>

      {/* Soft bottom vignette */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
        background: "linear-gradient(to top, rgba(185,218,255,0.94) 0%, rgba(210,232,255,0.5) 55%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Specialty label — bottom right */}
      <div style={{ position: "absolute", bottom: 15, right: 14, textAlign: "right", pointerEvents: "none" }}>
        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, color: "#5588bb", textTransform: "uppercase", marginBottom: 3 }}>
          {organ.condition}
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: "#0c2d5c", lineHeight: 1.15 }}>
          {organ.specialty}
        </div>
      </div>

      {/* Top pill */}
      <div style={{
        position: "absolute", top: 12, left: 12,
        fontSize: 8, fontWeight: 600, color: "rgba(30,80,160,0.65)",
        letterSpacing: 1.2, textTransform: "uppercase",
        background: "rgba(255,255,255,0.55)", backdropFilter: "blur(6px)",
        padding: "3px 8px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.8)",
        pointerEvents: "none",
      }}>
        Interactive
      </div>
    </div>
  );
}

// ─── Main: two fixed spots, one card at a time ────────────────────────────────
type Phase = "entering" | "visible" | "exiting" | "hidden";

const SPOTS = [
  { left: 20,  top: "38%" } as const,  // Left
  { right: 20, top: "38%" } as const,  // Right
];

export default function Hero3DBackground() {
  const [activeSpot, setActiveSpot]   = useState(0);
  const [organIndex, setOrganIndex]   = useState(0);
  const [phase, setPhase]             = useState<Phase>("hidden");
  const timerRef                      = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const safe = (fn: () => void, ms: number) => {
      timerRef.current = setTimeout(fn, ms);
    };

    const cycle = (spotIdx: number, orgIdx: number, delay: number) => {
      safe(() => {
        setActiveSpot(spotIdx);
        setOrganIndex(orgIdx);
        setPhase("entering");

        safe(() => {
          setPhase("visible");

          // Show for 5-7s
          safe(() => {
            setPhase("exiting");

            safe(() => {
              setPhase("hidden");
              // Alternate spots; advance organ
              const nextSpot = (spotIdx + 1) % SPOTS.length;
              const nextOrg  = (orgIdx + 1) % ORGANS.length;
              cycle(nextSpot, nextOrg, 150); // Minimal gap before next card
            }, 300);
          }, 3500 + Math.random() * 1000); // Also slightly shorter display time so it feels faster
        }, 300);
      }, delay);
    };

    cycle(0, 0, 150);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const spot = SPOTS[activeSpot];

  // Build position style without transform so we can control it separately
  const posStyle: React.CSSProperties = {};
  if ("left"  in spot) posStyle.left  = spot.left  as number;
  if ("right" in spot) posStyle.right = spot.right as number;
  posStyle.top = spot.top as string;

  const opacity = phase === "visible" ? 1 : 0;

  // Vertical centering + entrance/exit animation via transform
  let cardTransform = "translateY(-50%)";
  if (phase === "entering") cardTransform = "translateY(calc(-50% + 14px)) scale(0.88)";
  if (phase === "exiting")  cardTransform = "translateY(calc(-50% - 10px)) scale(0.88)";

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      {phase !== "hidden" && (
        <div style={{
          position: "absolute",
          ...posStyle,
          transform: cardTransform,
          opacity,
          transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}>
          <MedicalCard organIndex={organIndex} />
        </div>
      )}
    </div>
  );
}

useGLTF.preload("/models/heart.glb");
useGLTF.preload("/models/brain.glb");