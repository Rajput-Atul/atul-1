/**
 * VolumetricNebula — Layered Nebula with Animated Noise
 *
 * Creates volumetric cloud layers with drifting motion
 * and bloom interaction.
 */

'use client';

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VolumetricNebulaProps {
  count?: number;
  radius?: number;
}

export default function VolumetricNebula({ count = 5, radius = 800 }: VolumetricNebulaProps) {
  const nebula = useMemo(() => {
    const group = new THREE.Group();

    for (let i = 0; i < count; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      // Create noise-based texture
      const colors = [
        [0.23, 0.51, 0.96], // Blue #3B82F6
        [0.02, 0.71, 0.83], // Cyan #06B6D4
        [0.29, 0.0, 0.55], // Purple
        [0.15, 0.0, 0.40], // Deep blue
        [0.05, 0.15, 0.35], // Dark blue
      ];
      const color = colors[i % colors.length];

      // Generate Perlin-like noise pattern
      const imageData = ctx.createImageData(256, 256);
      const data = imageData.data;
      for (let p = 0; p < 256 * 256; p++) {
        const x = p % 256;
        const y = Math.floor(p / 256);
        const noise = Math.random() * 0.5 + 0.5;
        data[p * 4] = color[0] * 255 * noise;
        data[p * 4 + 1] = color[1] * 255 * noise;
        data[p * 4 + 2] = color[2] * 255 * noise;
        data[p * 4 + 3] = noise * 100;
      }
      ctx.putImageData(imageData, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), material);
      mesh.position.set(
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius * 0.3,
        (Math.random() - 0.5) * radius
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(mesh);
    }

    return group;
  }, [count, radius]);

  useFrame((_, delta) => {
    nebula.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.rotation.z += delta * 0.01;
        child.position.y += Math.sin(Date.now() * 0.0001) * 0.01;
      }
    });
  });

  return <primitive object={nebula} />;
}