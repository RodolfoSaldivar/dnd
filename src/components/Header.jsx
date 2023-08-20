import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useLoggedUserStore } from "stores/loggedUser";

const ButtonAppBar = () => {
  const { loggedUser } = useLoggedUserStore();

  return (
    <AppBar position="static">
      <Toolbar>
        {loggedUser && (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>

            <Button color="inherit">Log Out</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ButtonAppBar;
