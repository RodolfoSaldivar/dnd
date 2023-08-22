import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useUsersStore } from "stores/usersStore";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNotesStore, useNotesStoreActions } from "stores/notesStore";
import _ from "lodash";

const SaveNote = () => {
  const [title, setTitle] = useState("");

  const allUsers = useUsersStore();
  const { setSaveModalIsOpen } = useNotesStoreActions();
  const saveModalIsOpen = useNotesStore(state => state.saveModalIsOpen);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={saveModalIsOpen}
      onClose={() => setSaveModalIsOpen(false)}
      aria-labelledby="notesSaveModal-title"
      aria-describedby="notesSaveModal-description"
    >
      <div className="px-8 py-6 sm:px-12 sm:py-10">
        <TextField
          fullWidth
          value={title}
          label="Titulo"
          variant="standard"
          onChange={event => setTitle(event.target.value)}
        />

        <div className="mb-1 mt-5">Colaboradores:</div>

        {_.values(allUsers).map(currUser => (
          <div key={currUser.id}>
            <FormControlLabel
              label="Label"
              control={<Checkbox sx={{ paddingY: 0.5 }} />}
            />
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default SaveNote;
