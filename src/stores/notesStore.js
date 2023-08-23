import { create } from "zustand";

export const useNotesStore = create(set => ({
  noteToUpdate: null,
  allNotes: new Map(),
  notesContent: new Map(),
  notesToDisplay: new Map(),
  saveModalIsOpen: false,
  actions: {
    setNoteToUpdate: noteToUpdate => set(() => ({ noteToUpdate })),
    setNotesToDisplay: notesToDisplay => set(() => ({ notesToDisplay })),
    setSaveModalIsOpen: saveModalIsOpen => set(() => ({ saveModalIsOpen })),
  },
}));

export const useNotesStoreActions = () => useNotesStore(state => state.actions);
