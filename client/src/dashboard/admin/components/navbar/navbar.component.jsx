import { Fragment, useState } from "react";
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

const ADMIN_NavigationBar = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSignOut = () => {
    console.log("Signout triggered...");
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ flexGrow: 1 }}>Admin Dashboard</Typography>
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
            <ListItem>
              <ListItem button component={Link} to="/dashboard/admin">
                <ListItemText primary="Home" />
              </ListItem>
            </ListItem>
            <ListItem>
              <ListItem button component={Link} to="/dashboard/admin/profile">
                <ListItemText primary="Profile" />
              </ListItem>
            </ListItem>
            <ListItem>
              <ListItem
                button
                component={Link}
                to="/dashboard/admin/issue-book"
              >
                <ListItemText primary="Issue Book" />
              </ListItem>
            </ListItem>
            <ListItem>
              <ListItem
                button
                component={Link}
                to="/dashboard/admin/manage-books"
              >
                <ListItemText primary="Manage Books" />
              </ListItem>
            </ListItem>
            <ListItem>
              <ListItem
                button
                component={Link}
                to="/dashboard/admin/manage-students"
              >
                <ListItemText primary="Manage Students" />
              </ListItem>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </Fragment>
  );
};

export default ADMIN_NavigationBar;
