/**
 * ShipInterior — ATUL-1 Command Bridge
 *
 * Detailed ship interior with holographic screens,
 * energy conduits, and atmospheric lighting.
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ShipInterior() {
  const screensRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const { screens, core, conduits } = useMemo(() => {
    // Holographic Screens
    const screens = new THREE.Group();
    const screenGeom = new THREE.PlaneGeometry(4, 3);

    for (let i = 0; i < 3; i++) {
      const screenMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uIndex: { value: i },
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
          uniform float uIndex;
          varying vec2 vUv;

          void main() {
            float scanline = sin(vUv.y * 50.0 + uTime * 2.0) * 0.1 + 0.9;
            float grid = step(0.95, fract(vUv.x * 20.0)) * 0.3;
            float alpha = 0.2 + scanline * 0.1 + grid;
            vec3 color = mix(vec3(0.23, 0.51, 0.96), vec3(0.02, 0.71, 0.83), uIndex / 3.0);
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });

      const screen = new THREE.Mesh(screenGeom, screenMat);
      screen.position.set(-6 + i * 6, 3, -15);
      screens.add(screen);
    }

    // AI Core
    const coreGeom = new THREE.IcosahedronGeometry(2, 2);
    const coreMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
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
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float pulse = 0.5 + sin(uTime * 2.0) * 0.3;
          float fresnel = pow(1.0 - abs(vNormal.z), 2.0);
          vec3 color = mix(vec3(0.23, 0.51, 0.96), vec3(0.02, 0.71, 0.83), fresnel);
          gl_FragColor = vec4(color, fresnel * pulse);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const core = new THREE.Mesh(coreGeom, coreMat);
    core.position.set(0, 0, -20);

    // Energy Conduits
    const conduits = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const conduitGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-10 + i * 2.5, 8, -10),
          new THREE.Vector3(-10 + i * 2.5, 6, -15),
          new THREE.Vector3(-10 + i * 2.5, 4, -20),
        ]),
        20,
        0.1,
        8,
        false
      );
      const conduitMat = new THREE.MeshBasicMaterial({
        color: '#3B82F6',
        transparent: true,
        opacity: 0.4,
      });
      const conduit = new THREE.Mesh(conduitGeom, conduitMat);
      conduits.add(conduit);
    }

    return { screens, core, conduits };
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    // Update screen shaders
    if (screensRef.current) {
      screensRef.current.children.forEach((child: any) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
          child.material.uniforms.uTime.value = elapsed;
        }
      });
    }

    // Update core shader
    if (coreRef.current && coreRef.current.material instanceof THREE.ShaderMaterial) {
      coreRef.current.material.uniforms.uTime.value = elapsed;
    }
  });

  return (
    <group>
      {/* Room Structure */}
      <mesh position={[0, 0, -20]}>
        <boxGeometry args={[50, 20, 40]} />
        <meshStandardMaterial color="#050510" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -10, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 40]} />
        <meshStandardMaterial color="#0a0a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Holographic Screens */}
      <group ref={screensRef}>
        <primitive object={screens} />
      </group>

      {/* AI Core */}
      <mesh ref={coreRef}>
        <primitive object={core} />
      </mesh>

      {/* Energy Conduits */}
      <primitive object={conduits} />

      {/* Ambient Particles */}
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 40, Math.random() * 10 - 5, -10 + Math.random() * -20]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}