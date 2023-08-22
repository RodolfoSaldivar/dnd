import React, { useEffect } from "react";
import { CONTENT } from "utils/constants";
import SaveNote from "components/Notes/SaveNote";
import NorthIcon from "@mui/icons-material/North";
import IconButton from "@mui/material/IconButton";
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

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <ContentContainer>
      <NotesHeader />
      <DisplayNotes />
      <SaveNote />

      <div className="sticky bottom-5 float-right mt-10">
        <div className="rounded-full bg-blue-200 opacity-80">
          <IconButton
            size="large"
            color="primary"
            aria-label="update"
            onClick={scrollTop}
          >
            <NorthIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    </ContentContainer>
  );
};

export default Notes;
