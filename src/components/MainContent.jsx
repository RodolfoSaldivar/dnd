import React from "react";
import { CONTENT } from "utils/constants";
import Characters from "components/Characters";
import { useCommonStore } from "stores/commonStore";
import Login from "components/Login";

const MainContent = () => {
  const { contentToShow } = useCommonStore();

  const ComponentToShow = (() => {
    switch (contentToShow) {
      case "":
      case CONTENT.characters:
        return Characters;
      case CONTENT.createCharacter:
        return Login;
    }
  })();

  return (
    <div>
      <ComponentToShow />
    </div>
  );
};

export default MainContent;
