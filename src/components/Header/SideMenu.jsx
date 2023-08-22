import List from "@mui/material/List";
import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import { CONTENT, isIOS } from "utils/constants";
import IconButton from "@mui/material/IconButton";
import Groups3Icon from "@mui/icons-material/Groups3";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { updateLastVisitedPage } from "utils/firebase";
import ListItemButton from "@mui/material/ListItemButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import DescriptionIcon from '@mui/icons-material/Description';

const ITEMS = [
  {
    icon: Groups3Icon,
    id: CONTENT.characters.id,
    title: CONTENT.characters.title,
  },
  {
    icon: DescriptionIcon,
    id: CONTENT.notes.id,
    title: CONTENT.notes.title,
  },
];

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onOpen={openMenu}
        onClose={closeMenu}
        disableDiscovery={isIOS}
        disableSwipeToOpen={false}
        disableBackdropTransition={!isIOS}
      >
        <br />
        <List>
          {ITEMS.map(currItem => (
            <ListItem key={currItem.id} disablePadding>
              <ListItemButton
                sx={{ padding: "8px 80px 8px 24px" }}
                onClick={() => {
                  closeMenu();
                  updateLastVisitedPage(currItem.id);
                }}
              >
                <ListItemIcon sx={{ minWidth: 44 }}>
                  <currItem.icon />
                </ListItemIcon>
                <ListItemText primary={currItem.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default SideMenu;
