import Header from "./Header";
import Login from "components/Login";
import React, { useEffect } from "react";
import { useLoggedUserStore } from "stores/loggedUser";
import { setLoggedUserIfExist } from "utils/firebase";

export default function ButtonAppBar() {
  const { loggedUser, checkedIfLogged } = useLoggedUserStore();

  useEffect(setLoggedUserIfExist, []);

  if (!checkedIfLogged) return null;

  return (
    <div>
      <Header />

      {!loggedUser && <Login />}
    </div>
  );
}
