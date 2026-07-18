/**
 * ATUL1Spaceship — Detailed Procedural Spaceship
 *
 * Builds a detailed sci-fi research vessel declaratively.
 * Includes: main hull, command bridge, engine nacelles, antennae,
 * navigation lights, and engine glow.
 */

'use client';

import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ATUL1Spaceship({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0005) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main Hull */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[2, 2.5, 12, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Command Bridge */}
      <mesh position={[0, 1.8, 0]} scale={[1, 0.6, 1.2]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Bridge Windows */}
      <mesh position={[0, 1.8, 1]}>
        <torusGeometry args={[1.2, 0.1, 8, 24]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} />
      </mesh>

      {/* Left Engine Nacelle */}
      <mesh position={[-2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.5, 4, 8]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Right Engine Nacelle */}
      <mesh position={[2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.5, 4, 8]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Left Engine Glow */}
      <mesh position={[-4, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[0.35, 16]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.8} />
      </mesh>

      {/* Right Engine Glow */}
      <mesh position={[4, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <circleGeometry args={[0.35, 16]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.8} />
      </mesh>

      {/* Antenna Array */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 4]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.5} />
      </mesh>

      {/* Navigation Lights */}
      {([[-1.5, 0, 5], [1.5, 0, 5], [-1.5, 0, -5], [1.5, 0, -5]] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#22C55E" />
        </mesh>
      ))}

      {/* Surface Panels */}
      {[-3, -1.5, 0, 1.5, 3].map((x, i) => (
        <mesh key={i} position={[x, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.5, 0.1, 1]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}