import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNotesStore, useNotesStoreActions } from "stores/notesStore";

const NotesHeader = () => {
  const [onlyMines, setOnlyMines] = useState(false);
  const [filterText, setFilterText] = useState("");

  const { setSaveModalIsOpen } = useNotesStoreActions();

  const allNotes = useNotesStore(state => state.allNotes);

  const addNewNote = event => {
    event.preventDefault();
    setSaveModalIsOpen(true);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={addNewNote}
      className="flex items-center gap-4"
    >
      <TextField
        value={filterText}
        variant="outlined"
        placeholder="Titulo..."
        onChange={event => setFilterText(event.target.value)}
        sx={{ flexBasis: 400 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel
        label="Mias"
        control={
          <Checkbox
            checked={onlyMines}
            onChange={event => setOnlyMines(event.target.checked)}
          />
        }
      />

      <div className="flex flex-1 items-center justify-end">
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-[#1976d2] p-3 text-white shadow-xl"
        >
          <AddIcon />
        </button>
      </div>
    </form>
  );
};

export default NotesHeader;
