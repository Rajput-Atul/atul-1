/**
 * NovaAssistant — NOVA AI Holographic Assistant
 *
 * A floating holographic orb that greets visitors and provides guidance.
 * Features: breathing glow, floating animation, context-aware messages.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useMissionStore } from '@/store/useMissionStore';
import { novaProfile } from '@/content';

export default function NovaAssistant() {
  const { currentWorld } = useMissionStore();
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    // Show NOVA after a delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update message based on current world
    const dialogue = novaProfile.contextDialogue[currentWorld];
    if (dialogue) {
      setCurrentMessage(dialogue);
    }
  }, [currentWorld]);

  if (!isVisible) return null;

  return (
    <div className="nova-assistant" role="complementary" aria-label="NOVA AI Assistant">
      <div className="nova-orb">
        {/* Outer Ring */}
        <div className="nova-ring nova-ring-outer" />
        <div className="nova-ring nova-ring-inner" />
        
        {/* Core */}
        <div className="nova-core">
          <span className="nova-initial">N</span>
        </div>

        {/* Particle Effect */}
        <div className="nova-particles" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="nova-particle"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Message Bubble */}
      {currentMessage && (
        <div className="nova-message glass-strong">
          <div className="nova-message-header">
            <span className="nova-name">NOVA</span>
            <span className="nova-status-dot" />
          </div>
          <p className="nova-message-text">{currentMessage}</p>
        </div>
      )}

      <style jsx>{`
        .nova-assistant {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: var(--z-content, 10);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
          max-width: 300px;
        }

        .nova-orb {
          width: 64px;
          height: 64px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform var(--transition-normal, 300ms ease);
        }

        .nova-orb:hover {
          transform: scale(1.1);
        }

        .nova-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
        }

        .nova-ring-outer {
          inset: 0;
          border-color: rgba(59, 130, 246, 0.3);
          animation: reactorSpin 4s linear infinite;
        }

        .nova-ring-inner {
          width: 48px;
          height: 48px;
          border-color: rgba(6, 182, 212, 0.2);
          animation: reactorSpin 3s linear infinite reverse;
        }

        .nova-core {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: energyPulse 2s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }

        .nova-initial {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--color-primary, #3B82F6);
          text-shadow: 0 0 10px var(--color-primary, #3B82F6);
        }

        .nova-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .nova-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: var(--color-secondary, #06B6D4);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          animation: particleFloat 2s ease-in-out infinite;
          box-shadow: 0 0 4px var(--color-secondary, #06B6D4);
        }

        .nova-message {
          padding: 1rem;
          border-radius: var(--radius-lg, 0.75rem);
          max-width: 280px;
          animation: slideUp 0.5s ease forwards;
        }

        .nova-message-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .nova-name {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-primary, #3B82F6);
          letter-spacing: 0.1em;
        }

        .nova-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-success, #22C55E);
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .nova-message-text {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.8125rem;
          color: var(--color-text-muted, #94A3B8);
          margin: 0;
          line-height: 1.5;
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px) scale(1.5);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .nova-assistant {
            bottom: 1rem;
            right: 1rem;
            max-width: 250px;
          }

          .nova-orb {
            width: 56px;
            height: 56px;
          }

          .nova-ring-inner {
            width: 40px;
            height: 40px;
          }

          .nova-core {
            width: 32px;
            height: 32px;
          }

          .nova-initial {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}