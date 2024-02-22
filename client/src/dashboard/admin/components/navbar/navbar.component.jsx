import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { signOut } from "../../../http-requests";

const NavigationBar = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navRef = useRef(null);

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target))
      setIsDrawerOpen(false);

    // setIsDrawerOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mouseover", handleClickOutside);

    return () => {
      document.removeEventListener("mouseover", handleClickOutside);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const ListButton = ({ name, path }) => {
    return (
      <ListItem>
        <ListItem button component={Link} to={path}>
          <ListItemText primary={name} />
        </ListItem>
      </ListItem>
    );
  };

  const menuItemsArray = [
    { name: "Profile", path: "/dashboard/admin/profile" },
    { name: "Sign Out", path: "/" },
  ];

  return (
    <Fragment>
      <Box sx={{ display: "flex" }} ref={navRef}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ flexGrow: 1 }}>Admin Dashboard</Typography>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Guntas Singh"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {menuItemsArray.map((menu, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate(menu.path)}
                    >
                      {menu.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 200,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={isDrawerOpen}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
          <Divider />
          <List>
            <ListButton name="Home" path="/dashboard/admin" />
            <ListButton
              name="Issue / Return Books"
              path="/dashboard/admin/issue-books"
            />
            <ListButton
              name="Manage Fine"
              path="/dashboard/admin/manage-fines"
            />
            <ListButton
              name="Manage Books"
              path="/dashboard/admin/manage-books"
            />
            <ListButton
              name="Manage Students"
              path="/dashboard/admin/manage-students"
            />
            <ListButton
              name="Manage Staff"
              path="/dashboard/admin/manage-staff"
            />
            <ListButton
              name="Database (BETA)"
              path="/dashboard/admin/database"
            />
          </List>
        </Drawer>
      </Box>
    </Fragment>
  );
};

export default NavigationBar;
