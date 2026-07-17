/**
 * EngineFlame — Engine Exhaust Particle System
 *
 * Creates engine thrust particles using custom shader.
 * No downloads required.
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EngineFlameProps {
  count?: number;
  length?: number;
  color?: THREE.ColorRepresentation;
}

export default function EngineFlame({ count = 100, length = 5, color = '#3B82F6' }: EngineFlameProps) {
  const meshRef = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const lifetimes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = -Math.random() * length;

      velocities[i3] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 2] = Math.random() * 2 + 1;

      lifetimes[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('lifetime', new THREE.BufferAttribute(lifetimes, 1));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.3,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.8,
    });

    return new THREE.Points(geometry, material);
  }, [count, length, color]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    const array = positions.array as Float32Array;
    const lifetimes = meshRef.current.geometry.getAttribute('lifetime') as THREE.BufferAttribute;
    const lifeArray = lifetimes.array as Float32Array;
    const velocities = meshRef.current.geometry.getAttribute('velocity') as THREE.BufferAttribute;
    const velArray = velocities.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      lifeArray[i] += delta * 0.8;

      if (lifeArray[i] >= 1) {
        lifeArray[i] = 0;
        array[i3] = (Math.random() - 0.5) * 0.5;
        array[i3 + 1] = (Math.random() - 0.5) * 0.5;
        array[i3 + 2] = 0;
      } else {
        array[i3] += velArray[i3] * delta;
        array[i3 + 1] += velArray[i3 + 1] * delta;
        array[i3 + 2] += velArray[i3 + 2] * delta;
      }
    }

    positions.needsUpdate = true;
    lifetimes.needsUpdate = true;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return <primitive ref={meshRef} object={particles} />;
}