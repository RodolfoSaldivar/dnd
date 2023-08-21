import React, { useEffect } from "react";
import { CONTENT } from "utils/constants";
import Container from "@mui/material/Container";
import { useLoggedUserStore } from "stores/loggedUser";
import { listenToCharacterById } from "utils/firebase";
import { useCommonStoreActions } from "stores/commonStore";
import CharacterList from "components/Characters/CharacterList";
import AccordionInstance from "components/Characters/AccordionInstance";

const Characters = () => {
  const { setHeaderTitle } = useCommonStoreActions();
  const fetchedCharacters = useLoggedUserStore(state => state.characters);
  const charactersToFetch = useLoggedUserStore(
    state => state.loggedUser?.characters,
  );

  useEffect(() => setHeaderTitle(CONTENT.characters.title), []);
  useEffect(() => {
    charactersToFetch.forEach(charId => listenToCharacterById(charId, true));
  }, [charactersToFetch]);

  return (
    <Container maxWidth="md" className="my-10">
      <CharacterList showCreateButton elevation={3} />

      <div className="mt-10">
        <AccordionInstance />
        <AccordionInstance />
      </div>
    </Container>
  );
};

export default Characters;
