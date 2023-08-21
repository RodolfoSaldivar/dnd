import { CONTENT } from "utils/constants";
import React, { useEffect } from "react";
import { useCommonStoreActions } from "stores/commonStore";

const CreateCharacter = () => {
  const { setHeaderTitle } = useCommonStoreActions();
  useEffect(() => setHeaderTitle(CONTENT.createCharacter.title), []);

  return (
    <div>
      <div>Create character</div>
    </div>
  );
};

export default CreateCharacter;
