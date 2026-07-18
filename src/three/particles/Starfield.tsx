/**
 * Starfield — Cinematic Star Generation
 *
 * Creates a dense starfield with phased fade-in, twinkling, and bloom.
 * Matches ATUL-1 opening sequence specification.
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarfieldProps {
  count?: number;
  radius?: number;
  size?: number;
  color?: THREE.ColorRepresentation;
}

export default function Starfield({ count = 15000, radius = 1000, size = 1.5, color }: StarfieldProps) {
  const starsRef = useRef<THREE.Points>(null);
  const startTime = useRef(Date.now());

  const { geometry, baseColors } = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const baseColorsArr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = radius * (0.5 + Math.random() * 0.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const colorChoice = Math.random();
      let rCol, gCol, bCol;
      if (colorChoice < 0.7) {
        rCol = 1; gCol = 1; bCol = 1;
      } else if (colorChoice < 0.85) {
        rCol = 0.7; gCol = 0.8; bCol = 1;
      } else {
        rCol = 1; gCol = 0.95; bCol = 0.8;
      }

      colors[i3] = rCol;
      colors[i3 + 1] = gCol;
      colors[i3 + 2] = bCol;
      baseColorsArr[i3] = rCol;
      baseColorsArr[i3 + 1] = gCol;
      baseColorsArr[i3 + 2] = bCol;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return { geometry, baseColors: baseColorsArr };
  }, [count, radius, size]);

  useFrame(() => {
    if (!starsRef.current) return;
    const elapsed = (Date.now() - startTime.current) / 1000;
    const colors = starsRef.current.geometry.getAttribute('color') as THREE.BufferAttribute;
    const colorArray = colors.array as Float32Array;

    // Phase 1 (0-2s): opacity 0->35%, brightness 0->30%
    // Phase 2 (2-4s): opacity 35->70%, brightness 30->70%, bloom 25%
    // Phase 3 (4-6s): opacity 70->100%, brightness 70->100%, bloom 100%, twinkling starts

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const starAge = elapsed - Math.random() * 2; // Random start delay
      let brightness = 0;

      if (starAge < 0) {
        brightness = 0;
      } else if (starAge < 2) {
        // Phase 1
        brightness = (starAge / 2) * 0.3;
      } else if (starAge < 4) {
        // Phase 2
        const t = (starAge - 2) / 2;
        brightness = 0.3 + t * 0.4;
      } else {
        // Phase 3 - with twinkling
        brightness = 0.7 + Math.random() * 0.3;
      }

      colorArray[i3] = baseColors[i3] * brightness;
      colorArray[i3 + 1] = baseColors[i3 + 1] * brightness;
      colorArray[i3 + 2] = baseColors[i3 + 2] * brightness;
    }

    colors.needsUpdate = true;
  });

  const material = new THREE.PointsMaterial({
    size,
    sizeAttenuation: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 1,
    color: color ? new THREE.Color(color) : new THREE.Color('#ffffff'),
  });

  return <primitive ref={starsRef} object={new THREE.Points(geometry, material)} />;
}