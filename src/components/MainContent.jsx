import React from "react";
import { CONTENT } from "utils/constants";
import Characters from "components/Characters";
import { useLoggedUserStore } from "stores/loggedUser";
import CreateCharacter from "components/CreateCharacter";

const MainContent = () => {
  const lastVisitedPage = useLoggedUserStore(
    state => state.loggedUser?.lastVisitedPage,
  );

  if (!lastVisitedPage) return null;

  const ComponentToShow = (() => {
    switch (lastVisitedPage) {
      case "":
      case CONTENT.characters.id:
        return Characters;
      case CONTENT.createCharacter.id:
        return CreateCharacter;
    }
  })();

  return <ComponentToShow />;
};

export default MainContent;
