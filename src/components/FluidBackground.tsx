import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Fluid simulation shader
const fluidVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fluidFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uScrollSpeed;
  
  varying vec2 vUv;
  
  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    
    // Mouse influence
    vec2 mouseInfluence = (uMouse - 0.5) * 0.3;
    float mouseDistance = length((uv - 0.5) * aspect - mouseInfluence);
    float mouseEffect = smoothstep(0.5, 0.0, mouseDistance) * 0.3;
    
    // Create fluid motion
    float time = uTime * 0.15;
    float scrollInfluence = uScrollSpeed * 0.5;
    
    // Layer multiple noise frequencies
    float noise1 = snoise(vec3(uv * 2.0 + mouseInfluence, time)) * 0.5 + 0.5;
    float noise2 = snoise(vec3(uv * 4.0 - mouseInfluence * 0.5, time * 1.3)) * 0.5 + 0.5;
    float noise3 = snoise(vec3(uv * 8.0 + mouseInfluence * 0.3, time * 0.7)) * 0.5 + 0.5;
    
    // Combine noises
    float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
    combinedNoise += mouseEffect;
    combinedNoise += scrollInfluence * 0.1;
    
    // Color palette - dark void with subtle variations
    vec3 color1 = vec3(0.02, 0.02, 0.02); // Deep black
    vec3 color2 = vec3(0.05, 0.05, 0.06); // Slightly lighter
    vec3 color3 = vec3(0.08, 0.08, 0.09); // Even lighter
    vec3 accentColor = vec3(0.0, 1.0, 0.62); // Cyber green
    
    // Mix colors based on noise
    vec3 finalColor = mix(color1, color2, combinedNoise);
    finalColor = mix(finalColor, color3, noise2 * 0.3);
    
    // Add subtle accent glow in some areas
    float accentMask = smoothstep(0.7, 0.9, noise1 * noise2);
    finalColor += accentColor * accentMask * 0.03;
    
    // Vignette
    float vignette = 1.0 - length((uv - 0.5) * 1.2);
    vignette = smoothstep(0.0, 0.7, vignette);
    finalColor *= vignette * 0.7 + 0.3;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Particle field component
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;
  
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return [positions, velocities];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      positionArray[i * 3] += velocities[i * 3];
      positionArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionArray[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Wrap around
      if (Math.abs(positionArray[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(positionArray[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positionArray[i * 3 + 2]) > 10) velocities[i * 3 + 2] *= -1;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Fluid plane component
function FluidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollSpeedRef = useRef(0);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uScrollSpeed: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      };
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      scrollSpeedRef.current = Math.min(delta * 0.01, 1);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
        0.05
      );
      materialRef.current.uniforms.uScrollSpeed.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScrollSpeed.value,
        scrollSpeedRef.current,
        0.1
      );
    }
    
    // Decay scroll speed
    scrollSpeedRef.current *= 0.95;
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={fluidVertexShader}
        fragmentShader={fluidFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// Main fluid background component
export function FluidBackground() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
      >
        <FluidPlane />
        <ParticleField />
      </Canvas>
    </div>
  );
}

export default FluidBackground;
