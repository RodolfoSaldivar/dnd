import React from "react";
import { CONTENT } from "utils/constants";
import Characters from "components/Characters";
import { useLoggedUserStore } from "stores/loggedUser";
import Login from "components/Login";

const MainContent = () => {
  const lastVisitedPage = useLoggedUserStore(
    state => state.loggedUser?.lastVisitedPage,
  );

  if (!lastVisitedPage) return null;

  const ComponentToShow = (() => {
    switch (lastVisitedPage) {
      case "":
      case CONTENT.characters:
        return Characters;
      case CONTENT.createCharacter:
        return Login;
    }
  })();

  return <ComponentToShow />;
};

export default MainContent;
