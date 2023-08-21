import Header from "./Header";
import Login from "components/Login";
import React, { useEffect } from "react";
import MainContent from "components/MainContent";
import { useLoggedUserStore } from "stores/loggedUser";
import { listenToUserById, listenIfUserIsLogged } from "utils/firebase";

export default function ButtonAppBar() {
  const { userId, checkedIfLogged } = useLoggedUserStore();

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
