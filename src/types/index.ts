/**
 * ATUL-1 Core Type Definitions
 */

// Navigation
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  world: WorldId;
}

export type WorldId =
  | 'launch-bay'
  | 'earth-archive'
  | 'research-lab'
  | 'mission-control'
  | 'engineering-core'
  | 'quantum-vault'
  | 'communication-array'
  | 'observation-deck';

// Theme
export type ThemeMode = 'dark' | 'light';
export type GraphicsQuality = 'ultra' | 'high' | 'medium' | 'low' | 'custom';

export interface AppSettings {
  theme: ThemeMode;
  graphicsQuality: GraphicsQuality;
  particleDensity: number;
  musicEnabled: boolean;
  soundEffectsEnabled: boolean;
  reducedMotion: boolean;
}

// Mission
export interface MissionLog {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  date?: string;
  xp?: number;
}

// Achievement
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

// Project
export interface Project {
  id: string;
  name: string;
  planetName: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  features: string[];
  challenges: string[];
  lessons: string[];
}

// Skill
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  icon: string;
  color: string;
  description: string;
  relatedProjects: string[];
}

export type SkillCategory =
  | 'languages'
  | 'frameworks'
  | 'databases'
  | 'devops'
  | 'cloud'
  | 'tools'
  | 'architecture'
  | 'other';

// Certificate
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  skills: string[];
  url?: string;
}

// Store State
export interface MissionState {
  currentWorld: WorldId;
  visitedWorlds: WorldId[];
  missionLogs: MissionLog[];
  achievements: Achievement[];
  xp: number;
  rank: ExplorerRank;
}

export type ExplorerRank =
  | 'cadet'
  | 'explorer'
  | 'researcher'
  | 'engineer'
  | 'commander'
  | 'legend';

// Audio
export interface AudioTrack {
  id: string;
  name: string;
  src: string;
  duration: number;
}

// Terminal
export interface TerminalCommand {
  command: string;
  description: string;
  action: string;
  category: 'basic' | 'advanced' | 'fun' | 'hidden';
}