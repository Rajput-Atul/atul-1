/**
 * DockingBay — Animated Docking Bay Interior
 *
 * Large-scale docking bay with opening doors,
 * holographic indicators, and atmospheric lighting.
 */

'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DockingBay() {
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);
  const indicatorsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const openProgress = Math.min(elapsed / 5, 1);

    if (leftDoorRef.current) {
      leftDoorRef.current.position.x = -7.5 - openProgress * 5;
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.position.x = 7.5 + openProgress * 5;
    }

    if (indicatorsRef.current) {
      indicatorsRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = 0.3 + Math.sin(elapsed * 2 + i) * 0.3;
        }
      });
    }
  });

  return (
    <group>
      {/* Bay Structure */}
      <mesh position={[0, 0, -20]}>
        <boxGeometry args={[40, 20, 20]} />
        <meshStandardMaterial color="#0a0a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Floor Grid */}
      <mesh position={[0, -10, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.1} />
      </mesh>

      {/* Docking Bay Doors */}
      <mesh ref={leftDoorRef} position={[-7.5, 0, 0]}>
        <boxGeometry args={[15, 12, 1]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh ref={rightDoorRef} position={[7.5, 0, 0]}>
        <boxGeometry args={[15, 12, 1]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Holographic Indicators */}
      <group ref={indicatorsRef}>
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[0, -5 + i * 2, 0.1]}>
            <planeGeometry args={[2, 0.3]} />
            <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* Energy Lines */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0, -8 + i * 4, -10]}>
          <cylinderGeometry args={[0.1, 0.1, 30, 8]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}