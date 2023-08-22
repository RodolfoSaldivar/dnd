import { create } from "zustand";

export const useNotesStore = create(set => ({
  allNotesNames: {},
  notesToDisplay: {},
  allNotesContent: {},
  actions: {
    setNotesToDisplay: notesToDisplay => set(() => ({ notesToDisplay })),
  },
}));

export const useNotesStoreActions = () => useNotesStore(state => state.actions);
