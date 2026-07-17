/**
 * OpeningSequence — ATUL-1 Cinematic Intro (Detailed Timeline)
 *
 * 0-2s: Black screen, ambient sound begins
 * 2-6s: Deep space awakens - stars fade in, nebula appears
 * 6-10s: Blue signal appears - camera moves toward it
 * 10-16s: Ship revealed - ATUL-1 emerges from darkness
 * 16-25s: Docking sequence - doors open, systems activate
 * 25-35s: System boot - holographic screens, AI core glows
 * 35-45s: First contact - NOVA appears, minimal dialogue
 * 45-60s: Transition to hero - navigation fades in
 *
 * One-time cinematic per session. Returning visitors skip directly to hero.
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMissionStore } from '@/store/useMissionStore';
import { novaProfile } from '@/content';

interface OpeningSequenceProps {
  onComplete: () => void;
}

type SceneType = 'black' | 'deep-space' | 'signal' | 'ship-reveal' | 'docking' | 'system-boot' | 'first-contact' | 'transition';

const SCENE_TIMELINE: { scene: SceneType; end: number }[] = [
  { scene: 'black', end: 2000 },
  { scene: 'deep-space', end: 6000 },
  { scene: 'signal', end: 10000 },
  { scene: 'ship-reveal', end: 16000 },
  { scene: 'docking', end: 25000 },
  { scene: 'system-boot', end: 35000 },
  { scene: 'first-contact', end: 45000 },
  { scene: 'transition', end: 60000 },
];

export default function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [currentScene, setCurrentScene] = useState<SceneType>('black');
  const [isVisible, setIsVisible] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const { completeOpeningSequence } = useMissionStore();
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    setIsVisible(true);

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;

      // Find current scene based on elapsed time
      const current = SCENE_TIMELINE.find((s) => elapsed < s.end) || SCENE_TIMELINE[SCENE_TIMELINE.length - 1];
      setCurrentScene(current.scene);

      // Dialogue timing for first contact scene (35s-45s)
      if (elapsed >= 35000 && elapsed < 45000) {
        const dialogueElapsed = elapsed - 35000;
        const dialogueLines = novaProfile.greetings.firstVisit.split('\n').filter((line) => line.trim() !== '');
        const lineIndex = Math.floor(dialogueElapsed / 1500);
        setDialogueIndex(Math.min(lineIndex, dialogueLines.length - 1));
      }

      if (elapsed < 60000) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        handleComplete();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  const handleComplete = useCallback(() => {
    completeOpeningSequence();
    onComplete();
  }, [completeOpeningSequence, onComplete]);

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible) return null;

  const sceneTitles: Record<SceneType, string> = {
    'black': '',
    'deep-space': 'Deep Space',
    'signal': 'Signal Detected',
    'ship-reveal': 'ATUL-1',
    'docking': 'Docking Sequence',
    'system-boot': 'System Boot',
    'first-contact': 'First Contact',
    'transition': 'Welcome Aboard',
  };

  return (
    <div className="opening-sequence">
      {/* Scene Visual Layer */}
      <div className="opening-visual-layer">
        {currentScene === 'deep-space' && (
          <div className="scene-deep-space">
            <div className="stars-layer" />
            <div className="nebula-layer" />
          </div>
        )}

        {currentScene === 'signal' && (
          <div className="scene-signal">
            <div className="signal-pulse" />
          </div>
        )}

        {currentScene === 'ship-reveal' && (
          <div className="scene-ship">
            <div className="ship-silhouette" />
            <div className="ship-lights" />
          </div>
        )}

        {currentScene === 'docking' && (
          <div className="scene-docking">
            <div className="doors-opening" />
            <div className="energy-lines" />
          </div>
        )}

        {currentScene === 'system-boot' && (
          <div className="scene-boot">
            <div className="holographic-screens" />
            <div className="ai-core-glow" />
          </div>
        )}

        {currentScene === 'first-contact' && (
          <div className="scene-contact">
            <div className="nova-hologram">
              <div className="nova-figure" />
            </div>
            <div className="dialogue-container">
              {novaProfile.greetings.firstVisit.split('\n').filter((line) => line.trim() !== '').slice(0, dialogueIndex + 1).map((line, i) => (
                <p key={i} className="dialogue-line" style={{ animationDelay: `${i * 0.3}s` }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

        {currentScene === 'transition' && (
          <div className="scene-transition">
            <div className="hero-fade-in">
              <h1 className="hero-title">ATUL-1</h1>
              <p className="hero-subtitle">Atul Chauhan</p>
              <p className="hero-role">Java Backend Developer</p>
            </div>
          </div>
        )}
      </div>

      {/* Minimal Scene Title */}
      {sceneTitles[currentScene] && currentScene !== 'black' && currentScene !== 'transition' && (
        <div className="scene-title">{sceneTitles[currentScene]}</div>
      )}

      {/* Skip Button */}
      <button className="opening-skip-btn" onClick={handleSkip} type="button" aria-label="Skip opening sequence">
        Skip Intro
      </button>

      {/* Progress Indicator */}
      <div className="opening-progress">
        {SCENE_TIMELINE.map((s) => (
          <div key={s.scene} className={`progress-segment ${currentScene === s.scene ? 'active' : ''}`} />
        ))}
      </div>

      <style jsx>{`
        .opening-sequence {
          position: fixed;
          inset: 0;
          z-index: var(--z-loading, 600);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          animation: fadeIn 1s ease forwards;
        }

        .opening-visual-layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .scene-deep-space {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%);
          animation: deepSpaceReveal 4s ease forwards;
        }

        .stars-layer {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
            radial-gradient(2px 2px at 40px 70px, #ffffff, transparent),
            radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
            radial-gradient(2px 2px at 160px 120px, #ffffff, transparent);
          background-size: 200px 200px;
          animation: starsFadeIn 3s ease forwards;
          opacity: 0;
        }

        .nebula-layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          animation: nebulaFadeIn 4s ease forwards 1s;
          opacity: 0;
        }

        .scene-signal {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .signal-pulse {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%);
          animation: signalPulse 2s ease-in-out infinite;
        }

        .scene-ship {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ship-silhouette {
          width: 600px;
          height: 200px;
          background: linear-gradient(to bottom, #0a0a1a 0%, #1a1a2e 50%, #0a0a1a 100%);
          clip-path: polygon(20% 50%, 80% 50%, 90% 60%, 85% 70%, 15% 70%, 10% 60%);
          animation: shipReveal 3s ease forwards;
          opacity: 0;
        }

        .ship-lights {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .ship-lights::before,
        .ship-lights::after {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3B82F6;
          box-shadow: 0 0 10px #3B82F6;
          animation: navLightBlink 2s ease-in-out infinite;
        }

        .scene-docking {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, #000000 0%, #0a0a1a 100%);
        }

        .doors-opening {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 60%;
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: 10px;
          animation: doorsOpen 3s ease forwards;
        }

        .energy-lines {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%);
          animation: energyFlow 2s ease-in-out infinite;
        }

        .scene-boot {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, #000000 100%);
        }

        .holographic-screens {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
        }

        .holographic-screens::before,
        .holographic-screens::after {
          content: '';
          width: 200px;
          height: 150px;
          border: 1px solid rgba(59, 130, 246, 0.3);
          background: rgba(59, 130, 246, 0.05);
          animation: screenFlicker 3s ease-in-out infinite;
        }

        .ai-core-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
          animation: coreGlow 2s ease-in-out infinite;
        }

        .scene-contact {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }

        .nova-hologram {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: hologramMaterialize 3s ease forwards;
        }

        .nova-figure {
          width: 80px;
          height: 120px;
          background: linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%);
          border-radius: 40px 40px 20px 20px;
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }

        .dialogue-container {
          max-width: 600px;
          padding: 0 2rem;
          text-align: center;
        }

        .dialogue-line {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #ffffff;
          margin: 0.5rem 0;
          opacity: 0;
          animation: dialogueFade 1s ease forwards;
          line-height: 1.6;
        }

        .scene-transition {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #000;
          animation: transitionToHero 2s ease forwards;
        }

        .hero-fade-in {
          text-align: center;
          animation: heroFadeIn 2s ease forwards 0.5s;
          opacity: 0;
        }

        .hero-title {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(3rem, 8vw, 6rem);
          color: #3B82F6;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .hero-role {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(0.875rem, 1.5vw, 1.125rem);
          color: #94A3B8;
        }

        .scene-title {
          position: absolute;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(1rem, 2vw, 1.5rem);
          color: #3B82F6;
          letter-spacing: 0.2em;
          opacity: 0.7;
        }

        .opening-skip-btn {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          padding: 0.75rem 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
          background: rgba(0, 0, 0, 0.5);
          color: #94A3B8;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeIn 1s ease forwards 3s;
        }

        .opening-skip-btn:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: #3B82F6;
          color: #ffffff;
        }

        .opening-progress {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }

        .progress-segment {
          width: 40px;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .progress-segment.active {
          background: #3B82F6;
          box-shadow: 0 0 10px #3B82F6;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes deepSpaceReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes starsFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes nebulaFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes signalPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
        }

        @keyframes shipReveal {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes navLightBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes doorsOpen {
          from { transform: translate(-50%, -50%) scaleX(0.3); opacity: 0; }
          to { transform: translate(-50%, -50%) scaleX(1); opacity: 1; }
        }

        @keyframes energyFlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }

        @keyframes screenFlicker {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes coreGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
        }

        @keyframes hologramMaterialize {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes dialogueFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes transitionToHero {
          from { background: #000; }
          to { background: #020617; }
        }

        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .opening-skip-btn {
            bottom: 1rem;
            right: 1rem;
          }

          .opening-progress {
            bottom: 1rem;
          }

          .progress-segment {
            width: 24px;
          }
        }
      `}</style>
    </div>
  );
}