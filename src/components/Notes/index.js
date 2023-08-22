import React, { useEffect } from "react";
import ContentContainer from "components/reusable/ContentContainer";
import { useCommonStoreActions } from "stores/commonStore";
import { CONTENT } from "utils/constants";

const Notes = () => {
  const { setHeaderTitle } = useCommonStoreActions();
  useEffect(() => setHeaderTitle(CONTENT.notes.title), []);

  return (
    <ContentContainer>
      <div>hi</div>
    </ContentContainer>
  );
};

export default Notes;
