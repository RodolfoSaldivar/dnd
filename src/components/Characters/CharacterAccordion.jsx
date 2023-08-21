import React from "react";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CharacterList from "components/Characters/CharacterList";
import { useLoggedUserStore } from "stores/loggedUser";

const CharacterAccordion = () => {
  const fetchedCharacters = useLoggedUserStore(state => state.characters);

  return (
    <Accordion elevation={3}>
      <AccordionSummary
        id="panel1a-header"
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
      >
        <div>Tato</div>
      </AccordionSummary>
      <AccordionDetails>
        <CharacterList characters={[...fetchedCharacters.values()]} />
      </AccordionDetails>
    </Accordion>
  );
};

export default CharacterAccordion;
