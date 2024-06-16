import { create } from "zustand";

interface BoardContext {
  matchId: number;
  setMatchId: (newId: number) => void;
  selected: boolean;
  setSelected: (isSelected: boolean) => void;
}

interface PlayerContext {
  pId: number;
  setPId: (newId: number) => void;
}

export const useBoardContext = create<BoardContext>((set) => ({
  matchId: 99,
  setMatchId: (newId) => set({ matchId: newId }),
  selected: false,
  setSelected: (isSelected) => set({ selected: isSelected }),
}));

export const usePlayerContext = create<PlayerContext>((set) => ({
  pId: 1,
  setPId: (newId) => set({ pId: newId }),
}));

interface ScoreContext {
  HomeScore: number;
  AwayScore: number;
  setHomeScore: (newScore: number) => void;
  setAwayScore: (newScore: number) => void;
}

export const useScoreContext = create<ScoreContext>((set) => ({
  HomeScore: 0,
  AwayScore: 0,
  setHomeScore: (newScore) => set({ HomeScore: newScore }),
  setAwayScore: (newScore) => set({ AwayScore: newScore }),
}));
