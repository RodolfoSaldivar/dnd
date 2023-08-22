import React, { useEffect } from "react";
import { CONTENT } from "utils/constants";
import NotesHeader from "components/Notes/NotesHeader";
import { useCommonStoreActions } from "stores/commonStore";
import ContentContainer from "components/reusable/ContentContainer";

const Notes = () => {
  const { setHeaderTitle } = useCommonStoreActions();
  useEffect(() => setHeaderTitle(CONTENT.notes.title), []);

  return (
    <ContentContainer>
      <NotesHeader />
    </ContentContainer>
  );
};

export default Notes;
