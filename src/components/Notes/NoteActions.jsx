import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLoggedUserStore } from "stores/loggedUser";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNotesStoreActions } from "stores/notesStore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteWarning from "components/reusable/DeleteWarning";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  deleteNoteFromFirebase,
  setNoteHiddenValueInDb,
  setNoteLockedValueInDb,
} from "utils/firebase";

const NoteActions = ({ note }) => {
  const { setNoteToUpdate, setSaveModalIsOpen } = useNotesStoreActions();

  const loggedUserId = useLoggedUserStore(state => state.userId);
  const canCollaborate = !!note.collaborators?.[loggedUserId];

  const deleteNote = () => {
    deleteNoteFromFirebase(note.ownerId, note.id);
  };

  const setLockValue = () => {
    setNoteLockedValueInDb(note.id, note.isLocked);
  };

  const setHiddenValue = () => {
    setNoteHiddenValueInDb(note.id, note.hidden);
  };

  const updateNote = () => {
    setNoteToUpdate(note);
    setSaveModalIsOpen(true);
  };

  return (
    <>
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

          <IconButton aria-label="update" color="primary" onClick={updateNote}>
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
    </>
  );
};

export default NoteActions;
