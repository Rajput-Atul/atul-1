/**
 * ATUL-1 Design System — Typography Tokens
 */

export const typography = {
  fonts: {
    heading: "'Orbitron', sans-serif",
    body: "'Inter', sans-serif",
    code: "'JetBrains Mono', monospace",
    numbers: "'Space Grotesk', sans-serif",
  },

  sizes: {
    hero: 'clamp(2.5rem, 5vw, 6rem)',
    heading1: 'clamp(2rem, 4vw, 3rem)',
    heading2: 'clamp(1.5rem, 3vw, 2.25rem)',
    heading3: 'clamp(1.25rem, 2.5vw, 1.75rem)',
    section: 'clamp(1.5rem, 3vw, 2rem)',
    card: 'clamp(1rem, 1.5vw, 1.25rem)',
    body: 'clamp(0.938rem, 1.2vw, 1.125rem)',
    small: 'clamp(0.75rem, 1vw, 0.875rem)',
    caption: '0.875rem',
  },

  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.2em',
  },

  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;