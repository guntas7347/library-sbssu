import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { signOut } from "../../../http-requests";

const NavigationBar = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navRef = useRef(null);

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut()
      .then(() => navigate("/"))
      .catch(() => alert("Sign Out Failed"));
  };
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

  return (
    <Fragment>
      <Box sx={{ display: "flex" }} ref={navRef}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ flexGrow: 1 }}>Staff Dashboard</Typography>
            <Button color="inherit" onClick={handleSignOut}>
              Signout
            </Button>
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
            <ListButton name="Home" path="/dashboard/staff" />
            <ListButton name="Profile" path="/dashboard/staff/profile" />
            <ListButton
              name="Issue / Return Books"
              path="/dashboard/staff/issue-books"
            />
            <ListButton
              name="Manage Books"
              path="/dashboard/staff/manage-books"
            />
            <ListButton
              name="Manage Students"
              path="/dashboard/staff/manage-students"
            />
          </List>
        </Drawer>
      </Box>
    </Fragment>
  );
};

export default NavigationBar;
