import React, { useEffect } from "react";
import { CONTENT } from "utils/constants";
import { useCommonStoreActions } from "stores/commonStore";
import MyCharacters from "components/Characters/MyCharacters";
import ContentContainer from "components/reusable/ContentContainer";
import CharacterAccordion from "components/Characters/CharacterAccordion";

const Characters = () => {
  const { setHeaderTitle } = useCommonStoreActions();
  useEffect(() => setHeaderTitle(CONTENT.characters.title), []);

  return (
    <ContentContainer>
      <MyCharacters />

      <div className="mt-10">
        <CharacterAccordion />
        <CharacterAccordion />
      </div>
    </ContentContainer>
  );
};

export default Characters;
