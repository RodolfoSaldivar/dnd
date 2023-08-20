import { create } from "zustand";

export const useCommonStore = create(set => ({
  headerTitle: "",
  actions: {
    setHeaderTitle: headerTitle => set(() => ({ headerTitle })),
  },
}));

export const useCommonStoreActions = () =>
  useCommonStore(state => state.actions);
