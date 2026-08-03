"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, ContactShadows, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

// 3D Model Component
function HeartModel() {
  // Load the GLTF model. Make sure to preload it.
  const { scene } = useGLTF("/models/heart.glb");
  const modelRef = useRef<THREE.Group>(null);

  // Apply a custom material to make it look glassmorphic/holographic
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#e11d48"), // Vibrant deep pink/red
          emissive: new THREE.Color("#fb7185"), // Bright pink glow
          emissiveIntensity: 0.5,
          roughness: 0.2,
          metalness: 0.5,
          transmission: 0.6, // Glass-like depth
          thickness: 2,
          ior: 1.5,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          transparent: true,
          opacity: 1,
        });
      }
    });
  }, [scene]);
  
  // Slowly rotate the model and make it pulsate
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
      
      // Heartbeat pulsating effect
      // Combining two sine waves for a "lub-dub" double beat effect
      const t = state.clock.elapsedTime * 3;
      const pulse = 1 + (Math.sin(t) * Math.sin(t * 2)) * 0.08;
      modelRef.current.scale.set(pulse, pulse, pulse);
    }
    
    // Pulse the glow as well
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
         const mesh = child as THREE.Mesh;
         if (mesh.material instanceof THREE.MeshPhysicalMaterial) {
           const t = state.clock.elapsedTime * 3;
           const pulse = (Math.sin(t) * Math.sin(t * 2));
           mesh.material.emissiveIntensity = 0.5 + pulse * 0.4;
         }
      }
    });
  });

  return (
    <group ref={modelRef} dispose={null}>
      <Float
        speed={2} // Animation speed
        rotationIntensity={0.5} // XYZ rotation intensity
        floatIntensity={1} // Up/down float intensity
        floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within
      >
        <primitive 
          object={scene} 
          scale={1.4} 
          position={[0, 0, 0]} 
          rotation={[0, -Math.PI / 4, 0]} 
        />
      </Float>
    </group>
  );
}

// 3D Brain Component for the left side
function BrainModel() {
  const { scene } = useGLTF("/models/brain.glb");
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#0284c7"), // Deep vibrant blue
          emissive: new THREE.Color("#38bdf8"), // Bright blue glow
          emissiveIntensity: 0.5,
          roughness: 0.2,
          metalness: 0.5,
          transmission: 0.6, // Glass-like depth
          thickness: 2,
          ior: 1.5,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          transparent: true,
          opacity: 1,
        });
      }
    });
  }, [scene]);
  
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.1; // Brain rotates slower
    }
  });

  return (
    <group ref={modelRef} dispose={null}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
        <primitive object={scene} scale={1.4} position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]} />
      </Float>
    </group>
  );
}

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Support high DPI screens
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#e0f2fe" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#bae6fd" />
          
          <PresentationControls
            global
            snap={true}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <group position={[4.2, 0.5, 0]}> {/* Heart on the Right */}
              <HeartModel />
            </group>
            
            <group position={[-4.2, 0.5, 0]}> {/* Brain on the Left */}
              <BrainModel />
            </group>
          </PresentationControls>

          <ContactShadows position={[4.2, -1.5, 0]} opacity={0.3} scale={10} blur={3} far={4} color="#e11d48" />
          <ContactShadows position={[-4.2, -1.5, 0]} opacity={0.3} scale={10} blur={3} far={4} color="#0284c7" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the models so they are ready quickly
useGLTF.preload("/models/heart.glb");
useGLTF.preload("/models/brain.glb");
