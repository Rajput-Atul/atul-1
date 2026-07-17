/**
 * ATUL-1 404 — Lost in Deep Space
 *
 * A themed 404 page that maintains the ATUL-1 atmosphere.
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="not-found-page">
      <div className="not-found-content glass-strong">
        <div className="not-found-code" aria-hidden="true">404</div>
        <h1 className="not-found-title">Lost in Deep Space</h1>
        <p className="not-found-description">
          The destination you are looking for does not exist in the ATUL-1 database.
          Navigation systems are unable to locate this sector.
        </p>
        <div className="not-found-actions">
          <button
            className="not-found-btn"
            onClick={() => router.push('/')}
            type="button"
          >
            Return to Launch Bay
          </button>
        </div>
      </div>
      <style jsx>{`
        .not-found-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-background, #020617);
          padding: 2rem;
        }

        .not-found-content {
          text-align: center;
          padding: 3rem;
          border-radius: var(--radius-xl, 1rem);
          max-width: 500px;
          width: 100%;
        }

        .not-found-code {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(4rem, 10vw, 8rem);
          font-weight: 900;
          background: linear-gradient(135deg, var(--color-primary, #3B82F6), var(--color-accent, #8B5CF6));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 1.5rem;
        }

        .not-found-title {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: 1.5rem;
          color: var(--color-text, #F8FAFC);
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }

        .not-found-description {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.938rem;
          color: var(--color-text-muted, #94A3B8);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .not-found-btn {
          padding: 0.75rem 2rem;
          border: 1px solid var(--color-primary, #3B82F6);
          border-radius: var(--radius-md, 0.5rem);
          background: transparent;
          color: var(--color-primary, #3B82F6);
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.938rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast, 150ms ease);
        }

        .not-found-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
}