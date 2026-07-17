/**
 * FogEffect — Atmospheric Fog
 *
 * Creates volumetric fog effect using Three.js fog and particles.
 */

'use client';

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FogEffectProps {
  color?: THREE.ColorRepresentation;
  density?: number;
  height?: number;
  radius?: number;
}

export default function FogEffect({ color = '#3B82F6', density = 0.02, height = 50, radius = 100 }: FogEffectProps) {
  const particles = useMemo(() => {
    const count = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * height;
      positions[i3 + 2] = (Math.random() - 0.5) * radius;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.15,
    });

    return new THREE.Points(geometry, material);
  }, [color, height, radius]);

  useFrame((_, delta) => {
    particles.rotation.y += delta * 0.005;
  });

  return <primitive object={particles} />;
}