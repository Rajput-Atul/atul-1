/**
 * OpeningSequence — ATUL-1 Cinematic Intro
 *
 * IMPORTANT: This is a CINEMATIC EXPERIENCE, not a slideshow.
 *
 * The scenes below describe visual events through 3D animation,
 * camera movement, lighting, and particle effects.
 *
 * Do NOT display:
 * - Scene titles
 * - Descriptive text
 * - PowerPoint-style slides
 * - Tutorial screens
 *
 * Only minimal dialogue appears in Scene 4 (First Contact).
 *
 * Scene 1 (0-10s): Black screen → Stars fade in → Nebula appears → Ship emerges
 * Scene 2 (10-20s): Camera flies toward ship → Docking bay doors open
 * Scene 3 (20-30s): Enter ship → Holographic screens appear → Systems boot
 * Scene 4 (30-40s): NOVA hologram materializes → Minimal dialogue
 * Scene 5 (40-50s): Transition to hero section
 */

'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useMissionStore } from '@/store/useMissionStore';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Stars } from '@react-three/drei';
import Starfield from '@/three/particles/Starfield';
import Nebula from '@/three/particles/Nebula';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OpeningSequenceProps {
  onComplete: () => void;
}

type ScenePhase = 'black' | 'deep-space' | 'approach' | 'docking' | 'inside-ship' | 'first-contact' | 'transition';

export default function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [currentPhase, setCurrentPhase] = useState<ScenePhase>('black');
  const [showNovaDialogue, setShowNovaDialogue] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const { completeOpeningSequence } = useMissionStore();
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;

      // Scene progression based on elapsed time
      if (elapsed < 2000) {
        setCurrentPhase('black');
      } else if (elapsed < 10000) {
        setCurrentPhase('deep-space');
      } else if (elapsed < 20000) {
        setCurrentPhase('approach');
      } else if (elapsed < 30000) {
        setCurrentPhase('docking');
      } else if (elapsed < 40000) {
        setCurrentPhase('inside-ship');
      } else if (elapsed < 50000) {
        setCurrentPhase('first-contact');
        // Show dialogue after 3 seconds in first-contact scene
        if (elapsed > 43000 && !showNovaDialogue) {
          setShowNovaDialogue(true);
        }
        // Cycle dialogue
        if (showNovaDialogue) {
          const dialogueElapsed = elapsed - 43000;
          const lineIndex = Math.floor(dialogueElapsed / 2000);
          setDialogueIndex(Math.min(lineIndex, 3));
        }
      } else {
        setCurrentPhase('transition');
        setTimeout(() => {
          completeOpeningSequence();
          onComplete();
        }, 3000);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete, completeOpeningSequence, showNovaDialogue]);

  const handleSkip = () => {
    completeOpeningSequence();
    onComplete();
  };

  return (
    <div className="opening-sequence">
      {/* 3D Canvas */}
      <div className="opening-canvas">
        <Canvas camera={{ position: [0, 0, 50], fov: 75 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />

            {/* Scene Elements */}
            {currentPhase === 'deep-space' && (
              <>
                <Starfield count={15000} radius={1000} size={1.5} />
                <Nebula count={15} radius={600} />
              </>
            )}

            {currentPhase === 'approach' && (
              <>
                <Starfield count={15000} radius={1000} size={1.5} />
                <Nebula count={15} radius={600} />
                <CameraControls />
              </>
            )}

            {currentPhase === 'docking' && (
              <>
                <Starfield count={15000} radius={1000} size={1.5} />
                <DockingBay />
              </>
            )}

            {(currentPhase === 'inside-ship' || currentPhase === 'first-contact') && (
              <>
                <ShipInterior />
                {currentPhase === 'first-contact' && <NovaHologram />}
              </>
            )}
          </Suspense>
        </Canvas>
      </div>

      {/* Minimal Dialogue - Only in First Contact Scene */}
      {showNovaDialogue && currentPhase === 'first-contact' && (
        <div className="nova-dialogue">
          {dialogueIndex >= 0 && (
            <p className="dialogue-line">Welcome aboard, Mission Explorer.</p>
          )}
          {dialogueIndex >= 1 && (
            <p className="dialogue-line">I am NOVA.</p>
          )}
          {dialogueIndex >= 2 && (
            <p className="dialogue-line">ATUL-1 is now online.</p>
          )}
          {dialogueIndex >= 3 && (
            <p className="dialogue-line">Preparing Digital Universe...</p>
          )}
        </div>
      )}

      {/* Skip Button */}
      <button className="skip-btn" onClick={handleSkip}>
        Skip Intro
      </button>

      <style jsx>{`
        .opening-sequence {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
        }

        .opening-canvas {
          position: absolute;
          inset: 0;
        }

        .nova-dialogue {
          position: absolute;
          bottom: 15%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 10;
        }

        .dialogue-line {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #ffffff;
          margin: 0.5rem 0;
          opacity: 0;
          animation: dialogueFade 1s ease forwards;
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }

        .skip-btn {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          padding: 0.75rem 1.5rem;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #94A3B8;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .skip-btn:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: #3B82F6;
          color: #ffffff;
        }

        @keyframes dialogueFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .skip-btn {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

// Docking Bay Scene
function DockingBay() {
  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      {/* Ship model will be added here */}
      <mesh position={[0, 0, -20]}>
        <boxGeometry args={[10, 6, 2]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#3B82F6" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

// Ship Interior Scene
function ShipInterior() {
  return (
    <group>
      <Stars radius={50} depth={20} count={2000} factor={2} saturation={0} fade speed={1} />
      {/* Holographic screens */}
      <mesh position={[-5, 2, -10]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
      </mesh>
      <mesh position={[5, 2, -10]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
      </mesh>
      {/* AI Core */}
      <mesh position={[0, 0, -15]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// NOVA Hologram
function NovaHologram() {
  const material = React.useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
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
        varying vec2 vUv;
        void main() {
          float alpha = 0.3 + sin(uTime * 2.0) * 0.1;
          gl_FragColor = vec4(0.23, 0.51, 0.96, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0, -10]}>
      <capsuleGeometry args={[1, 2, 4, 8]} />
      <primitive object={material} />
    </mesh>
  );
}