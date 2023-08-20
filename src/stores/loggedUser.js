import { create } from "zustand";

export const useLoggedUserStore = create(() => ({
  loggedUser: undefined,
  checkedIfLogged: false,
}));
