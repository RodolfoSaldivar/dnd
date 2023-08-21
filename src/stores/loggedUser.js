import { create } from "zustand";

export const useLoggedUserStore = create(() => ({
  userId: "",
  loggedUser: undefined,
  checkedIfLogged: false,
}));
