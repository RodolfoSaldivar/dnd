import React from "react";
import { useNotesStore } from "stores/notesStore";
import NoteAccordion from "components/Notes/NoteAccordion";

const DisplayNotes = () => {
  const allNotes = useNotesStore(state => state.allNotes);

  return (
    <div className="mt-7">
      {[...allNotes.values()].map(currNote => (
        <NoteAccordion key={currNote.id} note={currNote} />
      ))}
    </div>
  );
};

export default DisplayNotes;
