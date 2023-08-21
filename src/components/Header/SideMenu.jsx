import List from "@mui/material/List";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { CONTENT } from "utils/constants";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { updateLastVisitedPage } from "utils/firebase";
import ListItemButton from "@mui/material/ListItemButton";

const ITEMS = [
  {
    icon: MenuIcon,
    id: CONTENT.characters.id,
    title: CONTENT.characters.title,
  },
];

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

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

      <Drawer anchor="left" open={isOpen} onClose={closeMenu}>
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
      </Drawer>
    </>
  );
};

export default SideMenu;
