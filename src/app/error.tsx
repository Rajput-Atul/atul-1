/**
 * ATUL-1 Error — System Malfunction Handler
 *
 * Graceful error boundary with ATUL-1 theming.
 */

'use client';

import React from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  React.useEffect(() => {
    console.error('ATUL-1 System Error:', error);
  }, [error]);

  return (
    <div className="error-page">
      <div className="error-content glass-strong">
        <div className="error-icon" aria-hidden="true">⚠</div>
        <h1 className="error-title">System Malfunction</h1>
        <p className="error-description">
          An unexpected error occurred in the ATUL-1 systems.
          Our engineering team has been notified.
        </p>
        <p className="error-detail">{error.message || 'Unknown error'}</p>
        <button
          className="error-btn"
          onClick={reset}
          type="button"
        >
          Restart Systems
        </button>
      </div>
      <style jsx>{`
        .error-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-background, #020617);
          padding: 2rem;
        }

        .error-content {
          text-align: center;
          padding: 3rem;
          border-radius: var(--radius-xl, 1rem);
          max-width: 500px;
          width: 100%;
        }

        .error-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .error-title {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: 1.5rem;
          color: var(--color-error, #EF4444);
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }

        .error-description {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.938rem;
          color: var(--color-text-muted, #94A3B8);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .error-detail {
          font-family: var(--font-code, 'JetBrains Mono', monospace);
          font-size: 0.75rem;
          color: var(--color-text-dim, #64748B);
          margin-bottom: 2rem;
          padding: 0.75rem;
          background: var(--glass-bg, rgba(255,255,255,0.08));
          border-radius: var(--radius-md, 0.5rem);
          word-break: break-all;
        }

        .error-btn {
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

        .error-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
}