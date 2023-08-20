import React from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

const CharacterCard = () => {
  return (
    <Paper
      elevation={3}
      className="flex w-[250px] cursor-pointer items-center p-4"
    >
      <Avatar
        alt="Vistra"
        src="/broken-image.jpg"
        className="font-medium"
        sx={{ width: 50, height: 50, fontSize: 25 }}
      />

      <div className="ml-4 font-medium">
        <p className="t text-xl">Vistra</p>
        <p className="text-sm">Cleric nivel 1</p>
      </div>
    </Paper>
  );
};

export default CharacterCard;
