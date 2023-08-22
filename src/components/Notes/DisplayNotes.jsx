import React from "react";
import { useNotesStore } from "stores/notesStore";
import NoteAccordion from "components/Notes/NoteAccordion";

const DisplayNotes = () => {
  const notesToDisplay = useNotesStore(state => state.notesToDisplay);

  return (
    <div className="mt-7">
      {[...notesToDisplay.values()].map(currNote => (
        <NoteAccordion key={currNote.id} note={currNote} />
      ))}
    </div>
  );
};

export default DisplayNotes;
