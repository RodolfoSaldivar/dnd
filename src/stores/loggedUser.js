import { create } from "zustand";

export const useLoggedUserStore = create(set => ({
  loggedUser: undefined,
  actions: {
    setLoggedUser: loggedUser => set(() => ({ loggedUser })),
  },
}));

export const useLoggedUserStoreActions = () =>
  useLoggedUserStore(state => state.actions);
