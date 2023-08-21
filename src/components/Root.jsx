import Header from "./Header";
import Login from "components/Login";
import React, { useEffect } from "react";
import MainContent from "components/MainContent";
import { useLoggedUserStore } from "stores/loggedUser";
import { listenToUserById, listenIfUserIsLogged } from "utils/firebase";

export default function ButtonAppBar() {
  const userId = useLoggedUserStore(state => state.userId);
  const checkedIfLogged = useLoggedUserStore(state => state.checkedIfLogged);

  useEffect(listenIfUserIsLogged, []);
  useEffect(() => {
    if (!userId) return;
    listenToUserById(userId);
  }, [userId]);

  if (!checkedIfLogged) return null;

  return (
    <div>
      <Header />

      {userId ? <MainContent /> : <Login />}
    </div>
  );
}
