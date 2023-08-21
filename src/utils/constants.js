export const CONTENT = {
  characters: { id: "characters", title: "Personajes" },
  createCharacter: { id: "createCharacter", title: "Crear Personaje" },
};

export const isIOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);
