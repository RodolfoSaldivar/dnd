import Header from "./Header";
import theme from "utils/theme";
import Login from "components/Login";
import React, { useEffect } from "react";
import MainContent from "components/MainContent";
import { ThemeProvider } from "@mui/material/styles";
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
    <ThemeProvider theme={theme}>
      <Header />
      {userId ? <MainContent /> : <Login />}
    </ThemeProvider>
  );
}
