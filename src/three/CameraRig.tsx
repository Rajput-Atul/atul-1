/**
 * CameraRig — Cinematic Camera Controller
 *
 * Uses GSAP to create smooth cinematic camera movements
 * through the ATUL-1 opening sequence.
 */

'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import gsap from 'gsap';

interface CameraRigProps {
  phase: 'black' | 'deep-space' | 'ship-reveal' | 'docking' | 'first-contact' | 'transition';
}

export default function CameraRig({ phase }: CameraRigProps) {
  const controlsRef = useRef<CameraControls>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;

    // Scene 1: Deep Space (wide view)
    if (phase === 'deep-space') {
      gsap.to(controls.camera.position, {
        x: 0,
        y: 0,
        z: 50,
        duration: 2,
        ease: 'power2.out',
      });
    }

    // Scene 2: Ship Reveal (camera moves toward ship)
    if (phase === 'ship-reveal') {
      gsap.to(controls.camera.position, {
        x: 0,
        y: 0,
        z: 10,
        duration: 3,
        ease: 'power2.inOut',
      });
    }

    // Scene 3: Docking Bay (enter ship)
    if (phase === 'docking') {
      gsap.to(controls.camera.position, {
        x: 0,
        y: 0,
        z: -10,
        duration: 3,
        ease: 'power2.inOut',
      });
    }

    // Scene 4: First Contact (inside bridge)
    if (phase === 'first-contact') {
      gsap.to(controls.camera.position, {
        x: 0,
        y: 2,
        z: -15,
        duration: 3,
        ease: 'power2.inOut',
      });
    }
  }, [phase]);

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      smoothTime={0.8}
      minDistance={1}
      maxDistance={100}
      enabled={phase !== 'black'}
    />
  );
}