import React, { useEffect } from "react";
import { CONTENT } from "utils/constants";
import SaveNote from "components/Notes/SaveNote";
import NotesHeader from "components/Notes/NotesHeader";
import DisplayNotes from "components/Notes/DisplayNotes";
import { useCommonStoreActions } from "stores/commonStore";
import ContentContainer from "components/reusable/ContentContainer";
import {
  getAllNotesFromFirebase,
  getAllNotesContentFromFirebase,
} from "utils/firebase";

const Notes = () => {
  const { setHeaderTitle } = useCommonStoreActions();
  useEffect(() => setHeaderTitle(CONTENT.notes.title), []);

  useEffect(() => {
    const notesUnsub = getAllNotesFromFirebase();
    const contentUnsub = getAllNotesContentFromFirebase();
    return () => {
      notesUnsub();
      contentUnsub();
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
