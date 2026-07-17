/**
 * ATUL-1 Design System — Color Tokens
 *
 * These are the central color definitions for the entire project.
 * All components should reference these values.
 */

export const colors = {
  // Primary Palette
  primary: '#3B82F6',
  secondary: '#06B6D4',
  accent: '#8B5CF6',

  // Functional Colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',

  // Backgrounds
  background: '#020617',
  surface: '#0F172A',
  surfaceLight: '#1E293B',

  // Text
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  textDim: '#64748B',

  // Glass & Borders
  glass: 'rgba(255, 255, 255, 0.08)',
  glassHover: 'rgba(255, 255, 255, 0.12)',
  glassActive: 'rgba(255, 255, 255, 0.16)',
  border: 'rgba(255, 255, 255, 0.15)',
  borderLight: 'rgba(255, 255, 255, 0.08)',

  // Glow
  glowCyan: '#06B6D4',
  glowBlue: '#3B82F6',
  glowPurple: '#8B5CF6',

  // Hologram Colors
  hologramBlue: 'rgba(59, 130, 246, 0.6)',
  hologramCyan: 'rgba(6, 182, 212, 0.6)',
  hologramPurple: 'rgba(139, 92, 246, 0.6)',

  // World-Specific Lighting
  launchBay: '#3B82F6',
  earthArchive: '#F8FAFC',
  researchLab: '#22C55E',
  missionControl: '#06B6D4',
  engineeringCore: '#F59E0B',
  quantumVault: '#8B5CF6',
  communicationArray: '#3B82F6',
  observationDeck: '#F8FAFC',
} as const;

export type ColorKey = keyof typeof colors;