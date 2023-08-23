import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useLoggedUserStore } from "stores/loggedUser";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNotesStoreActions } from "stores/notesStore";
import DeleteNoteBtn from "components/Notes/DeleteNoteBtn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { setNoteHiddenValueInDb, setNoteLockedValueInDb } from "utils/firebase";

const NoteActions = ({ note }) => {
  const { setNoteToUpdate, setSaveModalIsOpen } = useNotesStoreActions();

  const loggedUserId = useLoggedUserStore(state => state.userId);
  const canCollaborate = !!note.collaborators?.[loggedUserId];

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
          <div className="hidden sm:block">
            <IconButton
              color="warning"
              aria-label="lock"
              onClick={setHiddenValue}
            >
              {note.hidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>

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

          <div className="hidden sm:block">
            <DeleteNoteBtn note={note} />
          </div>
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
