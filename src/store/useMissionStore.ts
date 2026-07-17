/**
 * ATUL-1 Global Mission Store (Zustand)
 *
 * Manages mission progress, visited worlds, achievements, and settings.
 */

import { create } from 'zustand';
import type { WorldId, ExplorerRank, AppSettings, Achievement, MissionLog } from '@/types';

interface MissionStore {
  // State
  currentWorld: WorldId;
  visitedWorlds: WorldId[];
  missionLogs: MissionLog[];
  achievements: Achievement[];
  xp: number;
  rank: ExplorerRank;
  settings: AppSettings;
  isLoading: boolean;
  showOpeningSequence: boolean;

  // Actions
  setCurrentWorld: (world: WorldId) => void;
  visitWorld: (world: WorldId) => void;
  addXp: (amount: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  addMissionLog: (log: MissionLog) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  setLoading: (loading: boolean) => void;
  finishLoading: () => void;
  completeOpeningSequence: () => void;
  resetProgress: () => void;
}

const RANK_THRESHOLDS: Record<ExplorerRank, number> = {
  cadet: 0,
  explorer: 100,
  researcher: 250,
  engineer: 500,
  commander: 1000,
  legend: 2000,
};

function calculateRank(xp: number): ExplorerRank {
  const ranks: ExplorerRank[] = ['cadet', 'explorer', 'researcher', 'engineer', 'commander', 'legend'];
  let currentRank: ExplorerRank = 'cadet';

  for (const rank of ranks) {
    if (xp >= RANK_THRESHOLDS[rank]) {
      currentRank = rank;
    }
  }

  return currentRank;
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  graphicsQuality: 'high',
  particleDensity: 50,
  musicEnabled: true,
  soundEffectsEnabled: true,
  reducedMotion: false,
};

export const useMissionStore = create<MissionStore>((set) => ({
  // Initial State
  currentWorld: 'launch-bay',
  visitedWorlds: [],
  missionLogs: [],
  achievements: [],
  xp: 0,
  rank: 'cadet',
  settings: defaultSettings,
  isLoading: true,
  showOpeningSequence: false,

  // Actions
  setCurrentWorld: (world) => set({ currentWorld: world }),

  visitWorld: (world) =>
    set((state) => {
      if (state.visitedWorlds.includes(world)) {
        return state;
      }
      const newVisited = [...state.visitedWorlds, world];
      const newXp = state.xp + 20;
      return {
        visitedWorlds: newVisited,
        xp: newXp,
        rank: calculateRank(newXp),
      };
    }),

  addXp: (amount) =>
    set((state) => {
      const newXp = state.xp + amount;
      return {
        xp: newXp,
        rank: calculateRank(newXp),
      };
    }),

  unlockAchievement: (achievement) =>
    set((state) => {
      if (state.achievements.find((a) => a.id === achievement.id)) {
        return state;
      }
      const newAchievement = { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() };
      const newXp = state.xp + 50;
      return {
        achievements: [...state.achievements, newAchievement],
        xp: newXp,
        rank: calculateRank(newXp),
      };
    }),

  addMissionLog: (log) =>
    set((state) => {
      if (state.missionLogs.find((l) => l.id === log.id)) {
        return state;
      }
      return { missionLogs: [...state.missionLogs, log] };
    }),

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  finishLoading: () => set({ isLoading: false, showOpeningSequence: true }),

  completeOpeningSequence: () => set({ showOpeningSequence: false }),

  resetProgress: () =>
    set({
      visitedWorlds: [],
      missionLogs: [],
      achievements: [],
      xp: 0,
      rank: 'cadet',
      isLoading: false,
      showOpeningSequence: false,
    }),
}));