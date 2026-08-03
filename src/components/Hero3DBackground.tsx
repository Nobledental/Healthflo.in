"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// --- Heart Model (Right Side) ---
function HeartModel() {
  const { scene } = useGLTF("/models/heart.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#c0143c"),
          emissive: new THREE.Color("#ff6b8a"),
          emissiveIntensity: 0.6,
          roughness: 0.15,
          metalness: 0.3,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          envMapIntensity: 1.5,
        });
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.2;
    const t = state.clock.elapsedTime;
    const beat = Math.max(0, Math.sin(t * Math.PI * 1.4) * Math.sin(t * Math.PI * 2.8));
    const scale = 1 + beat * 0.1;
    groupRef.current.scale.setScalar(scale);
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material instanceof THREE.MeshPhysicalMaterial) {
          mesh.material.emissiveIntensity = 0.5 + beat * 0.8;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.8} floatingRange={[-0.15, 0.15]}>
        <primitive object={scene} scale={1.6} rotation={[0.15, -Math.PI / 5, 0]} />
      </Float>
    </group>
  );
}

// --- Brain Model (Left Side) ---
function BrainModel() {
  const { scene } = useGLTF("/models/brain.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#0369a1"),
          emissive: new THREE.Color("#38bdf8"),
          emissiveIntensity: 0.5,
          roughness: 0.1,
          metalness: 0.4,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          envMapIntensity: 2.0,
        });
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    const t = state.clock.elapsedTime * 0.8;
    const glow = 0.4 + Math.sin(t) * 0.2;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material instanceof THREE.MeshPhysicalMaterial) {
          mesh.material.emissiveIntensity = glow;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.8} floatingRange={[-0.15, 0.15]}>
        <primitive object={scene} scale={1.5} rotation={[0.1, Math.PI / 5, 0]} />
      </Float>
    </group>
  );
}

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ opacity: 0.85 }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.4} />
          <directionalLight position={[8, 8, 4]} intensity={1.5} color="#ffffff" castShadow />
          <directionalLight position={[-8, 5, 4]} intensity={1.0} color="#bae6fd" />
          <directionalLight position={[0, -5, -6]} intensity={0.8} color="#e0f2fe" />
          <pointLight position={[4, 0, 3]} intensity={3} color="#ff6b8a" distance={7} decay={2} />
          <pointLight position={[-4, 0, 3]} intensity={3} color="#38bdf8" distance={7} decay={2} />

          {/* Heart anchored right, y=0.5 to center vertically in hero */}
          <group position={[3.8, 0.5, 0]}>
            <HeartModel />
          </group>

          {/* Brain anchored left, same y */}
          <group position={[-3.8, 0.5, 0]}>
            <BrainModel />
          </group>

          <ContactShadows position={[3.8, -2.0, 0]} opacity={0.4} scale={8} blur={2.5} far={5} color="#c0143c" />
          <ContactShadows position={[-3.8, -2.0, 0]} opacity={0.4} scale={8} blur={2.5} far={5} color="#0369a1" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/heart.glb");
useGLTF.preload("/models/brain.glb");
