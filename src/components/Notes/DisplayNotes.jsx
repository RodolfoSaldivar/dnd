import React from "react";
import { useNotesStore } from "stores/notesStore";
import { useLoggedUserStore } from "stores/loggedUser";
import NoteAccordion from "components/Notes/NoteAccordion";

const DisplayNotes = () => {
  const loggedUserId = useLoggedUserStore(state => state.userId);
  const notesToDisplay = useNotesStore(state => state.notesToDisplay);

  const visibleNotes = [...notesToDisplay.values()].filter(
    currNote => !currNote.hidden || currNote.ownerId === loggedUserId,
  );

  return (
    <div className="mt-7">
      {visibleNotes.map(currNote => (
        <NoteAccordion key={currNote.id} note={currNote} />
      ))}
    </div>
  );
};

export default DisplayNotes;
