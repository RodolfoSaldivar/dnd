import _ from "lodash";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteNoteBtn from "components/Notes/DeleteNoteBtn";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNotesStore, useNotesStoreActions } from "stores/notesStore";
import { createNewNote, updateCompleteNoteInDb } from "utils/firebase";
import { convertSetToObject, getUsersWithoutLoggedOne } from "utils/helpers";

const SaveNote = () => {
  const [title, setTitle] = useState("");
  const [hidden, setHidden] = useState(false);
  const [triedToSave, setTriedToSave] = useState(false);
  const [collaborators, setCollaborators] = useState(new Set());

  const allUsers = getUsersWithoutLoggedOne();
  const noteToUpdate = useNotesStore(state => state.noteToUpdate);
  const saveModalIsOpen = useNotesStore(state => state.saveModalIsOpen);
  const { setNoteToUpdate, setSaveModalIsOpen } = useNotesStoreActions();

  useEffect(() => {
    if (!noteToUpdate) return;

    setTitle(noteToUpdate.title);
    setHidden(!!noteToUpdate.hidden);
    setCollaborators(new Set(_.values(noteToUpdate.collaborators)));
  }, [noteToUpdate]);

  const closeModal = () => {
    setSaveModalIsOpen(false);

    setTimeout(() => {
      setTitle("");
      setHidden(false);
      setTriedToSave(false);
      setCollaborators(new Set());

      setNoteToUpdate(null);
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

    const noteValues = {
      title,
      hidden,
      collaborators: convertSetToObject(collaborators),
    };

    if (noteToUpdate) {
      updateCompleteNoteInDb({ ...noteToUpdate, ...noteValues });
    } else {
      createNewNote(noteValues);
    }
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

        <div className="mt-5">
          <FormControlLabel
            label="Oculta"
            control={
              <Checkbox
                sx={{ paddingY: 0.5 }}
                checked={hidden}
                onChange={event => setHidden(event.target.checked)}
              />
            }
          />
        </div>

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

          {noteToUpdate && (
            <div className="ml-5 sm:hidden">
              <DeleteNoteBtn
                note={noteToUpdate}
                callbackFunction={closeModal}
              />
            </div>
          )}
        </div>
      </form>
    </Dialog>
  );
};

export default SaveNote;
