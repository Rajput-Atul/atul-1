/**
 * EngineExhaust — Thruster Particle System
 *
 * Creates dynamic engine exhaust with expanding plasma
 * and heat distortion effect.
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EngineExhaustProps {
  position?: [number, number, number];
  color?: THREE.ColorRepresentation;
}

export default function EngineExhaust({ position = [0, 0, 0], color = '#06B6D4' }: EngineExhaustProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry } = useMemo(() => {
    const count = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;

      velocities[i3] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 1] = Math.random() * 0.1;
      velocities[i3 + 2] = Math.random() * -2 - 1;

      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return { geometry };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.getAttribute('position') as unknown as THREE.BufferAttribute;
    const velocities = pointsRef.current.geometry.getAttribute('velocity') as unknown as THREE.BufferAttribute;
    const posArray = positions.array as Float32Array;
    const velArray = velocities.array as Float32Array;

    for (let i = 0; i < posArray.length / 3; i++) {
      const i3 = i * 3;
      posArray[i3] += velArray[i3] * delta;
      posArray[i3 + 1] += velArray[i3 + 1] * delta;
      posArray[i3 + 2] += velArray[i3 + 2] * delta;

      // Reset particles that go too far
      if (posArray[i3 + 2] < -10) {
        posArray[i3] = 0;
        posArray[i3 + 1] = 0;
        posArray[i3 + 2] = 0;
      }
    }

    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial
        size={0.3}
        sizeAttenuation
        color={color}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}