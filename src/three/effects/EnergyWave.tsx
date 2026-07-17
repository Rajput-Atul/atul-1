/**
 * EnergyWave — Energy Pulse / Shockwave Effect
 *
 * Creates expanding energy rings using custom shaders.
 * No downloads required.
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnergyWaveProps {
  color?: THREE.ColorRepresentation;
  speed?: number;
  maxRadius?: number;
  opacity?: number;
}

export default function EnergyWave({ color = '#3B82F6', speed = 2, maxRadius = 10, opacity = 0.5 }: EnergyWaveProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uOpacity: { value: opacity },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;

        void main() {
          float dist = distance(vUv, vec2(0.5));
          float ring = smoothstep(0.48, 0.5, dist) - smoothstep(0.5, 0.52, dist);
          float pulse = sin(uTime * 3.0) * 0.3 + 0.7;
          float alpha = ring * uOpacity * pulse;

          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [color, opacity]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const scale = (state.clock.elapsedTime * speed) % maxRadius;
      meshRef.current.scale.set(scale, scale, scale);
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.1, 1, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}