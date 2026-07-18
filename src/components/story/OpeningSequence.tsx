/**
 * OpeningSequence — ATUL-1 Cinematic Intro
 *
 * Cinematic sequence with GSAP camera animations.
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMissionStore } from '@/store/useMissionStore';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

interface OpeningSequenceProps {
  onComplete: () => void;
}

type ScenePhase = 'black' | 'deep-space' | 'ship-reveal' | 'docking' | 'first-contact' | 'transition';

export default function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [currentPhase, setCurrentPhase] = useState<ScenePhase>('black');
  const [showNovaDialogue, setShowNovaDialogue] = useState(false);
  const { completeOpeningSequence } = useMissionStore();
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;

      if (elapsed < 2000) {
        setCurrentPhase('black');
      } else if (elapsed < 8000) {
        setCurrentPhase('deep-space');
      } else if (elapsed < 28000) {
        setCurrentPhase('ship-reveal');
      } else if (elapsed < 48000) {
        setCurrentPhase('docking');
      } else if (elapsed < 68000) {
        setCurrentPhase('first-contact');
        setShowNovaDialogue(true);
      } else {
        completeOpeningSequence();
        onComplete();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete, completeOpeningSequence]);

  const handleSkip = () => completeOpeningSequence();

  return (
    <div className="opening-sequence">
      <div className="opening-canvas">
        <Canvas camera={{ position: [0, 0, 100], fov: 75 }} dpr={[1, 2]}>
          <color attach="background" args={['#000']} />

          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />

          <group>
            {currentPhase === 'deep-space' && (
              <>
                <Stars count={5000} depth={100} factor={4} saturation={0} fade speed={1} />
                {/* Nebula particles */}
                {[...Array(50)].map((_, i) => (
                  <mesh
                    key={i}
                    position={[
                      (Math.random() - 0.5) * 600,
                      (Math.random() - 0.5) * 150,
                      (Math.random() - 0.5) * 600,
                    ]}
                  >
                    <planeGeometry args={[80, 80]} />
                    <meshBasicMaterial
                      color={new THREE.Color(`hsl(${220 + Math.random() * 40}, 0.8, 0.5)`)}
                      transparent
                      opacity={0.05}
                      depthWrite={false}
                      blending={THREE.AdditiveBlending}
                    />
                  </mesh>
                ))}
              </>
            )}

            {(currentPhase === 'ship-reveal' || currentPhase === 'docking') && (
              <>
                <Stars count={3000} depth={50} factor={2} saturation={0} fade speed={1} />

                {/* ATUL-1 Spaceship */}
                <group position={[0, 0, -20]} scale={1.5}>
                  <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[2, 2.5, 12, 8]} />
                    <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
                  </mesh>
                </group>
              </>
            )}

            {currentPhase === 'first-contact' && (
              <>
                {/* Ship Interior */}
                <mesh position={[0, 0, -20]}>
                  <boxGeometry args={[50, 20, 40]} />
                  <meshStandardMaterial color="#050510" metalness={0.9} roughness={0.2} />
                </mesh>

                {/* AI Core */}
                <mesh position={[0, 0, -15]}>
                  <sphereGeometry args={[2, 16, 16]} />
                  <meshBasicMaterial color="#3B82F6" transparent opacity={0.5} />
                </mesh>
              </>
            )}
          </group>
        </Canvas>
      </div>

      {/* Minimal Dialogue */}
      {showNovaDialogue && (
        <div className="nova-dialogue">
          <p className="dialogue-line">Welcome aboard, Mission Explorer.</p>
          <p className="dialogue-line">I am NOVA.</p>
          <p className="dialogue-line">ATUL-1 is now online.</p>
          <p className="dialogue-line">Preparing Digital Universe...</p>
        </div>
      )}

      {/* Skip Button */}
      <button className="skip-btn" onClick={handleSkip}>Skip Intro</button>

      <style jsx>{`
        .opening-sequence { position: fixed; inset: 0; z-index: 9999; background: #000; }
        .opening-canvas { position: absolute; inset: 0; }
        .nova-dialogue { position: absolute; bottom: 15%; left: 50%; transform: translateX(-50%); text-align: center; z-index: 10; }
        .dialogue-line { font-family: 'Inter', sans-serif; font-size: clamp(1rem, 2vw, 1.25rem); color: #fff; margin: 0.5rem 0; opacity: 0; animation: fadeIn 1s ease forwards; text-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
        .skip-btn { position: absolute; bottom: 2rem; right: 2rem; padding: 0.75rem 1.5rem; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #94A3B8; font-family: 'Inter', sans-serif; font-size: 0.875rem; cursor: pointer; z-index: 10; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}