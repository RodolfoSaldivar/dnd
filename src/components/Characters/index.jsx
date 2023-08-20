import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useCommonStoreActions } from "stores/commonStore";
import CharacterList from "components/Characters/CharacterList";
import AccordionInstance from "components/Characters/AccordionInstance";

const Characters = () => {
  const { setHeaderTitle } = useCommonStoreActions();

  useEffect(() => setHeaderTitle("Personajes"), []);

  return (
    <Container maxWidth="md" className="my-10">
      <CharacterList />

      <div className="mt-10">
        <AccordionInstance />
        <AccordionInstance />
      </div>
    </Container>
  );
};

export default Characters;
