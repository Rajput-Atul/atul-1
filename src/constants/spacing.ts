/**
 * ATUL-1 Design System — Spacing Tokens
 *
 * 8px base unit system for consistent spacing.
 */

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.25rem', // 4px
  1: '0.5rem',    // 8px
  1.5: '0.75rem', // 12px
  2: '1rem',      // 16px
  2.5: '1.25rem', // 20px
  3: '1.5rem',    // 24px
  3.5: '1.75rem', // 28px
  4: '2rem',      // 32px
  5: '2.5rem',    // 40px
  6: '3rem',      // 48px
  7: '3.5rem',    // 56px
  8: '4rem',      // 64px
  9: '4.5rem',    // 72px
  10: '5rem',     // 80px
  11: '5.5rem',   // 88px
  12: '6rem',     // 96px
  14: '7rem',     // 112px
  16: '8rem',     // 128px
  20: '10rem',    // 160px
  24: '12rem',    // 192px
  28: '14rem',    // 224px
  32: '16rem',    // 256px
} as const;

export const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
} as const;

export const zIndex = {
  base: 0,
  content: 10,
  sticky: 100,
  dropdown: 200,
  overlay: 300,
  modal: 400,
  terminal: 500,
  loading: 600,
  cursor: 700,
  max: 9999,
} as const;