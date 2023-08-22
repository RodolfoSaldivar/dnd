import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import { isSubstringOf } from "utils/helpers";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLoggedUserStore } from "stores/loggedUser";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNotesStore, useNotesStoreActions } from "stores/notesStore";

const NotesHeader = () => {
  const [onlyMines, setOnlyMines] = useState(false);
  const [filterText, setFilterText] = useState("");
  const allNotes = useNotesStore(state => state.allNotes);
  const loggedUserId = useLoggedUserStore(state => state.userId);
  const { setSaveModalIsOpen, setNotesToDisplay } = useNotesStoreActions();

  useEffect(() => {
    setNotesToDisplay(new Map(allNotes));
  }, [allNotes]);

  useEffect(() => {
    if (!filterText && !onlyMines) setNotesToDisplay(new Map(allNotes));

    let tempNotes = new Map(allNotes);
    if (filterText) {
      tempNotes = new Map(
        [...tempNotes].filter(([, { title }]) =>
          isSubstringOf(filterText, title),
        ),
      );
    }
    if (onlyMines) {
      tempNotes = new Map(
        [...tempNotes].filter(([, { ownerId }]) => ownerId === loggedUserId),
      );
    }
    setNotesToDisplay(tempNotes);
  }, [filterText, onlyMines, loggedUserId]);

  const addNewNote = event => {
    event.preventDefault();
    setSaveModalIsOpen(true);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <TextField
        value={filterText}
        variant="outlined"
        autoComplete="off"
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

      <div>
        <FormControlLabel
          label="Mias"
          control={
            <Checkbox
              checked={onlyMines}
              onChange={event => setOnlyMines(event.target.checked)}
            />
          }
        />
        <FormControlLabel
          label="Colaborador"
          control={
            <Checkbox
              checked={onlyMines}
              onChange={event => setOnlyMines(event.target.checked)}
            />
          }
        />
      </div>

      <div className="flex flex-1 items-center justify-end">
        <button
          onClick={addNewNote}
          className="cursor-pointer rounded-full bg-[#1976d2] p-3 text-white shadow-xl"
        >
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default NotesHeader;
