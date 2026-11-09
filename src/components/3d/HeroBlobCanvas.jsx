import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BlobFallback from "./BlobFallback";

// Check if WebGL is supported
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Custom Iridescent Organic Blob Shaders
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  // Classic Perlin 3D Noise by Stefan Gustavson
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vNormal = normal;

    // Multi-frequency organic deformation resembling a blooming iridescent liquid flower
    float theta = atan(position.y, position.x);
    float petalEffect = sin(theta * 5.0 + uTime * 0.4) * 0.18;
    
    vec3 noiseCoord = position * 0.75 + vec3(uTime * 0.15, uTime * 0.12, uTime * 0.09);
    float noise1 = snoise(noiseCoord);
    float noise2 = snoise(noiseCoord * 1.8 + vec3(uMouse * 0.5, 0.0)) * 0.5;
    
    float displacement = (noise1 + noise2 + petalEffect) * 0.42;
    vDisplacement = displacement;

    // Displace vertex along its normal
    vec3 newPosition = position + normal * displacement;
    vPosition = newPosition;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    // Normal in eye space approximation
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(-vPosition);

    // Fresnel rim effect
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.4);

    // Deep iridescent palette — rich dark jewel tones matching the reference artwork
    vec3 colorDeepBlue   = vec3(0.04, 0.10, 0.70);   // deep electric cobalt
    vec3 colorRoyalPurple= vec3(0.38, 0.05, 0.75);   // rich royal violet
    vec3 colorViolet     = vec3(0.60, 0.08, 0.90);   // vivid neon violet
    vec3 colorMagenta    = vec3(0.82, 0.10, 0.60);   // hot magenta/pink
    vec3 colorCyanSheen  = vec3(0.10, 0.60, 0.95);   // iridescent cyan rim
    vec3 colorCore       = vec3(0.03, 0.02, 0.12);   // near-black obsidian core

    // Animate colour mixing over time and displacement
    float t = sin(vPosition.x * 1.8 + vPosition.y * 1.4 + uTime * 0.55) * 0.5 + 0.5;
    float t2 = sin(vPosition.z * 1.3 - vPosition.x * 1.1 + uTime * 0.38) * 0.5 + 0.5;

    vec3 baseColor = mix(colorDeepBlue, colorRoyalPurple, t);
    baseColor = mix(baseColor, colorViolet, t2 * 0.7);
    baseColor = mix(baseColor, colorMagenta, smoothstep(0.0, 0.5, vDisplacement));
    baseColor = mix(baseColor, colorCore, 0.12);

    // Glossy specular highlights
    vec3 lightDir1 = normalize(vec3(1.2, 1.8, 2.0));
    vec3 halfVec1 = normalize(lightDir1 + viewDir);
    float spec1 = pow(max(dot(normal, halfVec1), 0.0), 64.0);

    vec3 lightDir2 = normalize(vec3(-1.5, -0.8, 1.0));
    vec3 halfVec2 = normalize(lightDir2 + viewDir);
    float spec2 = pow(max(dot(normal, halfVec2), 0.0), 36.0);

    // Combine: base + cyan iridescent rim + hot specular
    vec3 finalColor = baseColor;
    finalColor += colorCyanSheen * fresnel * 0.70;
    finalColor += colorMagenta   * fresnel * 0.35;
    finalColor += vec3(0.9, 0.8, 1.0) * spec1 * 0.65;   // cool white highlight
    finalColor += colorCyanSheen       * spec2 * 0.30;

    // Keep mostly opaque, slight edge fade
    float alpha = 0.97 + fresnel * 0.03;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function HeroBlobCanvas() {
  const containerRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.3;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Geometry & Shader Material
    // High-density icosahedron gives a super smooth organic fluid contour
    const geometry = new THREE.IcosahedronGeometry(1.48, 64);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 3. Mouse Interaction (smooth lerp)
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouse.x = x;
      targetMouse.y = y;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 4. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;

      // Lerp mouse
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;
      material.uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);

      // Organic rotation
      mesh.rotation.y = elapsedTime * 0.18 + currentMouse.x * 0.45;
      mesh.rotation.x = Math.sin(elapsedTime * 0.12) * 0.2 + -currentMouse.y * 0.35;
      mesh.rotation.z = Math.cos(elapsedTime * 0.15) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // 5. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 6. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!hasWebGL) {
    return <BlobFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
      aria-label="Iridescent 3D organic fluid blob"
    />
  );
}
