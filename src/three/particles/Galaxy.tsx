/**
 * Galaxy — Procedural Spiral Galaxy Generation
 *
 * Creates a mathematically-generated spiral galaxy.
 * No downloads required.
 */

'use client';

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GalaxyProps {
  count?: number;
  radius?: number;
  branches?: number;
  spin?: number;
  randomness?: number;
  randomnessPower?: number;
  insideColor?: THREE.ColorRepresentation;
  outsideColor?: THREE.ColorRepresentation;
}

export default function Galaxy({
  count = 50000,
  radius = 5,
  branches = 3,
  spin = 1,
  randomness = 0.5,
  randomnessPower = 3,
  insideColor = '#ff6030',
  outsideColor = '#1b3984',
}: GalaxyProps) {
  const galaxy = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const insideColorObj = new THREE.Color(insideColor);
    const outsideColorObj = new THREE.Color(outsideColor);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * radius;
      const spinAngle = r * spin;
      const branchAngle = (i % branches) / branches * Math.PI * 2;

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r * 0.3;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const mixedColor = insideColorObj.clone();
      mixedColor.lerp(outsideColorObj, r / radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    return points;
  }, [count, radius, branches, spin, randomness, randomnessPower, insideColor, outsideColor]);

  useFrame((_, delta) => {
    galaxy.rotation.y += delta * 0.02;
  });

  return <primitive object={galaxy} />;
}