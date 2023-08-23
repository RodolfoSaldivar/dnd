import classNames from "classnames";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from "@mui/material/Accordion";
import IconButton from "@mui/material/IconButton";
import { useNotesStore } from "stores/notesStore";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLoggedUserStore } from "stores/loggedUser";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteWarning from "components/reusable/DeleteWarning";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  deleteNoteFromFirebase,
  setNoteHiddenValueInDb,
  setNoteLockedValueInDb,
  listenToNoteContentById,
  updateNoteContentInFirebase,
} from "utils/firebase";

const NoteAccordion = ({ note }) => {
  const [isOpen, setIsOpen] = useState(false);
  const loggedUserId = useLoggedUserStore(state => state.userId);
  const noteContent = useNotesStore(state => state.notesContent.get(note.id));

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

  const deleteNote = () => {
    deleteNoteFromFirebase(note.ownerId, note.id);
  };

  const setLockValue = () => {
    setNoteLockedValueInDb(note.id, note.isLocked);
  };

  const setHiddenValue = () => {
    setNoteHiddenValueInDb(note.id, note.hidden);
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

          {note.ownerId === loggedUserId && (
            <>
              <IconButton
                color="warning"
                aria-label="lock"
                onClick={setHiddenValue}
              >
                {note.hidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>

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
