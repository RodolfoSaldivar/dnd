import _ from "lodash";
import React from "react";
import { getUsersWithoutLoggedOne } from "utils/helpers";
import CharacterAccordion from "components/Characters/CharacterAccordion";

const OthersCharacters = () => {
  const withoutLogged = getUsersWithoutLoggedOne();
  const usersWithCharacters = _.filter(
    withoutLogged,
    ({ characters }) => !!characters,
  );

  return (
    <div className="mt-10">
      {usersWithCharacters.map(currUser => (
        <CharacterAccordion key={currUser.id} user={currUser} />
      ))}
    </div>
  );
};

export default OthersCharacters;
