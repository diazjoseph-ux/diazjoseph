import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import BlobFallback from './BlobFallback';

function IridescentBlobMesh() {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  // Mouse interaction lerp
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotation.current = { x: y * 0.45, y: x * 0.65 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Slow ambient rotation
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.z += delta * 0.12;

    // Smooth mouse follow (lerp)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      meshRef.current.rotation.y + targetRotation.current.y * 0.05,
      0.05
    );
  });

  return (
    <Float
      speed={2.5}
      rotationIntensity={0.8}
      floatIntensity={1.2}
      floatingRange={[-0.15, 0.15]}
    >
      <mesh ref={meshRef} scale={1.85}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#8b5cf6"
          roughness={0.12}
          metalness={0.88}
          distort={0.48}
          speed={2.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>
    </Float>
  );
}

class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <BlobFallback />;
    }
    return this.props.children;
  }
}

export default function HeroBlob() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Test WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  if (!hasWebGL || reducedMotion) {
    return <BlobFallback />;
  }

  return (
    <WebGLErrorBoundary>
      <div className="relative w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[620px] lg:h-[620px] select-none">
        {/* Soft background glow halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/25 via-purple-600/35 to-pink-500/25 blur-3xl pointer-events-none -z-10" />

        <Suspense fallback={<BlobFallback />}>
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            dpr={[1, 2]}
            className="w-full h-full pointer-events-none"
          >
            {/* Multi-point vibrant iridescent lighting */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 8, 5]} intensity={2.5} color="#38bdf8" />
            <pointLight position={[-6, -4, 4]} intensity={4.5} color="#ec4899" />
            <pointLight position={[6, -5, -4]} intensity={5.0} color="#8b5cf6" />
            <pointLight position={[0, 6, -3]} intensity={3.5} color="#c084fc" />
            <pointLight position={[-4, 4, 3]} intensity={2.8} color="#00f2fe" />

            <IridescentBlobMesh />
          </Canvas>
        </Suspense>
      </div>
    </WebGLErrorBoundary>
  );
}

