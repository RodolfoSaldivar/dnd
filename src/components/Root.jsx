import Header from "./Header";
import Login from "components/Login";
import React, { useEffect } from "react";
import MainContent from "components/MainContent";
import { setLoggedUserIfExist } from "utils/firebase";
import { useLoggedUserStore } from "stores/loggedUser";

export default function ButtonAppBar() {
  const { loggedUser, checkedIfLogged } = useLoggedUserStore();

  useEffect(setLoggedUserIfExist, []);

  if (!checkedIfLogged) return null;

  return (
    <div>
      <Header />

      {loggedUser ? <MainContent /> : <Login />}
    </div>
  );
}
