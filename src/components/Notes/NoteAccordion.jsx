import _ from "lodash";
import React, { useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from "@mui/material/Accordion";
import IconButton from "@mui/material/IconButton";
import { useNotesStore } from "stores/notesStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLoggedUserStore } from "stores/loggedUser";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteWarning from "components/reusable/DeleteWarning";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  deleteNoteFromFirebase,
  setNoteLockedValueInDb,
  listenToNoteContentById,
  updateNoteContentInFirebase,
} from "utils/firebase";

const NoteAccordion = ({ note }) => {
  const loggedUserId = useLoggedUserStore(state => state.userId);
  const noteContent = useNotesStore(state => state.notesContent.get(note.id));

  const canCollaborate = _.findKey(
    note.collaborators,
    currCollId => currCollId === loggedUserId,
  );
  const canType = note.ownerId === loggedUserId || canCollaborate;

  useEffect(() => {
    const unsub = listenToNoteContentById(note.id);
    return () => {
      unsub();
    };
  }, [note.id]);

  const onNoteChange = event => {
    updateNoteContentInFirebase(note.id, event.target.value);
  };

  const deleteNote = () => {
    deleteNoteFromFirebase(note.ownerId, note.id);
  };

  const setLockValue = () => {
    setNoteLockedValueInDb(note.id, note.isLocked);
  };

  return (
    <Accordion key={note.id} elevation={3}>
      <AccordionSummary
        id={`noteAccordion-${note.id}-header`}
        aria-controls={`noteAccordion-${note.id}-content`}
      >
        <div className="flex w-full items-center gap-3 text-lg font-medium">
          <div className="flex-1">{note.title}</div>
          {note.ownerId === loggedUserId && (
            <>
              <IconButton
                color="secondary"
                aria-label="lock"
                onClick={setLockValue}
              >
                {note.isLocked ? <LockIcon /> : <LockOpenIcon />}
              </IconButton>
              <IconButton aria-label="update" color="primary">
                <EditIcon />
              </IconButton>
              <DeleteWarning deleteFunction={deleteNote}>
                <IconButton aria-label="delete" color="error">
                  <DeleteIcon />
                </IconButton>
              </DeleteWarning>
            </>
          )}
          {canCollaborate && (
            <IconButton aria-label="lock">
              {note.isLocked ? <LockIcon /> : <LockOpenIcon />}
            </IconButton>
          )}
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
