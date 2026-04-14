import { create } from "zustand";

type State = {
    count: number;
    start: () => void;
    stop: () => void;
}

export const useLoadingStore = create<State>((set) => ({
    count: 0,
    start: () => set((state) => ({ count: state.count + 1 })),
    stop: () => set((state) => ({ count: Math.max(0, state.count - 1) }))
}));