import Notes from "components/Notes";
import React, { useEffect } from "react";
import { CONTENT } from "utils/constants";
import Characters from "components/Characters";
import ViewCharacter from "components/ViewCharacter";
import { useLoggedUserStore } from "stores/loggedUser";
import CreateCharacter from "components/CreateCharacter";
import { getAllUsersFromFirebase, updateLastVisitedPage } from "utils/firebase";

const MainContent = () => {
  const loggedUserId = useLoggedUserStore(state => state.loggedUser?.id);
  const lastVisitedPage = useLoggedUserStore(
    state => state.loggedUser?.lastVisitedPage,
  );
  const lastVisitedPageProps = useLoggedUserStore(
    state => state.loggedUser?.lastVisitedPageProps,
  );

  useEffect(getAllUsersFromFirebase, []);

  if (loggedUserId && !lastVisitedPage) {
    updateLastVisitedPage(CONTENT.characters.id);
  }
  if (!lastVisitedPage) return null;

  const ComponentToShow = (() => {
    switch (lastVisitedPage) {
      case "":
      case CONTENT.notes.id:
        return Notes;
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
