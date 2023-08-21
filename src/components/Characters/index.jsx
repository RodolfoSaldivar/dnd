import React, { useEffect } from "react";
import { CONTENT } from "utils/constants";
import Container from "@mui/material/Container";
import { useCommonStoreActions } from "stores/commonStore";
import MyCharacters from "components/Characters/MyCharacters";
import CharacterAccordion from "components/Characters/CharacterAccordion";

const Characters = () => {
  const { setHeaderTitle } = useCommonStoreActions();
  useEffect(() => setHeaderTitle(CONTENT.characters.title), []);

  return (
    <Container maxWidth="md" className="my-10">
      <MyCharacters />

      <div className="mt-10">
        <CharacterAccordion />
        <CharacterAccordion />
      </div>
    </Container>
  );
};

export default Characters;
