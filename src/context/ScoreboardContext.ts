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

interface ScoreContext {
  HomeScore: number;
  AwayScore: number;
  injuryTime: number;
  setHomeScore: (newScore: number) => void;
  setAwayScore: (newScore: number) => void;
  setInjuryTime: (newScore: number) => void;
}

interface TimeContext {
  currentMinute: number;
  setCurrentMinute: (newMinute: number) => void;
}

interface PlayerDetailContext {
  [key: string]: string;
}

interface PlayerLineUpContext {
  HomeLineUpIDMatch: PlayerDetailContext;
  AwayLineUpIDMatch: PlayerDetailContext;
  setHomeLineUpIDMatch: (newHomeLineUp: PlayerDetailContext) => void;
  setAwayLineUpIDMatch: (newAwayLineUp: PlayerDetailContext) => void;
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

export const useScoreContext = create<ScoreContext>((set) => ({
  HomeScore: 0,
  AwayScore: 0,
  injuryTime: 0,
  setHomeScore: (newScore) => set({ HomeScore: newScore }),
  setAwayScore: (newScore) => set({ AwayScore: newScore }),
  setInjuryTime: (newTime) => set({ injuryTime: newTime }),
}));

export const useTimeContext = create<TimeContext>((set) => ({
  currentMinute: 0,
  setCurrentMinute: (newMinute) => set({ currentMinute: newMinute }),
}));

export const usePlayerLineUpContext = create<PlayerLineUpContext>((set) => ({
  HomeLineUpIDMatch: {},
  AwayLineUpIDMatch: {},
  setHomeLineUpIDMatch: (newHomeLineUp: PlayerDetailContext) =>
    set({ HomeLineUpIDMatch: newHomeLineUp }),
  setAwayLineUpIDMatch: (newAwayLineUp: PlayerDetailContext) =>
    set({ AwayLineUpIDMatch: newAwayLineUp }),
}));
