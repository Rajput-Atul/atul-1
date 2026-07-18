/**
 * OpeningSequence — ATUL-1 Cinematic Intro
 *
 * IMPORTANT: This is a CINEMATIC EXPERIENCE, not a slideshow.
 *
 * Uses real 3D objects, camera animation, and post-processing
 * to create a sci-fi movie-quality experience.
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMissionStore } from '@/store/useMissionStore';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Stars } from '@react-three/drei';
import Starfield from '@/three/particles/Starfield';
import Nebula from '@/three/particles/Nebula';
import ATUL1Spaceship from '@/three/objects/ATUL1Spaceship';
import DockingBay from '@/three/scenes/DockingBay';
import ShipInterior from '@/three/scenes/ShipInterior';
import NovaHologram from '@/three/effects/NovaHologram';
import CinematicEffects from '@/three/postprocessing/CinematicEffects';
import * as THREE from 'three';

interface OpeningSequenceProps {
  onComplete: () => void;
}

type ScenePhase = 'black' | 'deep-space' | 'approach' | 'ship-reveal' | 'docking' | 'inside-ship' | 'first-contact' | 'transition';

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

      if (elapsed < 2000) {
        setCurrentPhase('black');
      } else if (elapsed < 10000) {
        setCurrentPhase('deep-space');
      } else if (elapsed < 20000) {
        setCurrentPhase('approach');
      } else if (elapsed < 30000) {
        setCurrentPhase('ship-reveal');
      } else if (elapsed < 40000) {
        setCurrentPhase('docking');
      } else if (elapsed < 50000) {
        setCurrentPhase('inside-ship');
      } else if (elapsed < 60000) {
        setCurrentPhase('first-contact');
        if (elapsed > 53000 && !showNovaDialogue) {
          setShowNovaDialogue(true);
        }
        if (showNovaDialogue) {
          const dialogueElapsed = elapsed - 53000;
          const lineIndex = Math.floor(dialogueElapsed / 2000);
          setDialogueIndex(Math.min(lineIndex, 3));
        }
      } else if (elapsed < 70000) {
        setCurrentPhase('transition');
      } else {
        completeOpeningSequence();
        onComplete();
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
      <div className="opening-canvas">
        <Canvas camera={{ position: [0, 0, 50], fov: 75 }} dpr={[1, 2]}>
          <color attach="background" args={['#000']} />

      {/* Cinematic Post-Processing */}
      <CinematicEffects bloomIntensity={1.2} />

          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#3B82F6" distance={100} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06B6D4" distance={80} />
          <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />

          <group>
            {currentPhase === 'deep-space' && (
              <>
                <Starfield count={20000} radius={1000} size={1.5} />
                <Nebula count={20} radius={800} />
              </>
            )}

            {currentPhase === 'approach' && (
              <>
                <Starfield count={20000} radius={1000} size={1.5} />
                <Nebula count={20} radius={800} />
                <CameraControls smoothTime={0.5} />
              </>
            )}

            {(currentPhase === 'ship-reveal' || currentPhase === 'docking') && (
              <>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ATUL1Spaceship position={[0, 0, -30]} scale={2} />
                {(currentPhase === 'docking') && <DockingBay />}
              </>
            )}

            {(currentPhase === 'inside-ship' || currentPhase === 'first-contact') && (
              <>
                <ShipInterior />
                {currentPhase === 'first-contact' && <NovaHologram />}
              </>
            )}
          </group>
        </Canvas>
      </div>

      {/* Minimal Dialogue */}
      {showNovaDialogue && currentPhase === 'first-contact' && (
        <div className="nova-dialogue">
          {dialogueIndex >= 0 && <p className="dialogue-line">Welcome aboard, Mission Explorer.</p>}
          {dialogueIndex >= 1 && <p className="dialogue-line">I am NOVA.</p>}
          {dialogueIndex >= 2 && <p className="dialogue-line">ATUL-1 is now online.</p>}
          {dialogueIndex >= 3 && <p className="dialogue-line">Preparing Digital Universe...</p>}
        </div>
      )}

      {/* Skip Button */}
      <button className="skip-btn" onClick={handleSkip}>Skip Intro</button>

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