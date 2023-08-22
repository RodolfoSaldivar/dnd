import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";

const NotesHeader = () => {
  return (
    <div className="flex items-center gap-4">
      <TextField
        sx={{ flexBasis: 400 }}
        variant="outlined"
        placeholder="Titulo..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel control={<Checkbox />} label="Mias" />

      <div className="flex flex-1 items-center justify-end">
        <div className="cursor-pointer rounded-full bg-[#1976d2] p-3 text-white shadow-xl">
          <AddIcon />
        </div>
      </div>
    </div>
  );
};

export default NotesHeader;
