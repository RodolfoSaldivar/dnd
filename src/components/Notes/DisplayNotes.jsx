import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from "@mui/material/Accordion";
import IconButton from "@mui/material/IconButton";
import { useNotesStore } from "stores/notesStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLoggedUserStore } from "stores/loggedUser";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { updateNoteContentInFirebase } from "utils/firebase";

const DisplayNotes = () => {
  const loggedUserId = useLoggedUserStore(state => state.userId);
  const allNotes = useNotesStore(state => state.allNotes);
  const notesContent = useNotesStore(state => state.notesContent);

  const onNoteChange = noteId => event => {
    updateNoteContentInFirebase(noteId, event.target.value);
  };

  return (
    <div className="mt-7">
      {[...allNotes.values()].map(currNote => (
        <Accordion key={currNote.id} elevation={3}>
          <AccordionSummary
            id={`noteAccordion-${currNote.id}-header`}
            aria-controls={`noteAccordion-${currNote.id}-content`}
          >
            <div className="flex w-full items-center gap-5 text-lg font-medium">
              <div className="flex-1">{currNote.title}</div>
              {currNote.ownerId === loggedUserId && (
                <>
                  <IconButton aria-label="delete" size="large" color="primary">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="delete" size="large" color="error">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <TextareaAutosize
              value={notesContent.get(currNote.id)}
              onChange={onNoteChange(currNote.id)}
              className="w-full rounded-lg border p-4 outline-none ring-transparent"
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default DisplayNotes;
