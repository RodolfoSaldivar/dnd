import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import UndoIcon from "@mui/icons-material/Undo";
import WarningIcon from "@mui/icons-material/Warning";
import React, { cloneElement, useCallback, useEffect, useState } from "react";

const DeleteWarning = ({ children, deleteFunction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsDisabled, setDeleteIsDisabled] = useState(true);

  useEffect(() => {
    if (!isOpen && !deleteIsDisabled) {
      setDeleteIsDisabled(true);
    }
  }, [isOpen, deleteIsDisabled]);

  const openDialog = () => {
    setIsOpen(true);
    setTimeout(() => setDeleteIsDisabled(false), 1000);
  };
  const closeDialog = () => {
    setIsOpen(false);
    setDeleteIsDisabled(true);
  };

  const deleteForEver = () => {
    closeDialog();
    deleteFunction();
  };

  const ComponentAskingToDelete = useCallback(
    () =>
      cloneElement(children, {
        onClick: openDialog,
      }),
    [children],
  );
  return (
    <>
      <ComponentAskingToDelete />

      <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={closeDialog}>
        <div className="p-10">
          <div className="flex items-center justify-center gap-4">
            <WarningIcon className="text-red-500" fontSize="large" />
            <span className="text-xl font-bold">¿Borrar para siempre?</span>
          </div>

          <div className="mt-8 flex items-center justify-around gap-4">
            <Button
              variant="contained"
              onClick={closeDialog}
              endIcon={<UndoIcon />}
            >
              No, regresar
            </Button>

            <Button
              color="error"
              variant="contained"
              onClick={deleteForEver}
              disabled={deleteIsDisabled}
            >
              Si
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteWarning;
