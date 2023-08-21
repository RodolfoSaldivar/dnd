import React from "react";
import { CONTENT } from "utils/constants";
import AddIcon from "@mui/icons-material/Add";
import { updateLastVisitedPage } from "utils/firebase";
import CharacterCard from "components/Characters/CharacterCard";

const CharacterList = ({ showCreateButton = false, elevation = 2 }) => {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 sm:gap-y-7 lg:grid-cols-3">
      <div className="flex justify-around">
        <CharacterCard elevation={elevation} />
      </div>
      <div className="flex justify-around">
        <CharacterCard elevation={elevation} />
      </div>

      {showCreateButton && (
        <div className="flex justify-around">
          <div
            onClick={() => updateLastVisitedPage(CONTENT.createCharacter)}
            className="flex min-h-[80px] w-[250px] animate-pulse cursor-pointer items-center justify-around rounded-md bg-gray-100 font-bold text-blue-400"
          >
            Crear Personaje
            <AddIcon fontSize="large" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
