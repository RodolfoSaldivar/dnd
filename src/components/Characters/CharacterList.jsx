import React from "react";
import CharacterCard from "components/Characters/CharacterCard";

const CharacterList = () => {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 sm:gap-y-7 lg:grid-cols-3">
      <div className="flex justify-around">
        <CharacterCard />
      </div>
      <div className="flex justify-around">
        <CharacterCard />
      </div>
    </div>
  );
};

export default CharacterList;
