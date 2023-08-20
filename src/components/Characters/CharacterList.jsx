import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useCommonStoreActions } from "stores/commonStore";
import CharacterCard from "components/Characters/CharacterCard";

const CharacterList = () => {
  const { setHeaderTitle } = useCommonStoreActions();

  useEffect(() => setHeaderTitle("Personajes"), []);

  return (
    <Container maxWidth="md" className="mt-10">
      <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 sm:gap-y-7 lg:grid-cols-3">
        <div className="flex justify-around">
          <CharacterCard />
        </div>
      </div>

      <div className="mt-10">Hello</div>
    </Container>
  );
};

export default CharacterList;
