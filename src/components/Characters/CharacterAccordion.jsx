import _ from "lodash";
import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import { listenToCharacterById } from "utils/firebase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCharactersStore } from "stores/charactersStore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CharacterList from "components/Characters/CharacterList";

const CharacterAccordion = ({ user }) => {
  const userCharactersInfo = useCharactersStore(state =>
    _.without(
      _.values(user.characters).map(currCharId => state[currCharId]),
      undefined,
    ),
  );

  useEffect(() => {
    const unsubscribeFunctions = _.values(user.characters).map(charId =>
      listenToCharacterById(charId),
    );
    return () => {
      unsubscribeFunctions.forEach(currFunc => currFunc());
    };
  }, [user.characters]);

  return (
    <Accordion elevation={3}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={`charAccordion-${user.id}-header`}
        aria-controls={`charAccordion-${user.id}-content`}
      >
        <span className="text-lg font-medium">{user.name}</span>
      </AccordionSummary>
      <AccordionDetails>
        <CharacterList characters={userCharactersInfo} />
      </AccordionDetails>
    </Accordion>
  );
};

export default CharacterAccordion;
