// app/store.ts
import { create } from 'zustand';

interface GlobalState {
  data: any;
  setData: (data: any) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
