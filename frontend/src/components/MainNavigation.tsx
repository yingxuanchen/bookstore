import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ExploreIcon from "@mui/icons-material/Explore";
import SellIcon from "@mui/icons-material/Sell";
import SettingsIcon from "@mui/icons-material/Settings";

const menuItems = [
  {
    label: "Explore",
    icon: <ExploreIcon />,
    link: "/",
  },
  { label: "Sell", icon: <SellIcon />, link: "sell" },
  { label: "Manage", icon: <SettingsIcon />, link: "manage" },
];

function MainNavigation() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const goToPage = (link: string) => {
    navigate(link);
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          Bookstore
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" anchor="left" open={open} onClose={handleDrawerClose}>
        <List>
          {menuItems.map((menuItem) => (
            <ListItem key={menuItem.label} disablePadding onClick={() => goToPage(menuItem.link)}>
              <ListItemButton>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default MainNavigation;
