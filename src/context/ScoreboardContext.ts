import { create } from "zustand";

interface BoardContext {
  matchId: number;
  setMatchId: (newId: number) => void;
  selected: boolean;
  setSelected: (isSelected: boolean) => void;
}

export const useBoardContext = create<BoardContext>((set) => ({
  matchId: 99,
  setMatchId: (newId) => set({ matchId: newId }),
  selected: false,
  setSelected: (isSelected) => set({ selected: isSelected }),
}));
