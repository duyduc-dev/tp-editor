import { create } from 'zustand';

import { SideBarEditorType } from '../types';

type State = {
  sidebarOpenType: SideBarEditorType | null;
};

type Actions = {
  setSideBarOpenType: (type: SideBarEditorType | null) => void;
};

const useEditorLayoutStore = create<State & Actions>((set) => ({
  sidebarOpenType: SideBarEditorType.FILES_EXPLORE,
  setSideBarOpenType: (type) => set({ sidebarOpenType: type }),
}));

export default useEditorLayoutStore;
