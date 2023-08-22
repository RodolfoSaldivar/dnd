import React, { useEffect } from "react";
import { CONTENT } from "utils/constants";
import Button from "@mui/material/Button";
import { useLoggedUserStore } from "stores/loggedUser";
import { useCommonStoreActions } from "stores/commonStore";
import { useCharactersStore } from "stores/charactersStore";
import ContentContainer from "components/reusable/ContentContainer";
import {
  listenToCharacterById,
  updateLastVisitedPage,
  deleteCharacterFromUser,
} from "utils/firebase";

const ViewCharacter = ({ characterId }) => {
  const { setHeaderTitle } = useCommonStoreActions();
  const loggedUserId = useLoggedUserStore(state => state.userId);
  const characterInfo = useCharactersStore(state => state[characterId]);

  useEffect(() => setHeaderTitle(CONTENT.viewCharacter.title), []);
  useEffect(() => {
    const unsub = listenToCharacterById(characterId);
    return () => {
      unsub();
    };
  }, [characterId]);

  const deleteIsEnabled = loggedUserId === characterInfo?.ownerId;

  const deleteChar = () => {
    deleteCharacterFromUser(characterInfo.ownerId, characterId);
    updateLastVisitedPage(CONTENT.characters.id);
  };

  return (
    <ContentContainer>
      <pre>{JSON.stringify(characterInfo, null, 2)}</pre>
      <br />
      {deleteIsEnabled && (
        <Button variant="contained" onClick={deleteChar}>
          Eliminar
        </Button>
      )}
    </ContentContainer>
  );
};

export default ViewCharacter;
