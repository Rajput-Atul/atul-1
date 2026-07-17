/**
 * UniverseLore — ATUL-1 Universe Details
 *
 * Displays the lore, setting, and atmosphere of the ATUL-1 universe.
 * Can be embedded in pages for immersive storytelling.
 */

'use client';

import React from 'react';
import { universe, outsideUniverse, shipPersonality } from '@/content';

export default function UniverseLore() {
  return (
    <div className="universe-lore">
      <div className="lore-section">
        <h3 className="lore-title">The Digital Universe</h3>
        <p className="lore-text">{universe.setting}</p>
      </div>

      <div className="lore-section">
        <h3 className="lore-title">Humanity's Reach</h3>
        <p className="lore-text">{universe.humanity}</p>
      </div>

      <div className="lore-section">
        <h3 className="lore-title">Ship&aposs Purpose</h3>
        <p className="lore-text">{universe.shipPurpose}</p>
      </div>

      {shipPersonality.design && (
        <div className="lore-section">
          <h3 className="lore-title">Ship Design</h3>
          <p className="lore-design-style">{shipPersonality.design.style}</p>
          <p className="lore-design-inspiration">Inspired by {shipPersonality.design.inspiration}</p>
          <div className="lore-materials">
            {shipPersonality.design.materials.map((material) => (
              <span key={material} className="lore-material-tag">
                {material}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="lore-section">
        <h3 className="lore-title">Beyond the Ship</h3>
        <div className="lore-universe-list">
          {outsideUniverse.map((item) => (
            <div key={item} className="lore-universe-item">
              <span className="universe-icon">◆</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .universe-lore {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .lore-section {
          padding: 1.5rem;
          background: var(--glass-bg, rgba(255,255,255,0.08));
          border: 1px solid var(--border-color-light, rgba(255,255,255,0.08));
          border-radius: var(--radius-lg, 0.75rem);
          transition: all var(--transition-normal, 300ms ease);
        }

        .lore-section:hover {
          background: var(--glass-bg-hover, rgba(255,255,255,0.12));
          transform: translateY(-2px);
        }

        .lore-title {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          color: var(--color-primary, #3B82F6);
          margin-bottom: 0.75rem;
          letter-spacing: 0.08em;
        }

        .lore-text {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(0.875rem, 1.1vw, 1rem);
          color: var(--color-text-muted, #94A3B8);
          line-height: 1.7;
          margin: 0;
        }

        .lore-design-style {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.938rem;
          color: var(--color-text, #F8FAFC);
          margin: 0 0 0.5rem;
          font-weight: 500;
        }

        .lore-design-inspiration {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.875rem;
          color: var(--color-text-muted, #94A3B8);
          margin: 0 0 1rem;
          font-style: italic;
        }

        .lore-materials {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .lore-material-tag {
          padding: 0.375rem 0.75rem;
          background: var(--glass-bg, rgba(255,255,255,0.08));
          border: 1px solid var(--border-color-light, rgba(255,255,255,0.08));
          border-radius: var(--radius-full, 9999px);
          font-family: var(--font-code, 'JetBrains Mono', monospace);
          font-size: 0.75rem;
          color: var(--color-text-muted, #94A3B8);
        }

        .lore-universe-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }

        .lore-universe-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.875rem;
          color: var(--color-text-muted, #94A3B8);
          padding: 0.5rem;
          background: var(--glass-bg, rgba(255,255,255,0.08));
          border-radius: var(--radius-md, 0.5rem);
        }

        .universe-icon {
          color: var(--color-primary, #3B82F6);
          font-size: 0.5rem;
        }

        @media (max-width: 768px) {
          .lore-universe-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}