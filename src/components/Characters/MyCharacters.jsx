import React, { useEffect } from "react";
import { useLoggedUserStore } from "stores/loggedUser";
import { listenToCharacterById } from "utils/firebase";
import CharacterList from "components/Characters/CharacterList";

const MyCharacters = () => {
  const fetchedCharacters = useLoggedUserStore(state => state.characters);
  const charactersToFetch = useLoggedUserStore(
    state => state.loggedUser?.characters,
  );

  useEffect(() => {
    const unsubscribeFunctions = charactersToFetch?.map(charId =>
      listenToCharacterById(charId),
    );
    return () => {
      unsubscribeFunctions.forEach(currFunc => currFunc());
    };
  }, [charactersToFetch]);

  return (
    <CharacterList
      elevation={3}
      showCreateButton
      characters={[...fetchedCharacters.values()]}
    />
  );
};

export default MyCharacters;
