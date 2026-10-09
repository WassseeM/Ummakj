"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Building() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.18;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.18;
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
  });

  const wire = {
    color: "#C7A27C",
    wireframe: true,
    transparent: true,
    opacity: 0.5
  } as const;

  return (
    <group ref={group} rotation={[0.2, 0.4, 0]}>
      <mesh>
        <boxGeometry args={[2.1, 2.5, 2.1]} />
        <meshBasicMaterial {...wire} />
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <coneGeometry args={[1.5, 1.1, 4]} />
        <meshBasicMaterial {...wire} opacity={0.4} />
      </mesh>
      <mesh position={[0, 0.55, 0]} scale={[0.72, 0.34, 0.72]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial {...wire} opacity={0.3} />
      </mesh>
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[3.1, 0.22, 3.1]} />
        <meshBasicMaterial {...wire} opacity={0.6} />
      </mesh>
      <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.2, 48]} />
        <meshBasicMaterial color="#C7A27C" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

export default function WireScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [4.6, 3.4, 4.6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Building />
      </Suspense>
    </Canvas>
  );
}
