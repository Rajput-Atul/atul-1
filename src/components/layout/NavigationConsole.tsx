/**
 * NavigationConsole — ATUL-1 Primary Navigation
 *
 * A futuristic glass navigation bar that acts as the ship's control console.
 * Features: glassmorphism, active location indicator, keyboard shortcuts.
 */

'use client';

import React from 'react';
import { useMissionStore } from '@/store/useMissionStore';
import type { NavItem, WorldId } from '@/types';

const navItems: NavItem[] = [
  { id: 'launch-bay', label: 'Launch Bay', icon: '🚀', path: '/', world: 'launch-bay' },
  { id: 'earth-archive', label: 'Archive', icon: '🌍', path: '/about', world: 'earth-archive' },
  { id: 'research-lab', label: 'Lab', icon: '🔬', path: '/skills', world: 'research-lab' },
  { id: 'mission-control', label: 'Missions', icon: '🎯', path: '/projects', world: 'mission-control' },
  { id: 'engineering-core', label: 'Engineering', icon: '⚡', path: '/learning', world: 'engineering-core' },
  { id: 'quantum-vault', label: 'Vault', icon: '💎', path: '/certificates', world: 'quantum-vault' },
  { id: 'communication-array', label: 'Contact', icon: '📡', path: '/contact', world: 'communication-array' },
  { id: 'observation-deck', label: 'Deck', icon: '🔭', path: '/observation', world: 'observation-deck' },
];

export default function NavigationConsole() {
  const { currentWorld, setCurrentWorld, visitWorld } = useMissionStore();

  const handleNavigate = (item: NavItem) => {
    setCurrentWorld(item.world);
    visitWorld(item.world);
  };

  return (
    <nav
      className="navigation-console"
      role="navigation"
      aria-label="ATUL-1 Navigation Console"
    >
      <div className="nav-container glass-strong">
        {/* Ship Status Indicator */}
        <div className="nav-brand">
          <span className="nav-logo" aria-hidden="true">◆</span>
          <span className="nav-ship-name">ATUL-1</span>
          <span className="nav-status-dot" />
        </div>

        {/* Navigation Items */}
        <ul className="nav-items">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${currentWorld === item.world ? 'active' : ''}`}
                onClick={() => handleNavigate(item)}
                aria-current={currentWorld === item.world ? 'page' : undefined}
                aria-label={`Navigate to ${item.label}`}
                type="button"
              >
                <span className="nav-item-icon" aria-hidden="true">{item.icon}</span>
                <span className="nav-item-label">{item.label}</span>
                {currentWorld === item.world && (
                  <span className="nav-active-indicator" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Quick Actions */}
        <div className="nav-actions">
          <button
            className="nav-action-btn"
            onClick={() => {/* Open terminal */}}
            aria-label="Open Command Terminal (Ctrl+K)"
            type="button"
          >
            <span aria-hidden="true">⌨</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .navigation-console {
          position: fixed;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: var(--z-sticky, 100);
          width: auto;
          max-width: 95vw;
        }

        .nav-container {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 0.5rem 1.5rem;
          border-radius: var(--radius-xl, 1rem);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .nav-logo {
          font-size: 1.25rem;
          color: var(--color-primary, #3B82F6);
        }

        .nav-ship-name {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--color-text, #F8FAFC);
        }

        .nav-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-success, #22C55E);
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .nav-items {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.75rem;
          border: none;
          border-radius: var(--radius-md, 0.5rem);
          background: transparent;
          color: var(--color-text-muted, #94A3B8);
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast, 150ms ease);
          position: relative;
        }

        .nav-item:hover {
          background: var(--glass-bg-hover, rgba(255,255,255,0.12));
          color: var(--color-text, #F8FAFC);
        }

        .nav-item.active {
          background: var(--glass-bg-active, rgba(255,255,255,0.16));
          color: var(--color-primary, #3B82F6);
        }

        .nav-item-icon {
          font-size: 1rem;
        }

        .nav-item-label {
          white-space: nowrap;
        }

        .nav-active-indicator {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 1rem;
          height: 2px;
          background: var(--color-primary, #3B82F6);
          border-radius: 1px;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .nav-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: 1px solid var(--border-color-light, rgba(255,255,255,0.08));
          border-radius: var(--radius-md, 0.5rem);
          background: transparent;
          color: var(--color-text-muted, #94A3B8);
          font-size: 1rem;
          cursor: pointer;
          transition: all var(--transition-fast, 150ms ease);
        }

        .nav-action-btn:hover {
          background: var(--glass-bg-hover, rgba(255,255,255,0.12));
          color: var(--color-text, #F8FAFC);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .navigation-console {
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            transform: none;
            max-width: 100vw;
          }

          .nav-container {
            border-radius: var(--radius-lg, 0.75rem) var(--radius-lg, 0.75rem) 0 0;
            padding: 0.5rem 0.75rem;
            gap: 0.5rem;
            overflow-x: auto;
          }

          .nav-brand {
            display: none;
          }

          .nav-items {
            gap: 0;
            width: 100%;
            justify-content: space-around;
          }

          .nav-item {
            flex-direction: column;
            padding: 0.375rem;
            gap: 0.125rem;
            font-size: 0.6875rem;
          }

          .nav-item-label {
            font-size: 0.625rem;
          }

          .nav-actions {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}