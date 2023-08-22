import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from "@mui/material/Accordion";
import IconButton from "@mui/material/IconButton";
import { useNotesStore } from "stores/notesStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLoggedUserStore } from "stores/loggedUser";
import DeleteWarning from "components/reusable/DeleteWarning";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  deleteNoteFromFirebase,
  updateNoteContentInFirebase,
} from "utils/firebase";

const NoteAccordion = ({ note }) => {
  const loggedUserId = useLoggedUserStore(state => state.userId);
  const notesContent = useNotesStore(state => state.notesContent);

  const onNoteChange = noteId => event => {
    updateNoteContentInFirebase(noteId, event.target.value);
  };

  const deleteNote = (userId, noteId) => () =>
    deleteNoteFromFirebase(userId, noteId);

  return (
    <Accordion key={note.id} elevation={3}>
      <AccordionSummary
        id={`noteAccordion-${note.id}-header`}
        aria-controls={`noteAccordion-${note.id}-content`}
      >
        <div className="flex w-full items-center gap-5 text-lg font-medium">
          <div className="flex-1">{note.title}</div>
          {note.ownerId === loggedUserId && (
            <>
              <IconButton aria-label="update" size="large" color="primary">
                <EditIcon fontSize="inherit" />
              </IconButton>
              <DeleteWarning deleteFunction={deleteNote(note.ownerId, note.id)}>
                <IconButton aria-label="delete" size="large" color="error">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </DeleteWarning>
            </>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <TextareaAutosize
          value={notesContent.get(note.id)}
          onChange={onNoteChange(note.id)}
          className="w-full rounded-lg border p-4 outline-none ring-transparent"
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default NoteAccordion;
