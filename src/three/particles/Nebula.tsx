/**
 * Nebula — Procedural Nebula Generation
 *
 * Creates atmospheric nebula clouds using billboard planes and shaders.
 * No downloads required.
 */

'use client';

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NebulaProps {
  count?: number;
  radius?: number;
  color?: THREE.ColorRepresentation;
}

export default function Nebula({ count = 20, radius = 800, color = '#3B82F6' }: NebulaProps) {
  const clouds = useMemo(() => {
    const group = new THREE.Group();

    for (let i = 0; i < count; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      // Generate soft cloud texture
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        material
      );

      mesh.position.set(
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius * 0.5,
        (Math.random() - 0.5) * radius
      );

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.userData = {
        speed: Math.random() * 0.1 + 0.05,
        amplitude: Math.random() * 10 + 5,
      };

      group.add(mesh);
    }

    return group;
  }, [count, radius, color]);

  useFrame((_, delta) => {
    clouds.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        const userData = child.userData as { speed: number; amplitude: number };
        child.rotation.z += delta * userData.speed * 0.5;
        child.position.y += Math.sin(Date.now() * 0.001) * userData.amplitude * delta * 0.1;
      }
    });
  });

  return <primitive object={clouds} />;
}