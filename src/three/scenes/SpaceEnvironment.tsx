/**
 * SpaceEnvironment — Complete Space Scene
 *
 * Combines all procedural space effects into one reusable scene.
 * Includes: starfield, nebula, galaxy, asteroid field, fog, and lighting.
 */

'use client';

import React from 'react';
import Starfield from '@/three/particles/Starfield';
import Nebula from '@/three/particles/Nebula';
import Galaxy from '@/three/particles/Galaxy';
import AsteroidField from '@/three/objects/AsteroidField';
import FogEffect from '@/three/effects/FogEffect';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface SpaceEnvironmentProps {
  showStars?: boolean;
  showNebula?: boolean;
  showGalaxy?: boolean;
  showAsteroids?: boolean;
  showFog?: boolean;
}

export default function SpaceEnvironment({
  showStars = true,
  showNebula = true,
  showGalaxy = false,
  showAsteroids = false,
  showFog = true,
}: SpaceEnvironmentProps) {
  const { scene } = useThree();

  // Set up scene lighting
  React.useEffect(() => {
    scene.background = new THREE.Color('#020617');
    scene.fog = new THREE.FogExp2('#020617', 0.002);

    const ambientLight = new THREE.AmbientLight('#1E293B', 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('#3B82F6', 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight('#06B6D4', 1, 100);
    pointLight.position.set(-10, 5, -10);
    scene.add(pointLight);
  }, [scene]);

  return (
    <group>
      {showStars && <Starfield count={15000} radius={1000} size={1.5} />}
      {showNebula && <Nebula count={20} radius={800} />}
      {showGalaxy && <Galaxy count={50000} radius={5} branches={3} />}
      {showAsteroids && <AsteroidField count={200} radius={400} />}
      {showFog && <FogEffect color="#3B82F6" density={0.02} height={50} radius={100} />}
    </group>
  );
}