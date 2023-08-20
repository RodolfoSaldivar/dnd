import React from "react";
import Header from "./Header";
import Login from "components/Login";
import { useLoggedUserStore } from "stores/loggedUser";

export default function ButtonAppBar() {
  const { loggedUser } = useLoggedUserStore();

  return (
    <div>
      <Header />

      {!loggedUser && <Login />}
    </div>
  );
}
