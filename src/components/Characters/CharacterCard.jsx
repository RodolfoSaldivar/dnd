import React from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { CONTENT } from "utils/constants";
import Typography from "@mui/material/Typography";
import { updateLastVisitedPage } from "utils/firebase";

const CharacterCard = ({ elevation, character }) => {
  return (
    <Paper
      elevation={elevation}
      className="flex min-w-[250px] cursor-pointer items-center p-4"
      onClick={() =>
        updateLastVisitedPage(CONTENT.viewCharacter.id, {
          characterId: character.id,
        })
      }
    >
      <Avatar
        alt={character.name}
        className="font-medium"
        src={character.image || " "}
        sx={{ width: 50, height: 50, fontSize: 25 }}
      />

      <div className="ml-4 flex-1 font-medium">
        <Typography noWrap variant="h5" width={150}>
          {character.name}
        </Typography>
        <p className="text-sm">{`${character.clase} nivel ${character.level}`}</p>
      </div>
    </Paper>
  );
};

export default CharacterCard;
