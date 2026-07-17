/**
 * ATUL-1 — Launch Bay (Hero)
 *
 * The main entry point of the ATUL-1 experience.
 * Visitors are greeted with a cinematic introduction to Atul Chauhan.
 */

'use client';

import React from 'react';
import { useMissionStore } from '@/store/useMissionStore';

export default function HomePage() {
  const { visitWorld } = useMissionStore();

  React.useEffect(() => {
    visitWorld('launch-bay');
  }, [visitWorld]);

  return (
    <div className="launch-bay">
      <div className="launch-bay-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-badge glass">
            <span className="hero-badge-dot" />
            <span className="hero-badge-text">ATUL-1 Systems Online</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-greeting">Hello, I'm</span>
            <span className="hero-title-name">Atul Chauhan</span>
          </h1>

          <p className="hero-subtitle">
            Software Engineer &middot; Java Backend Developer &middot; Creative Technologist
          </p>

          <p className="hero-tagline">
            Code with Purpose. Design with Imagination. Build Experiences that Inspire.
          </p>

          <div className="hero-actions">
            <button
              className="hero-btn hero-btn-primary"
              onClick={() => {
                const element = document.getElementById('mission-brief');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              type="button"
            >
              Begin Mission
            </button>

            <a
              href="/resume.pdf"
              className="hero-btn hero-btn-secondary"
              download
            >
              View Resume
            </a>
          </div>

          <div className="hero-socials">
            <a
              href="https://github.com/atulchauhan"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub Profile"
            >
              <span aria-hidden="true">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/atulchauhan"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn Profile"
            >
              <span aria-hidden="true">LinkedIn</span>
            </a>
            <a
              href="mailto:atul@example.com"
              className="hero-social-link"
              aria-label="Send Email"
            >
              <span aria-hidden="true">Email</span>
            </a>
          </div>
        </section>

        {/* Mission Brief Section */}
        <section id="mission-brief" className="mission-brief-section">
          <div className="mission-brief-container glass-strong">
            <h2 className="mission-brief-title">Mission Brief</h2>
            <div className="mission-brief-content">
              <div className="mission-brief-card">
                <h3>Explorer</h3>
                <p>Navigate through the ATUL-1 Digital Universe</p>
              </div>
              <div className="mission-brief-card">
                <h3>Discover</h3>
                <p>Explore projects, skills, and achievements</p>
              </div>
              <div className="mission-brief-card">
                <h3>Connect</h3>
                <p>Reach out and start a conversation</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .launch-bay {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-background, #020617);
          position: relative;
          overflow: hidden;
        }

        .launch-bay::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.05), transparent 70%);
          pointer-events: none;
        }

        .launch-bay-content {
          max-width: 800px;
          width: 100%;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          margin-bottom: 4rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 1rem;
          margin-bottom: 2rem;
          border-radius: var(--radius-full, 9999px);
        }

        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-success, #22C55E);
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .hero-badge-text {
          font-family: var(--font-code, 'JetBrains Mono', monospace);
          font-size: 0.75rem;
          color: var(--color-text-muted, #94A3B8);
          letter-spacing: 0.05em;
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .hero-title-greeting {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 400;
          color: var(--color-text-muted, #94A3B8);
          letter-spacing: 0.1em;
        }

        .hero-title-name {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, var(--color-text, #F8FAFC), var(--color-primary, #3B82F6));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(0.875rem, 1.5vw, 1.125rem);
          color: var(--color-text-muted, #94A3B8);
          margin-bottom: 1rem;
          letter-spacing: 0.02em;
        }

        .hero-tagline {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(0.75rem, 1.2vw, 0.938rem);
          color: var(--color-text-dim, #64748B);
          font-style: italic;
          margin-bottom: 2.5rem;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .hero-btn {
          padding: 0.75rem 2rem;
          border-radius: var(--radius-md, 0.5rem);
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.938rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal, 300ms ease);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-btn-primary {
          background: var(--color-primary, #3B82F6);
          color: white;
          border: none;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .hero-btn-primary:hover {
          background: #2563EB;
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          transform: translateY(-2px);
        }

        .hero-btn-secondary {
          background: transparent;
          color: var(--color-text, #F8FAFC);
          border: 1px solid var(--border-color, rgba(255,255,255,0.15));
        }

        .hero-btn-secondary:hover {
          background: var(--glass-bg-hover, rgba(255,255,255,0.12));
          border-color: var(--color-primary, #3B82F6);
        }

        .hero-socials {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }

        .hero-social-link {
          font-family: var(--font-code, 'JetBrains Mono', monospace);
          font-size: 0.8125rem;
          color: var(--color-text-dim, #64748B);
          text-decoration: none;
          transition: color var(--transition-fast, 150ms ease);
          padding: 0.5rem;
        }

        .hero-social-link:hover {
          color: var(--color-primary, #3B82F6);
        }

        /* Mission Brief */
        .mission-brief-section {
          margin-top: 2rem;
        }

        .mission-brief-container {
          padding: 2rem;
          border-radius: var(--radius-xl, 1rem);
        }

        .mission-brief-title {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          text-align: center;
          margin-bottom: 2rem;
          color: var(--color-text, #F8FAFC);
          letter-spacing: 0.1em;
        }

        .mission-brief-content {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .mission-brief-card {
          text-align: center;
          padding: 1.5rem;
          border-radius: var(--radius-lg, 0.75rem);
          background: var(--glass-bg, rgba(255,255,255,0.08));
          border: 1px solid var(--border-color-light, rgba(255,255,255,0.08));
          transition: all var(--transition-normal, 300ms ease);
        }

        .mission-brief-card:hover {
          background: var(--glass-bg-hover, rgba(255,255,255,0.12));
          transform: translateY(-4px);
        }

        .mission-brief-card h3 {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: 1rem;
          color: var(--color-primary, #3B82F6);
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
        }

        .mission-brief-card p {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.875rem;
          color: var(--color-text-muted, #94A3B8);
          margin: 0;
        }

        @media (max-width: 768px) {
          .launch-bay-content {
            padding: 1rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .hero-btn {
            width: 100%;
            justify-content: center;
          }

          .mission-brief-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}