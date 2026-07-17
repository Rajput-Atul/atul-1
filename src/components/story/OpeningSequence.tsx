/**
 * OpeningSequence — ATUL-1 Cinematic Intro
 *
 * Plays the opening cinematic sequence when the site loads.
 * Shows the story of awakening aboard ATUL-1.
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

  useEffect(() => {
    // Start sequence after loading screen
    const startTimer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Advance scenes automatically
    if (currentScene < openingSequence.length - 1) {
      const sceneTimer = setTimeout(() => {
        setCurrentScene((prev) => prev + 1);
      }, 4000);
      return () => clearTimeout(sceneTimer);
    } else {
      // End sequence after final scene
      const endTimer = setTimeout(() => {
        onComplete();
      }, 5000);
      return () => clearTimeout(endTimer);
    }
  }, [isVisible, currentScene, onComplete]);

  if (!isVisible) return null;

  const scene = openingSequence[currentScene];

  return (
    <div className="opening-sequence">
      <div className="opening-content">
        <div className="opening-scene-indicator">
          Scene {scene.scene} of {openingSequence.length}
        </div>
        <h2 className="opening-scene-title">{scene.title}</h2>
        <div className="opening-scene-description">
          {scene.description.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      {/* Skip Button */}
      <button
        className="opening-skip-btn"
        onClick={onComplete}
        type="button"
        aria-label="Skip opening sequence"
      >
        Skip Intro →
      </button>

      {/* Progress Dots */}
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
          animation: fadeIn 1s ease forwards;
        }

        .opening-content {
          max-width: 700px;
          width: 100%;
          text-align: center;
        }

        .opening-scene-indicator {
          font-family: var(--font-code, 'JetBrains Mono', monospace);
          font-size: 0.75rem;
          color: var(--color-text-dim, #64748B);
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
        }

        .opening-scene-title {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          color: var(--color-primary, #3B82F6);
          margin-bottom: 2rem;
          letter-spacing: 0.1em;
          animation: slideUp 0.8s ease forwards;
        }

        .opening-scene-description {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(0.875rem, 1.2vw, 1.063rem);
          color: var(--color-text-muted, #94A3B8);
          line-height: 1.8;
        }

        .opening-scene-description p {
          margin: 0 0 0.75rem;
          animation: fadeIn 0.6s ease forwards;
          opacity: 0;
          animation-delay: 0.2s;
          animation-fill-mode: forwards;
        }

        .opening-skip-btn {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          padding: 0.5rem 1.5rem;
          border: 1px solid var(--border-color, rgba(255,255,255,0.15));
          border-radius: var(--radius-md, 0.5rem);
          background: transparent;
          color: var(--color-text-muted, #94A3B8);
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all var(--transition-fast, 150ms ease);
        }

        .opening-skip-btn:hover {
          background: var(--glass-bg-hover, rgba(255,255,255,0.12));
          color: var(--color-text, #F8FAFC);
          border-color: var(--color-primary, #3B82F6);
        }

        .opening-progress {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }

        .opening-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-surface-light, #1E293B);
          transition: all var(--transition-normal, 300ms ease);
        }

        .opening-dot.active {
          background: var(--color-primary, #3B82F6);
          box-shadow: 0 0 10px var(--color-primary, #3B82F6);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
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
          .opening-skip-btn {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}