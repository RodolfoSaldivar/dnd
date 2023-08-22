import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { createNewNote } from "utils/firebase";
import TextField from "@mui/material/TextField";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNotesStore, useNotesStoreActions } from "stores/notesStore";
import { convertSetToObject, getUsersWithoutLoggedOne } from "utils/helpers";

const SaveNote = () => {
  const [title, setTitle] = useState("");
  const [triedToSave, setTriedToSave] = useState(false);
  const [collaborators, setCollaborators] = useState(new Set());

  const allUsers = getUsersWithoutLoggedOne();
  const { setSaveModalIsOpen } = useNotesStoreActions();
  const saveModalIsOpen = useNotesStore(state => state.saveModalIsOpen);

  const closeModal = () => {
    setSaveModalIsOpen(false);

    setTimeout(() => {
      setTitle("");
      setTriedToSave(false);
      setCollaborators(new Set());
    }, 500);
  };

  const toggleCollaborator = userId => event => {
    const { checked } = event.target;
    const functionToRun = checked ? "add" : "delete";

    setCollaborators(prevSet => {
      const updatedSet = new Set(prevSet);
      updatedSet[functionToRun](userId);
      return updatedSet;
    });
  };

  const createNote = event => {
    event.preventDefault();
    setTriedToSave(true);
    if (!title) return;
    createNewNote({
      title,
      collaborators: convertSetToObject(collaborators),
    });
    closeModal();
  };

  return (
    <Dialog fullWidth maxWidth="xs" onClose={closeModal} open={saveModalIsOpen}>
      <form
        autoComplete="off"
        onSubmit={createNote}
        className="px-8 py-6 sm:px-12 sm:py-10"
      >
        <TextField
          fullWidth
          value={title}
          label="Titulo"
          variant="standard"
          error={!title && triedToSave}
          onChange={event => setTitle(event.target.value)}
        />

        <div className="mb-1 mt-5">Colaboradores:</div>

        {allUsers.map(currUser => (
          <div key={currUser.id}>
            <FormControlLabel
              label={currUser.name}
              control={
                <Checkbox
                  sx={{ paddingY: 0.5 }}
                  checked={collaborators.has(currUser.id)}
                  onChange={toggleCollaborator(currUser.id)}
                />
              }
            />
          </div>
        ))}

        <div className="mt-4 flex justify-end sm:mt-0">
          <Button type="submit" variant="contained" endIcon={<NoteAddIcon />}>
            Guardar
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default SaveNote;
