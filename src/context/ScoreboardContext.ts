import { create } from "zustand";
import produce from "immer";

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

interface FormationReadyContext {
  homeFormationReady: boolean;
  awayFormationReady: boolean;
  setHomeFormationReady: (newState: boolean) => void;
  setAwayFormationReady: (newState: boolean) => void;
}

interface PlayerLineUpContext {
  HomeLineUpIDMatch: PlayerDetailContext;
  AwayLineUpIDMatch: PlayerDetailContext;
  setHomeLineUpIDMatch: (newHomeLineUp: PlayerDetailContext) => void;
  setAwayLineUpIDMatch: (newAwayLineUp: PlayerDetailContext) => void;
}

interface PlayerStatus {
  id: number;
  name: string;
  jerseyNumber: number;
  goalCount: number;
  isWarned: boolean;
  isBanned: boolean;
  substitution: boolean;
}

interface PositionObject {
  [key: number]: PlayerStatus[];
}

interface PlayerPositionContext {
  homePosition: PositionObject;
  awayPosition: PositionObject;
  addHomePosition: (positionNumber: number, player: PlayerStatus) => void;
  addAwayPosition: (positionNumber: number, player: PlayerStatus) => void;
}

export const usePlayerPositionContext = create<PlayerPositionContext>(
  (set) => ({
    homePosition: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
    },
    awayPosition: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
    },
    addHomePosition: (positionNumber, player) =>
      set((state) => {
        if (state.homePosition[positionNumber]) {
          return {
            homePosition: {
              ...state.homePosition,
              [positionNumber]: [player, ...state.homePosition[positionNumber]],
            },
          };
        } else {
          return state;
        }
      }),
    addAwayPosition: (positionNumber, player) =>
      set((state) => {
        if (state.awayPosition[positionNumber]) {
          return {
            awayPosition: {
              ...state.awayPosition,
              [positionNumber]: [player, ...state.awayPosition[positionNumber]],
            },
          };
        } else {
          return state;
        }
      }),
  })
);

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

export const useFormationReadyContext = create<FormationReadyContext>(
  (set) => ({
    homeFormationReady: false,
    awayFormationReady: false,
    setHomeFormationReady: (newState: boolean) =>
      set({ homeFormationReady: newState }),
    setAwayFormationReady: (newState: boolean) =>
      set({ awayFormationReady: newState }),
  })
);
