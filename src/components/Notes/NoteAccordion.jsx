import classNames from "classnames";
import Accordion from "@mui/material/Accordion";
import { useNotesStore } from "stores/notesStore";
import React, { useEffect, useState } from "react";
import NoteActions from "components/Notes/NoteActions";
import { useLoggedUserStore } from "stores/loggedUser";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  listenToNoteContentById,
  updateNoteContentInFirebase,
} from "utils/firebase";

const NoteAccordion = ({ note }) => {
  const [isOpen, setIsOpen] = useState(false);
  const noteContent = useNotesStore(state => state.notesContent.get(note.id));

  const loggedUserId = useLoggedUserStore(state => state.userId);
  const canCollaborate = !!note.collaborators?.[loggedUserId];
  const canType = note.ownerId === loggedUserId || canCollaborate;

  useEffect(() => {
    const unsub = listenToNoteContentById(note.id);
    return () => {
      unsub();
    };
  }, [note.id]);

  const toggleIsOpen = () => setIsOpen(state => !state);

  const onNoteChange = event => {
    updateNoteContentInFirebase(note.id, event.target.value);
  };

  return (
    <Accordion key={note.id} elevation={3} expanded={isOpen}>
      <AccordionSummary
        id={`noteAccordion-${note.id}-header`}
        aria-controls={`noteAccordion-${note.id}-content`}
      >
        <div className="flex w-full items-center gap-1 text-lg font-medium">
          <div
            onClick={toggleIsOpen}
            className={classNames(
              "flex-1",
              isOpen ? "-my-6 py-6" : "-my-3 py-3",
            )}
          >
            {note.title}
          </div>

          <NoteActions note={note} />
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <TextareaAutosize
          value={noteContent}
          onChange={onNoteChange}
          disabled={!canType || note.isLocked}
          className="w-full rounded-lg border p-4 outline-none ring-transparent"
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default NoteAccordion;
