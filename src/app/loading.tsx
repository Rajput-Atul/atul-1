'use client';

/**
 * ATUL-1 Loading — Fallback loading state
 */

import React from 'react';

export default function Loading() {
  return (
    <div className="page-loading">
      <div className="page-loading-spinner" />
      <style jsx>{`
        .page-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: var(--color-background, #020617);
        }

        .page-loading-spinner {
          width: 40px;
          height: 40px;
          border: 2px solid var(--border-color-light, rgba(255,255,255,0.08));
          border-top-color: var(--color-primary, #3B82F6);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}