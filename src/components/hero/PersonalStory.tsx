/**
 * PersonalStory — ATUL-1 Who Am I Section
 *
 * A narrative section that tells Atul Chauhan's story naturally.
 * Instead of a long biography, it uses atmospheric storytelling.
 */

'use client';

import React from 'react';
import { profile } from '@/content';

export default function PersonalStory() {
  return (
    <section className="personal-story-section">
      <div className="personal-story-container glass-strong">
        <h2 className="story-title">Who Am I?</h2>
        
        <div className="story-content">
          <p className="story-text">{profile.whoAmI}</p>
        </div>

        <div className="story-personality">
          <h3 className="story-subtitle">Core Identity</h3>
          <div className="personality-grid">
            {profile.personality.map((trait) => (
              <div key={trait} className="personality-trait">
                <span className="trait-text">{trait}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="story-philosophy">
          <h3 className="story-subtitle">Philosophy</h3>
          <ul className="philosophy-list">
            {profile.philosophy.map((item) => (
              <li key={item} className="philosophy-item">
                <span className="philosophy-icon">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="story-digital-universe">
          <h3 className="story-subtitle">My Digital Universe</h3>
          <p className="universe-text">
            The ATUL-1 experience represents my own galaxy. Every room reveals another aspect of my journey. 
            You are not reading a resume — you are exploring my mind, my projects, and my aspirations.
          </p>
        </div>
      </div>

      <style jsx>{`
        .personal-story-section {
          margin-top: 3rem;
        }

        .personal-story-container {
          padding: 3rem;
          border-radius: var(--radius-xl, 1rem);
        }

        .story-title {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(1.5rem, 3vw, 2rem);
          text-align: center;
          margin-bottom: 2rem;
          color: var(--color-text, #F8FAFC);
          letter-spacing: 0.1em;
        }

        .story-content {
          margin-bottom: 2.5rem;
        }

        .story-text {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(0.938rem, 1.2vw, 1.063rem);
          color: var(--color-text-muted, #94A3B8);
          line-height: 1.8;
          margin: 0;
          text-align: center;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        .story-personality {
          margin-bottom: 2.5rem;
        }

        .story-subtitle {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          color: var(--color-primary, #3B82F6);
          margin-bottom: 1.25rem;
          letter-spacing: 0.08em;
          text-align: center;
        }

        .personality-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .personality-trait {
          padding: 0.5rem 1rem;
          background: var(--glass-bg, rgba(255,255,255,0.08));
          border: 1px solid var(--border-color-light, rgba(255,255,255,0.08));
          border-radius: var(--radius-full, 9999px);
          transition: all var(--transition-fast, 150ms ease);
        }

        .personality-trait:hover {
          background: var(--glass-bg-hover, rgba(255,255,255,0.12));
          border-color: var(--color-primary, #3B82F6);
          transform: translateY(-2px);
        }

        .trait-text {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.8125rem;
          color: var(--color-text, #F8FAFC);
          letter-spacing: 0.02em;
        }

        .story-philosophy {
          margin-bottom: 2.5rem;
        }

        .philosophy-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
        }

        .philosophy-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.938rem;
          color: var(--color-text-muted, #94A3B8);
          line-height: 1.6;
        }

        .philosophy-icon {
          color: var(--color-primary, #3B82F6);
          font-size: 1.25rem;
          line-height: 1;
          flex-shrink: 0;
        }

        .story-digital-universe {
          text-align: center;
          padding: 2rem;
          background: var(--glass-bg, rgba(255,255,255,0.08));
          border: 1px solid var(--border-color-light, rgba(255,255,255,0.08));
          border-radius: var(--radius-lg, 0.75rem);
        }

        .universe-text {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(0.875rem, 1.1vw, 1rem);
          color: var(--color-text-muted, #94A3B8);
          line-height: 1.7;
          margin: 0;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .personal-story-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}