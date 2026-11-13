"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, type Mesh } from "three";

function SoftOrb({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.55, 24, 24]} />
      <meshStandardMaterial color={color} transparent opacity={0.22} roughness={1} />
    </mesh>
  );
}

export function ScrollBackdrop3D({ progress }: { progress: number }) {
  const { camera } = useThree();
  const petalRef = useRef<Mesh>(null);
  const hues = useMemo(() => ["#f3d4e0", "#e8dcee", "#dceee2"], []);

  useFrame((state) => {
    const p = progress;
    camera.position.z = 6.2 - p * 4.8;
    camera.position.y = 0.3 + Math.sin(p * Math.PI) * 0.25;
    camera.lookAt(0, 0.15, 0);

    const mesh = petalRef.current;
    if (mesh) {
      mesh.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <>
      <color attach="background" args={["#f4efe8"]} />
      <fog attach="fog" args={["#efe8f2", 5, 18]} />
      <ambientLight intensity={0.95} />
      <directionalLight position={[3, 6, 4]} intensity={0.65} color="#ffffff" />
      <SoftOrb position={[-2.2, 1.2, -2]} color={hues[0]!} />
      <SoftOrb position={[2.4, 0.4, -1.5]} color={hues[1]!} />
      <SoftOrb position={[0, -0.8, -2.5]} color={hues[2]!} />
      <mesh ref={petalRef} position={[0, 0.6, -1.2]} rotation={[-0.4, 0, 0]}>
        <planeGeometry args={[2.8, 2.8]} />
        <meshStandardMaterial color="#ead9e4" transparent opacity={0.35} side={DoubleSide} />
      </mesh>
      <mesh position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5, 48]} />
        <meshStandardMaterial color="#e9e2ec" roughness={0.95} />
      </mesh>
    </>
  );
}
