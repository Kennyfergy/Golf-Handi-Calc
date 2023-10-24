import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
// import NavStyles from "./Nav.module.css";
import "./Nav.css";
import { useSelector } from "react-redux";
import { Drawer, Button, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Nav() {
  const user = useSelector((store) => store.user);
  const [drawerOpen, setDrawerOpen] = useState(false); //state for drawer

  return (
    <div id="nav" className="nav">
      <Link to="/home">
        <div class="nav-title-container">
          <h2 className="nav-title">Golf Handi-Calc</h2>
        </div>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {/* {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )} */}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
        <Button className="menuButton" onClick={() => setDrawerOpen(true)}>
          <MenuIcon style={{ fontSize: "70px", marginRight: "20px" }} />
        </Button>

        <Drawer
          className="drawer"
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List>
            <ListItem
              button
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/home"
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/info"
            >
              <ListItemText primary="Info" />
            </ListItem>
            <ListItem
              button
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/about"
            >
              <ListItemText primary="About" />
            </ListItem>
            <ListItem
              button
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/settings"
            >
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem
              button
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/courses"
            >
              <ListItemText primary="Courses" />
            </ListItem>
            <ListItem
              button
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/rounds"
            >
              <ListItemText primary="Rounds" />
            </ListItem>

            {user.is_admin && (
              <ListItem
                button
                onClick={() => setDrawerOpen(false)}
                component={Link}
                to="/admin"
              >
                <ListItemText primary="Admin" />
              </ListItem>
            )}

            <ListItem button onClick={() => setDrawerOpen(false)}>
              <LogOutButton className="navLink" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </div>
  );
}

export default Nav;
