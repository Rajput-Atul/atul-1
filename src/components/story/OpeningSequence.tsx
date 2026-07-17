/**
 * OpeningSequence — ATUL-1 Cinematic Intro
 *
 * A cinematic opening sequence with minimal text.
 * The story is told through visuals, animation, and atmosphere.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { openingSequence } from '@/content';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export default function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance scenes
  useEffect(() => {
    if (!isVisible) return;

    const current = openingSequence[currentScene];
    const duration = current.duration || 5000;

    // For scene 4, cycle through dialogue
    if (current.scene === 4 && current.dialogue) {
      const dialogueInterval = setInterval(() => {
        setDialogueIndex((prev) => {
          if (prev < current.dialogue!.length - 1) {
            return prev + 1;
          }
          clearInterval(dialogueInterval);
          return prev;
        });
      }, duration / current.dialogue.length);

      const endTimer = setTimeout(() => {
        onComplete();
      }, duration);

      return () => {
        clearInterval(dialogueInterval);
        clearTimeout(endTimer);
      };
    } else {
      const timer = setTimeout(() => {
        if (currentScene < openingSequence.length - 1) {
          setCurrentScene((prev) => prev + 1);
          setDialogueIndex(0);
        } else {
          onComplete();
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, currentScene, onComplete]);

  if (!isVisible) return null;

  const scene = openingSequence[currentScene];

  return (
    <div className="opening-sequence">
      {/* Scene indicator - very subtle */}
      <div className="opening-scene-indicator">
        Scene {scene.scene} / {openingSequence.length}
      </div>

      {/* Minimal title */}
      <h1 className="opening-title">{scene.title}</h1>

      {/* Dialogue for scene 4 */}
      {scene.scene === 4 && scene.dialogue && (
        <div className="opening-dialogue">
          {scene.dialogue.slice(0, dialogueIndex + 1).map((line, i) => (
            <p
              key={i}
              className="dialogue-line"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {/* ATUL-1 branding for final scene */}
      {scene.scene === 4 && dialogueIndex >= 2 && (
        <div className="opening-brand" style={{ animationDelay: '0.5s' }}>
          <span className="brand-text">ATUL-1</span>
          <span className="brand-subtext">Powered by NOVA</span>
        </div>
      )}

      {/* Skip button */}
      <button
        className="opening-skip-btn"
        onClick={onComplete}
        type="button"
        aria-label="Skip opening sequence"
      >
        Skip
      </button>

      {/* Progress dots */}
      <div className="opening-progress">
        {openingSequence.map((_, index) => (
          <div
            key={index}
            className={`opening-dot ${index === currentScene ? 'active' : ''}`}
          />
        ))}
      </div>

      <style jsx>{`
        .opening-sequence {
          position: fixed;
          inset: 0;
          z-index: var(--z-loading, 600);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--color-background, #020617);
          padding: 2rem;
          animation: fadeIn 1.5s ease forwards;
        }

        .opening-scene-indicator {
          position: absolute;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-code, 'JetBrains Mono', monospace);
          font-size: 0.75rem;
          color: var(--color-text-dim, #64748B);
          letter-spacing: 0.1em;
        }

        .opening-title {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(2rem, 5vw, 4rem);
          color: var(--color-primary, #3B82F6);
          letter-spacing: 0.15em;
          margin-bottom: 3rem;
          opacity: 0;
          animation: titleFade 2s ease forwards 0.5s;
        }

        .opening-dialogue {
          max-width: 600px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .dialogue-line {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--color-text, #F8FAFC);
          margin: 0;
          opacity: 0;
          animation: dialogueFade 1s ease forwards;
          line-height: 1.6;
        }

        .opening-brand {
          margin-top: 3rem;
          text-align: center;
          opacity: 0;
          animation: brandFade 1.5s ease forwards;
        }

        .brand-text {
          display: block;
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          color: var(--color-primary, #3B82F6);
          letter-spacing: 0.2em;
          margin-bottom: 0.5rem;
        }

        .brand-subtext {
          display: block;
          font-family: var(--font-code, 'JetBrains Mono', monospace);
          font-size: 0.875rem;
          color: var(--color-text-muted, #94A3B8);
          letter-spacing: 0.1em;
        }

        .opening-skip-btn {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          padding: 0.5rem 1.5rem;
          border: 1px solid var(--border-color, rgba(255,255,255,0.1));
          border-radius: var(--radius-md, 0.5rem);
          background: transparent;
          color: var(--color-text-dim, #64748B);
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all var(--transition-fast, 150ms ease);
          opacity: 0;
          animation: fadeIn 1s ease forwards 2s;
        }

        .opening-skip-btn:hover {
          color: var(--color-text, #F8FAFC);
          border-color: var(--color-primary, #3B82F6);
        }

        .opening-progress {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.75rem;
        }

        .opening-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-surface-light, #1E293B);
          transition: all var(--transition-normal, 300ms ease);
        }

        .opening-dot.active {
          background: var(--color-primary, #3B82F6);
          box-shadow: 0 0 8px var(--color-primary, #3B82F6);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes titleFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        @keyframes brandFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .opening-scene-indicator {
            top: 1rem;
          }

          .opening-skip-btn {
            bottom: 1rem;
            right: 1rem;
          }

          .opening-progress {
            bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}