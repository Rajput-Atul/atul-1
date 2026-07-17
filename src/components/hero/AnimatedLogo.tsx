/**
 * AnimatedLogo — ATUL-1 Premium Logo
 *
 * A futuristic animated emblem representing ATUL-1.
 * Features: rotating energy rings, pulsing core, particle glow.
 */

'use client';

import React from 'react';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function AnimatedLogo({ size = 'md', showText = true }: AnimatedLogoProps) {
  const sizeClasses = {
    sm: { container: 48, ring: 40, core: 28, text: '0.875rem' },
    md: { container: 80, ring: 64, core: 44, text: '1.125rem' },
    lg: { container: 120, ring: 96, core: 68, text: '1.5rem' },
  };

  const s = sizeClasses[size];

  return (
    <div
      className="animated-logo"
      style={{
        width: s.container,
        height: s.container,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer Ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `2px solid rgba(59, 130, 246, 0.3)`,
          borderRadius: '50%',
          animation: 'reactorSpin 4s linear infinite',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -3,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 6,
            height: 6,
            background: 'var(--color-primary, #3B82F6)',
            borderRadius: '50%',
            boxShadow: '0 0 10px var(--color-primary, #3B82F6)',
          }}
        />
      </div>

      {/* Inner Ring */}
      <div
        style={{
          position: 'absolute',
          width: s.ring,
          height: s.ring,
          border: `1px solid rgba(6, 182, 212, 0.2)`,
          borderRadius: '50%',
          animation: 'reactorSpin 3s linear infinite reverse',
        }}
      />

      {/* Core */}
      <div
        style={{
          width: s.core,
          height: s.core,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'energyPulse 2s ease-in-out infinite',
        }}
      >
        {showText && (
          <span
            style={{
              fontFamily: 'var(--font-heading, Orbitron, sans-serif)',
              fontSize: s.text,
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--color-primary, #3B82F6)',
            }}
          >
            ATUL-1
          </span>
        )}
      </div>

      <style jsx>{`
        @import '@styles/globals.scss';
      `}</style>
    </div>
  );
}