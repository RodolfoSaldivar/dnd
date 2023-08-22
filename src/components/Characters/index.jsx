import React, { useEffect } from "react";
import { CONTENT } from "utils/constants";
import { useCommonStoreActions } from "stores/commonStore";
import MyCharacters from "components/Characters/MyCharacters";
import ContentContainer from "components/reusable/ContentContainer";
import OthersCharacters from "components/Characters/OthersCharacters";

const Characters = () => {
  const { setHeaderTitle } = useCommonStoreActions();
  useEffect(() => setHeaderTitle(CONTENT.characters.title), []);

  return (
    <ContentContainer>
      <MyCharacters />
      <OthersCharacters />
    </ContentContainer>
  );
};

export default Characters;
