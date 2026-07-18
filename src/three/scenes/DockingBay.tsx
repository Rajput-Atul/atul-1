/**
 * DockingBay — Animated Docking Bay Interior
 *
 * Large-scale docking bay with opening doors,
 * holographic indicators, and atmospheric lighting.
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DockingBay() {
  const doorsRef = useRef<THREE.Group>(null);
  const lightsRef = useRef<THREE.Group>(null);

  const { leftDoor, rightDoor, indicators } = useMemo(() => {
    const leftDoor = new THREE.Mesh(
      new THREE.BoxGeometry(15, 12, 1),
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    leftDoor.position.set(-7.5, 0, 0);

    const rightDoor = new THREE.Mesh(
      new THREE.BoxGeometry(15, 12, 1),
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    rightDoor.position.set(7.5, 0, 0);

    // Holographic indicators
    const indicators = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const indicator = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 0.3),
        new THREE.MeshBasicMaterial({
          color: '#3B82F6',
          transparent: true,
          opacity: 0.6,
        })
      );
      indicator.position.set(0, -5 + i * 2, 0.1);
      indicators.add(indicator);
    }

    return { leftDoor, rightDoor, indicators };
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    // Animate doors opening
    if (doorsRef.current) {
      const openProgress = Math.min(elapsed / 5, 1);
      doorsRef.current.children[0].position.x = -7.5 - openProgress * 5;
      doorsRef.current.children[1].position.x = 7.5 + openProgress * 5;
    }

    // Animate indicators
    if (lightsRef.current) {
      lightsRef.current.children.forEach((child, i) => {
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
      <group ref={doorsRef}>
        <primitive object={leftDoor} />
        <primitive object={rightDoor} />
      </group>

      {/* Holographic Indicators */}
      <group ref={lightsRef}>
        <primitive object={indicators} />
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