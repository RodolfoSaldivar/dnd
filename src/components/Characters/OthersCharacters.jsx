import _ from "lodash";
import React, { useEffect } from "react";
import { useUsersStore } from "stores/usersStore";
import { useLoggedUserStore } from "stores/loggedUser";
import { getAllUsersFromFirebase } from "utils/firebase";
import CharacterAccordion from "components/Characters/CharacterAccordion";

const OthersCharacters = () => {
  const allUsers = useUsersStore();
  const loggedUserId = useLoggedUserStore(state => state.userId);

  useEffect(() => getAllUsersFromFirebase(), []);

  const usersWithCharacters = _.filter(allUsers, currUser => {
    if (currUser.id === loggedUserId) return false;
    return !!currUser.characters;
  });

  return (
    <div className="mt-10">
      {usersWithCharacters.map(currUser => (
        <CharacterAccordion key={currUser.id} user={currUser} />
      ))}
    </div>
  );
};

export default OthersCharacters;
