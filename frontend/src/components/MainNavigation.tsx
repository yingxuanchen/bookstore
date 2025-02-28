import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ExploreIcon from "@mui/icons-material/Explore";
import SellIcon from "@mui/icons-material/Sell";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginModal from "./LoginModal";
import { authStore } from "../stores/authStore";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const navigationItems = [
  {
    label: "Explore",
    icon: <ExploreIcon />,
    link: "/",
  },
  { label: "Read", icon: <AutoStoriesIcon />, link: "read" },
  { label: "Sell", icon: <SellIcon />, link: "sell", role: "seller" },
  { label: "Manage", icon: <SettingsIcon />, link: "manage", role: "admin" },
];

function MainNavigation() {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { state: authState, dispatch: dispatchAuth } = useContext(authStore);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const goToPage = (link: string) => {
    navigate(link);
    setOpenDrawer(false);
  };

  const handleLogin = () => {
    setOpenModal(true);
  };

  const handleLoginModalClose = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    dispatchAuth({ type: "LOGOUT" });
    handleMenuClose();
  };

  return (
    <>
      <LoginModal open={openModal} onClose={handleLoginModalClose} />
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
                openDrawer && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography sx={{ flexGrow: 1, textAlign: "left" }}>Bookstore</Typography>
            {authState.username ? (
              <>
                <Button
                  variant="text"
                  color="inherit"
                  startIcon={<AccountCircle />}
                  sx={{ textTransform: "none" }}
                  onClick={handleMenuOpen}
                >
                  {authState.username}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                Login / Signup
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="temporary" anchor="left" open={openDrawer} onClose={handleDrawerClose}>
          <List>
            {navigationItems.map(
              (item) =>
                (!item.role || authState.roles.includes(item.role)) && (
                  <ListItem key={item.label} disablePadding onClick={() => goToPage(item.link)}>
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                )
            )}
          </List>
        </Drawer>
      </Box>
    </>
  );
}

export default MainNavigation;
