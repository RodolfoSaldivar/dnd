import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { CONTENT } from "utils/constants";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import { useCommonStoreActions } from "stores/commonStore";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import React, { useCallback, useEffect, useState } from "react";
import ContentContainer from "components/reusable/ContentContainer";
import { createNewCharacter, updateLastVisitedPage } from "utils/firebase";

const CreateCharacter = () => {
  const { setHeaderTitle } = useCommonStoreActions();
  useEffect(() => setHeaderTitle(CONTENT.createCharacter.title), []);

  const [imageOpen, setImageOpen] = useState(false);
  const [triedToCreate, setTriedToCreate] = useState(false);
  const [btnIsDisabled, setBtnIsDisabled] = useState(false);

  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [image, setImage] = useState("");
  const [clase, setClase] = useState("");
  const [level, setLevel] = useState("");
  const [alignment, setAlignment] = useState("");
  const [background, setBackground] = useState("");

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
    setBtnIsDisabled(true);
    createNewCharacter({
      name,
      race,
      clase,
      level,
      image,
      alignment,
      background,
    });
    updateLastVisitedPage(CONTENT.characters.id);
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
              alt={name}
              src={image}
              onClick={() => setImageOpen(true)}
              className="cursor-pointer font-medium"
              sx={{ width: 100, height: 100, fontSize: 50 }}
            />
            <Backdrop
              open={imageOpen}
              onClick={() => setImageOpen(false)}
              sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
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
            type="submit"
            variant="contained"
            disabled={btnIsDisabled}
            endIcon={<AddReactionIcon />}
          >
            Crear
          </Button>
        </div>
      </form>
    </ContentContainer>
  );
};

export default CreateCharacter;
