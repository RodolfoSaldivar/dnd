import { create } from "zustand";

export const useLoggedUserStore = create(() => ({
  userId: "",
  loggedUser: undefined,
  characters: new Map(),
  checkedIfLogged: false,
}));
