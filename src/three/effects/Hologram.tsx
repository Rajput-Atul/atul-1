/**
 * Hologram — Holographic Effect
 *
 * Creates a holographic projection effect using transparent planes
 * and custom shader material with additive blending.
 */

'use client';

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HologramProps {
  width?: number;
  height?: number;
  color?: THREE.ColorRepresentation;
  opacity?: number;
}

export default function Hologram({ width = 2, height = 3, color = '#3B82F6', opacity = 0.5 }: HologramProps) {
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
          float scanline = sin(vUv.y * 100.0 + uTime * 2.0) * 0.1 + 0.9;
          float flicker = sin(uTime * 10.0) * 0.05 + 0.95;
          float alpha = uOpacity * scanline * flicker;

          // Edge glow
          float edge = 1.0 - abs(vUv.x - 0.5) * 2.0;
          edge *= 1.0 - abs(vUv.y - 0.5) * 2.0;

          gl_FragColor = vec4(uColor, alpha * edge);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [color, opacity]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}