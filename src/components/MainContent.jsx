import React from "react";
import { CONTENT } from "utils/constants";
import Characters from "components/Characters";
import ViewCharacter from "components/ViewCharacter";
import { useLoggedUserStore } from "stores/loggedUser";
import CreateCharacter from "components/CreateCharacter";

const MainContent = () => {
  const lastVisitedPage = useLoggedUserStore(
    state => state.loggedUser?.lastVisitedPage,
  );
  const lastVisitedPageProps = useLoggedUserStore(
    state => state.loggedUser?.lastVisitedPageProps,
  );

  if (!lastVisitedPage) return null;

  const ComponentToShow = (() => {
    switch (lastVisitedPage) {
      case "":
      case CONTENT.characters.id:
        return Characters;
      case CONTENT.viewCharacter.id:
        return ViewCharacter;
      case CONTENT.createCharacter.id:
        return CreateCharacter;
    }
  })();

  return <ComponentToShow {...lastVisitedPageProps} />;
};

export default MainContent;
