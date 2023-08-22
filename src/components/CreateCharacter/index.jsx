import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { CONTENT } from "utils/constants";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import { createNewCharacter } from "utils/firebase";
import { useCommonStoreActions } from "stores/commonStore";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import React, { useCallback, useEffect, useState } from "react";
import ContentContainer from "components/reusable/ContentContainer";

const CreateCharacter = () => {
  const { setHeaderTitle } = useCommonStoreActions();
  useEffect(() => setHeaderTitle(CONTENT.createCharacter.title), []);

  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [image, setImage] = useState("");
  const [clase, setClase] = useState("");
  const [level, setLevel] = useState("");
  const [alignment, setAlignment] = useState("");
  const [background, setBackground] = useState("");
  const [imageOpen, setImageOpen] = useState(false);
  const [triedToCreate, setTriedToCreate] = useState(false);

  const infoIsMissing =
    !name || !race || !clase || !level || !alignment || !background;

  const displayInput = useCallback(
    (label, value, setValue, required = true) => (
      <TextField
        value={value}
        label={label}
        variant="standard"
        error={required && !value && triedToCreate}
        onChange={event => setValue(event.target.value)}
      />
    ),
    [triedToCreate],
  );

  const createCharacterInDb = async event => {
    event.preventDefault();
    setTriedToCreate(true);
    if (infoIsMissing) return;
    createNewCharacter({
      name,
      race,
      clase,
      level,
      image,
      alignment,
      background,
    });
  };

  return (
    <ContentContainer>
      <form onSubmit={createCharacterInDb} autoComplete="off">
        <Paper
          elevation={3}
          className="flex flex-wrap items-center justify-around gap-4 p-4 sm:flex-nowrap"
        >
          <div className="flex flex-col items-center gap-2">
            <Avatar
              onClick={() => setImageOpen(true)}
              alt={name}
              src={image}
              className="cursor-pointer font-medium"
              sx={{ width: 100, height: 100, fontSize: 50 }}
            />
            <Backdrop
              sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
              open={imageOpen}
              onClick={() => setImageOpen(false)}
            >
              <Avatar
                alt={name}
                src={image}
                variant="rounded"
                className="font-semibold"
                sx={{ width: 300, height: 300, fontSize: 75 }}
              />
            </Backdrop>

            {displayInput("URL de imagen", image, setImage, false)}
          </div>

          <div>
            {displayInput("Nombre", name, setName)}
            <br />
            <br />
            {displayInput("Raza", race, setRace)}
          </div>

          <div>
            {displayInput("Clase", clase, setClase)}
            <br />
            <br />
            {displayInput("Nivel", level, setLevel)}
          </div>

          <div>
            {displayInput("Trasfondo", background, setBackground)}
            <br />
            <br />
            {displayInput("Alineamiento", alignment, setAlignment)}
          </div>
        </Paper>

        <div className="mt-4 flex justify-end">
          <Button
            variant="contained"
            endIcon={<AddReactionIcon />}
            type="submit"
          >
            Crear
          </Button>
        </div>
      </form>
    </ContentContainer>
  );
};

export default CreateCharacter;
