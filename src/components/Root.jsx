import Header from "./Header";
import Login from "components/Login";
import React, { useEffect } from "react";
import { setLoggedUserIfExist } from "utils/firebase";
import { useLoggedUserStore } from "stores/loggedUser";
import CharacterList from "components/Characters/CharacterList";

export default function ButtonAppBar() {
  const { loggedUser, checkedIfLogged } = useLoggedUserStore();

  useEffect(setLoggedUserIfExist, []);

  if (!checkedIfLogged) return null;

  return (
    <div>
      <Header />

      {loggedUser ? <CharacterList /> : <Login />}
    </div>
  );
}
