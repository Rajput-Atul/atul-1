/**
 * AsteroidField — Procedural Asteroid Belt
 *
 * Creates an asteroid field by reusing 1-2 procedural asteroid geometries
 * with scaling, rotation, and random positioning.
 * Free models can replace procedural geometry later.
 */

'use client';

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidFieldProps {
  count?: number;
  radius?: number;
}

export default function AsteroidField({ count = 200, radius = 400 }: AsteroidFieldProps) {
  const asteroids = useMemo(() => {
    const group = new THREE.Group();

    // Create base asteroid geometry (dodecahedron with noise)
    const baseGeometry = new THREE.DodecahedronGeometry(1, 1);
    const positionsAttr = baseGeometry.getAttribute('position');
    const positions = positionsAttr.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const noise = (Math.random() - 0.5) * 0.3;
      positions[i] += noise;
      positions[i + 1] += noise;
      positions[i + 2] += noise;
    }
    baseGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    baseGeometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      color: '#6B7280',
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true,
    });

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(baseGeometry, material);
      const r = radius * (0.5 + Math.random() * 0.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      mesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      const scale = Math.random() * 2 + 0.5;
      mesh.scale.set(scale, scale * (0.5 + Math.random() * 0.5), scale);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

      mesh.userData = {
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
      };

      group.add(mesh);
    }

    return group;
  }, [count, radius]);

  useFrame((_, delta) => {
    asteroids.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        const userData = child.userData as { rotSpeed: { x: number; y: number; z: number } };
        child.rotation.x += userData.rotSpeed.x * delta * 10;
        child.rotation.y += userData.rotSpeed.y * delta * 10;
        child.rotation.z += userData.rotSpeed.z * delta * 10;
      }
    });
  });

  return <primitive object={asteroids} />;
}