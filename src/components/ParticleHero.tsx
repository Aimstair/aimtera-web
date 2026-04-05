import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;

const Particles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 12;
      pos[i3 + 2] = (Math.random() - 0.5) * 8;
      vel[i3] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      s[i] = Math.random() * 2 + 0.5;
    }
    return s;
  }, []);

  const handlePointerMove = useCallback(
    (e: any) => {
      if (e.pointer) {
        mouseRef.current = { x: e.pointer.x * viewport.width * 0.5, y: e.pointer.y * viewport.height * 0.5 };
      }
    },
    [viewport]
  );

  useFrame(() => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];

      const dx = arr[i3] - mx;
      const dy = arr[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.01;
        arr[i3] += dx * force;
        arr[i3 + 1] += dy * force;
      }

      if (arr[i3] > 10) arr[i3] = -10;
      if (arr[i3] < -10) arr[i3] = 10;
      if (arr[i3 + 1] > 6) arr[i3 + 1] = -6;
      if (arr[i3 + 1] < -6) arr[i3 + 1] = 6;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef} onPointerMove={handlePointerMove}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={PARTICLE_COUNT} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ffffff" transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
};

const ConnectionLines = () => {
  const lineRef = useRef<THREE.LineSegments>(null);
  const { scene } = useThree();

  useFrame(() => {
    if (!lineRef.current) return;
    const points = scene.children.find((c) => c.type === "Points") as THREE.Points | undefined;
    if (!points) return;

    const posArr = (points.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const linePositions: number[] = [];
    const maxDist = 2;

    for (let i = 0; i < Math.min(PARTICLE_COUNT, 200); i++) {
      for (let j = i + 1; j < Math.min(PARTICLE_COUNT, 200); j++) {
        const dx = posArr[i * 3] - posArr[j * 3];
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          linePositions.push(
            posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2],
            posArr[j * 3], posArr[j * 3 + 1], posArr[j * 3 + 2]
          );
        }
      }
    }

    const geo = lineRef.current.geometry;
    geo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#ffffff" transparent opacity={0.08} />
    </lineSegments>
  );
};

const ParticleHero = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Particles />
        <ConnectionLines />
      </Canvas>
    </div>
  );
};

export default ParticleHero;
