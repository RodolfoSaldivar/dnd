import { create } from "zustand";

export const useCommonStore = create(set => ({
  headerTitle: "",
  contentToShow: "",
  actions: {
    setHeaderTitle: headerTitle => set(() => ({ headerTitle })),
    setContentToShow: contentToShow => set(() => ({ contentToShow })),
  },
}));

export const useCommonStoreActions = () =>
  useCommonStore(state => state.actions);
