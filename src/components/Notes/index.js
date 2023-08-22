import React, { useEffect } from "react";
import { CONTENT } from "utils/constants";
import SaveNote from "components/Notes/SaveNote";
import NotesHeader from "components/Notes/NotesHeader";
import DisplayNotes from "components/Notes/DisplayNotes";
import { getAllNotesFromFirebase } from "utils/firebase";
import { useCommonStoreActions } from "stores/commonStore";
import ContentContainer from "components/reusable/ContentContainer";

const Notes = () => {
  const { setHeaderTitle } = useCommonStoreActions();
  useEffect(() => setHeaderTitle(CONTENT.notes.title), []);

  useEffect(() => {
    const notesUnsub = getAllNotesFromFirebase();
    return () => {
      notesUnsub();
    };
  }, []);

  return (
    <ContentContainer>
      <NotesHeader />
      <DisplayNotes />
      <SaveNote />
    </ContentContainer>
  );
};

export default Notes;
