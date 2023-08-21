import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useCommonStore } from "stores/commonStore";
import { logOutFromFirebase } from "utils/firebase";
import { useLoggedUserStore } from "stores/loggedUser";

const Header = () => {
  const userId = useLoggedUserStore(state => state.userId);
  const headerTitle = useCommonStore(state => state.headerTitle);

  return (
    <AppBar position="static">
      <Toolbar>
        {userId && (
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
              {headerTitle}
            </Typography>

            <Button color="inherit" onClick={logOutFromFirebase}>
              Log Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
