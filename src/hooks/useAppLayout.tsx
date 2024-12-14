import { create } from 'zustand';

type State = {
  isLoadingScreen: boolean;
  setLoadingScreen: (state: boolean) => void;
};

const useAppLayout = create<State>((set) => ({
  isLoadingScreen: false,
  setLoadingScreen: (load) => set({ isLoadingScreen: load }),
}));

export default useAppLayout;
