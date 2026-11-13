"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type Mesh } from "three";

/** Soft water + light only — lotus art is SVG overlay. */
export function LotusWater3D({ bloom, cameraPull }: { bloom: number; cameraPull: number }) {
  const ripples = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mesh = ripples.current;
    if (mesh) {
      mesh.rotation.z = t * 0.06;
      mesh.scale.setScalar(1 + bloom * 0.08 + cameraPull * 0.05);
    }
  });

  return (
    <>
      <color attach="background" args={["#f7f5f4"]} />
      <fog attach="fog" args={["#e8e2ec", 8, 22]} />
      <ambientLight intensity={0.92} />
      <directionalLight position={[2, 10, 5]} intensity={0.55} />
      <pointLight position={[-3, 2, 2]} intensity={0.35} color="#f0e8f4" />

      <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.2, 64]} />
        <meshPhysicalMaterial color="#b8d4be" roughness={0.18} metalness={0.05} clearcoat={0.35} reflectivity={0.4} />
      </mesh>

      <mesh ref={ripples} position={[0, -0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 2.4, 64]} />
        <meshStandardMaterial color="#d4e8da" transparent opacity={0.35 + bloom * 0.2} roughness={0.4} />
      </mesh>
    </>
  );
}
