import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteNoteFromFirebase } from "utils/firebase";
import { useNotesStoreActions } from "stores/notesStore";
import DeleteWarning from "components/reusable/DeleteWarning";

const DeleteNoteBtn = ({ note }) => {
  const { setSaveModalIsOpen } = useNotesStoreActions();

  const deleteNote = () => {
    setSaveModalIsOpen(false);
    deleteNoteFromFirebase(note.ownerId, note.id);
  };

  return (
    <DeleteWarning deleteFunction={deleteNote}>
      <IconButton aria-label="delete" color="error">
        <DeleteIcon />
      </IconButton>
    </DeleteWarning>
  );
};

export default DeleteNoteBtn;
