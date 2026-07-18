/**
 * Starfield — Procedural Star Generation
 *
 * Creates a dense starfield using THREE.Points.
 * Millions of stars with excellent performance.
 * No downloads required.
 */

'use client';

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarfieldProps {
  count?: number;
  radius?: number;
  size?: number;
  color?: THREE.ColorRepresentation;
}

export default function Starfield({ count = 15000, radius = 1000, size = 1.5, color }: StarfieldProps) {
  const stars = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = radius * (0.5 + Math.random() * 0.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        colors[i3] = 1; colors[i3 + 1] = 1; colors[i3 + 2] = 1;
      } else if (colorChoice < 0.85) {
        colors[i3] = 0.7; colors[i3 + 1] = 0.8; colors[i3 + 2] = 1;
      } else {
        colors[i3] = 1; colors[i3 + 1] = 0.95; colors[i3 + 2] = 0.8;
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size,
      sizeAttenuation: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.9,
      color: color ? new THREE.Color(color) : new THREE.Color('#ffffff'),
    });

    return new THREE.Points(geometry, material);
  }, [count, radius, size, color]);

  useFrame((_, delta) => {
    stars.rotation.y += delta * 0.005;
    stars.rotation.x += delta * 0.002;
  });

  return <primitive object={stars} />;
}