import { create } from "zustand";

export const useNotesStore = create(set => ({
  allNotes: new Map(),
  notesContent: new Map(),
  notesToDisplay: new Map(),
  saveModalIsOpen: false,
  actions: {
    setNotesToDisplay: notesToDisplay => set(() => ({ notesToDisplay })),
    setSaveModalIsOpen: saveModalIsOpen => set(() => ({ saveModalIsOpen })),
  },
}));

export const useNotesStoreActions = () => useNotesStore(state => state.actions);
