/**
 * NovaHologram — AI Holographic Figure
 *
 * Creates a humanoid holographic figure with shader-based
 * materialization, glow, and particle aura.
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NovaHologram() {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          float fresnel = pow(1.0 - abs(vNormal.z), 3.0);
          float scanline = sin(vPosition.y * 30.0 + uTime * 3.0) * 0.1 + 0.9;
          float flicker = sin(uTime * 15.0) * 0.05 + 0.95;
          float alpha = fresnel * uProgress * scanline * flicker;

          vec3 color = mix(vec3(0.23, 0.51, 0.96), vec3(0.02, 0.71, 0.83), fresnel);

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    material.uniforms.uTime.value = elapsed;

    // Materialize over 3 seconds
    const progress = Math.min(elapsed / 3, 1);
    material.uniforms.uProgress.value = progress;
  });

  return (
    <mesh position={[0, 0, -10]}>
      <capsuleGeometry args={[1.2, 3, 8, 16]} />
      <primitive object={material} />
    </mesh>
  );
}