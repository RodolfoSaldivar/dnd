export const CONTENT = {
  notes: { id: "notes", title: "Notas" },
  characters: { id: "characters", title: "Personajes" },
  viewCharacter: { id: "viewCharacter", title: "Ver/Editar Personaje" },
  createCharacter: { id: "createCharacter", title: "Crear Personaje" },
};

export const isIOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);
