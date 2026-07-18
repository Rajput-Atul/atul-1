/**
 * ATUL1Spaceship — Detailed Procedural Spaceship
 *
 * Builds a detailed sci-fi research vessel procedurally.
 * Includes: main hull, command bridge, engine nacelles, antennae,
 * navigation lights, and surface details.
 */

'use client';

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ATUL1SpaceshipProps {
  position?: [number, number, number];
  scale?: number;
}

export default function ATUL1Spaceship({ position = [0, 0, 0], scale = 1 }: ATUL1SpaceshipProps) {
  const ship = useMemo(() => {
    const group = new THREE.Group();

    // Main Hull
    const hullGeometry = new THREE.CylinderGeometry(2, 2.5, 12, 8);
    const hullMaterial = new THREE.MeshStandardMaterial({
      color: '#1a1a2e',
      metalness: 0.8,
      roughness: 0.3,
    });
    const hull = new THREE.Mesh(hullGeometry, hullMaterial);
    hull.rotation.z = Math.PI / 2;
    group.add(hull);

    // Command Bridge
    const bridgeGeometry = new THREE.SphereGeometry(1.5, 16, 16);
    const bridge = new THREE.Mesh(bridgeGeometry, hullMaterial);
    bridge.position.set(0, 1.8, 0);
    bridge.scale.set(1, 0.6, 1.2);
    group.add(bridge);

    // Bridge Windows
    const windowGeometry = new THREE.TorusGeometry(1.2, 0.1, 8, 24);
    const windowMaterial = new THREE.MeshBasicMaterial({
      color: '#3B82F6',
      transparent: true,
      opacity: 0.6,
    });
    const windows = new THREE.Mesh(windowGeometry, windowMaterial);
    windows.position.set(0, 1.8, 1);
    group.add(windows);

    // Engine Nacelles (left)
    const nacelleGeometry = new THREE.CylinderGeometry(0.4, 0.5, 4, 8);
    const nacelleMaterial = new THREE.MeshStandardMaterial({
      color: '#2a2a3e',
      metalness: 0.9,
      roughness: 0.2,
    });
    const leftNacelle = new THREE.Mesh(nacelleGeometry, nacelleMaterial);
    leftNacelle.position.set(-2.5, 0, 0);
    leftNacelle.rotation.z = Math.PI / 2;
    group.add(leftNacelle);

    // Right Nacelle
    const rightNacelle = new THREE.Mesh(nacelleGeometry, nacelleMaterial);
    rightNacelle.position.set(2.5, 0, 0);
    rightNacelle.rotation.z = Math.PI / 2;
    group.add(rightNacelle);

    // Engine Glow
    const engineGlowGeometry = new THREE.CircleGeometry(0.35, 16);
    const engineGlowMaterial = new THREE.MeshBasicMaterial({
      color: '#06B6D4',
      transparent: true,
      opacity: 0.8,
    });
    const leftEngineGlow = new THREE.Mesh(engineGlowGeometry, engineGlowMaterial);
    leftEngineGlow.position.set(-4, 0, 0);
    leftEngineGlow.rotation.y = -Math.PI / 2;
    group.add(leftEngineGlow);

    const rightEngineGlow = new THREE.Mesh(engineGlowGeometry, engineGlowMaterial);
    rightEngineGlow.position.set(4, 0, 0);
    rightEngineGlow.rotation.y = Math.PI / 2;
    group.add(rightEngineGlow);

    // Antenna Array
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 4);
    const antennaMaterial = new THREE.MeshStandardMaterial({
      color: '#3B82F6',
      emissive: '#3B82F6',
      emissiveIntensity: 0.5,
    });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.set(0, 3, 0);
    group.add(antenna);

    // Navigation Lights
    const navLightGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const navLightMaterial = new THREE.MeshBasicMaterial({ color: '#22C55E' });
    const navLightPositions: [number, number, number][] = [
      [-1.5, 0, 5],
      [1.5, 0, 5],
      [-1.5, 0, -5],
      [1.5, 0, -5],
    ];
    navLightPositions.forEach((pos) => {
      const light = new THREE.Mesh(navLightGeometry, navLightMaterial);
      light.position.set(...pos);
      group.add(light);
    });

    // Surface Details - Panels
    const panelGeometry = new THREE.BoxGeometry(0.5, 0.1, 1);
    const panelMaterial = new THREE.MeshStandardMaterial({
      color: '#2a2a3e',
      metalness: 0.5,
      roughness: 0.5,
    });
    for (let i = -3; i <= 3; i += 1.5) {
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      panel.position.set(i, 2.2, 0);
      panel.rotation.y = Math.PI / 2;
      group.add(panel);
    }

    return group;
  }, []);

  useFrame(() => {
    // Subtle hover animation
    ship.position.y = position[1] + Math.sin(Date.now() * 0.0005) * 0.2;
  });

  return <primitive object={ship} position={position} scale={scale} />;
}