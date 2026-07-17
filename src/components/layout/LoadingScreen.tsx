/**
 * LoadingScreen — ATUL-1 System Boot Sequence
 *
 * A cinematic loading experience that shows the ship powering up.
 * Features: animated logo, reactor pulse, system status indicators.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useMissionStore } from '@/store/useMissionStore';

interface SystemStatus {
  name: string;
  status: 'offline' | 'booting' | 'online';
}

const bootSequence: SystemStatus[] = [
  { name: 'Power Core', status: 'offline' },
  { name: 'Navigation', status: 'offline' },
  { name: 'Quantum AI', status: 'offline' },
  { name: 'Mission Database', status: 'offline' },
  { name: 'Archives', status: 'offline' },
  { name: 'Communication Array', status: 'offline' },
];

export default function LoadingScreen() {
  const { completeIntro } = useMissionStore();
  const [progress, setProgress] = useState(0);
  const [systems, setSystems] = useState<SystemStatus[]>(bootSequence);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after 3 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 3000);

    // Boot sequence simulation
    const bootInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8 + 2;
        if (next >= 100) {
          clearInterval(bootInterval);
          clearTimeout(skipTimer);
          setTimeout(() => completeIntro(), 500);
          return 100;
        }
        return Math.min(next, 100);
      });
    }, 400);

    // Update system statuses based on progress
    const statusInterval = setInterval(() => {
      setSystems((prev) => {
        const nextIndex = prev.findIndex((s) => s.status !== 'online');
        if (nextIndex === -1) return prev;

        const updated = [...prev];
        if (updated[nextIndex].status === 'offline') {
          updated[nextIndex] = { ...updated[nextIndex], status: 'booting' };
        } else {
          updated[nextIndex] = { ...updated[nextIndex], status: 'online' };
        }
        return updated;
      });
    }, 800);

    return () => {
      clearInterval(bootInterval);
      clearInterval(statusInterval);
      clearTimeout(skipTimer);
    };
  }, [completeIntro]);

  const handleSkip = () => {
    completeIntro();
  };

  return (
    <div className="loading-screen" role="status" aria-label="ATUL-1 System Booting">
      <div className="loading-content">
        {/* Animated Logo */}
        <div className="loading-logo-container">
          <div className="loading-logo-ring" />
          <div className="loading-logo-core">
            <span className="loading-logo-text">ATUL-1</span>
          </div>
        </div>

        {/* System Status */}
        <div className="loading-systems">
          {systems.map((system) => (
            <div key={system.name} className="loading-system-row">
              <span className="loading-system-name">{system.name}</span>
              <span
                className={`loading-system-status ${system.status}`}
                aria-label={`${system.name}: ${system.status}`}
              >
                {system.status === 'online' ? 'ONLINE' : system.status === 'booting' ? 'BOOTING' : 'OFFLINE'}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <div
              className="loading-progress-fill"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span className="loading-progress-text">{Math.round(progress)}%</span>
        </div>

        {/* Skip Button */}
        {showSkip && (
          <button
            className="loading-skip-btn"
            onClick={handleSkip}
            type="button"
            aria-label="Skip intro sequence"
          >
            Skip Intro →
          </button>
        )}
      </div>

      <style jsx>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          z-index: var(--z-loading, 600);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-background, #020617);
          overflow: hidden;
        }

        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          max-width: 400px;
          width: 100%;
          padding: 2rem;
        }

        /* Logo Animation */
        .loading-logo-container {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-logo-ring {
          position: absolute;
          inset: 0;
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          animation: reactorSpin 3s linear infinite;
        }

        .loading-logo-ring::before {
          content: '';
          position: absolute;
          top: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: var(--color-primary, #3B82F6);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--color-primary, #3B82F6);
        }

        .loading-logo-core {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: energyPulse 2s ease-in-out infinite;
        }

        .loading-logo-text {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--color-primary, #3B82F6);
        }

        /* System Status */
        .loading-systems {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .loading-system-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid var(--border-color-light, rgba(255,255,255,0.08));
        }

        .loading-system-name {
          font-family: var(--font-code, 'JetBrains Mono', monospace);
          font-size: 0.8125rem;
          color: var(--color-text-muted, #94A3B8);
        }

        .loading-system-status {
          font-family: var(--font-code, 'JetBrains Mono', monospace);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .loading-system-status.offline {
          color: var(--color-text-dim, #64748B);
        }

        .loading-system-status.booting {
          color: var(--color-warning, #F59E0B);
          animation: pulseGlow 1s ease-in-out infinite;
        }

        .loading-system-status.online {
          color: var(--color-success, #22C55E);
        }

        /* Progress Bar */
        .loading-progress-container {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .loading-progress-bar {
          flex: 1;
          height: 3px;
          background: var(--color-surface-light, #1E293B);
          border-radius: 2px;
          overflow: hidden;
        }

        .loading-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary, #3B82F6), var(--color-secondary, #06B6D4));
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .loading-progress-text {
          font-family: var(--font-numbers, 'Space Grotesk', sans-serif);
          font-size: 0.875rem;
          color: var(--color-text-muted, #94A3B8);
          min-width: 3rem;
          text-align: right;
        }

        /* Skip Button */
        .loading-skip-btn {
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

        .loading-skip-btn:hover {
          background: var(--glass-bg-hover, rgba(255,255,255,0.12));
          color: var(--color-text, #F8FAFC);
          border-color: var(--color-primary, #3B82F6);
        }

        @media (max-width: 768px) {
          .loading-content {
            padding: 1rem;
            gap: 1.5rem;
          }

          .loading-logo-container {
            width: 100px;
            height: 100px;
          }

          .loading-logo-core {
            width: 60px;
            height: 60px;
          }

          .loading-logo-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}