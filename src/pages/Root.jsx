import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Avatar, createTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Create,
  DarkMode,
  Home,
  Logout,
  Person,
  Menu,
  Settings,
  WbSunny,
} from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";

const drawerWidth = 240;
function Root() {
  const [Mymode, setMymode] = useState(
    localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
  );
  const [noneorblock, setnoneorblock] = useState("none");
  const [varianto, setvariant] = useState("permanent");
  const handlemode = () => {
    setMymode(Mymode === "light" ? "dark" : "light");
    localStorage.setItem("mode", `${Mymode}`);
    localStorage.getItem("mode") === "light"
      ? localStorage.setItem("mode", "dark")
      : localStorage.setItem("mode", "light");
  };
  const darkTheme = createTheme({
    palette: {
      mode: Mymode, // Change to false or 'dark' for a dark palette. Try it!
    },
    ousey: {
      color: "grey",
    },
  });
  let location = useLocation();
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              color: "inherit",
              width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
              ml: `${drawerWidth}px`,
            }}
          >
            <div className="nav-bar">
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    sx={{
                      display: { xs: "block , flex", sm: "none" },
                      mr: "5px",

                      alignSelf: "center",
                    }}
                    onClick={() => {
                      setnoneorblock("block");
                      setvariant("temporary");
                    }}
                  >
                    <Menu />
                  </IconButton>

                  <Link
                    id="Linko"
                    to="home"
                    color="inherit"
                    sx={{ display: "flex", flexGrow: 1 }}
                    underline="none"
                    className="linkinroot"
                  >
                    MY exprenses
                  </Link>

                  <Button color="inherit">Login</Button>
                  <Avatar alt="ousey-ousey" src="/2.png" />
                </Toolbar>
              </AppBar>
            </div>
          </AppBar>
          <Drawer
            sx={{
              width: "240px",
              flexShrink: 0,
              display: { xs: noneorblock, sm: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                component: "main",
                boxSizing: "border-box",
              },
            }}
            variant={varianto}
            open={true}
            onClose={() => {
              setnoneorblock("none");
              setvariant("permanent");
            }}
            anchor="left"
          >
            {}{" "}
            <IconButton
              sx={{
                padding: "5px",
                width: 50,
                height: 50,
                margin: "7px auto ",
              }}
              size="large"
              edge="start"
              color="inherit"
              width="50px"
              onClick={() => {
                handlemode();
              }}
            >
              {Mymode === "light" ? (
                <WbSunny margin="0" width="10px" />
              ) : (
                <DarkMode margin="0" width="10px" />
              )}
            </IconButton>
            <List>
              {["Home", "Create", "Profile", "settings", "Logout"].map(
                (text, index) => (
                  <ListItem
                    key={text}
                    sx={{
                      bgcolor:
                        location.pathname === `${"/" + text}`
                          ? darkTheme.ousey.color
                          : "inherit",
                    }}
                    disablePadding
                    onClick={() => {
                      navigate(text);
                      console.log(location.pathname);
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        {index === 0 ? (
                          <Home />
                        ) : index === 1 ? (
                          <Create />
                        ) : index === 2 ? (
                          <Person />
                        ) : index === 3 ? (
                          <Settings />
                        ) : (
                          <Logout />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          </Drawer>
          <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
            <Toolbar />
            <Box
              sx={{
                bgcolor: "background.paper",
                display: "flex",
                justifyContent: "center",
                component: "main",

                // border: "red solid 1px",
                padding: 0,
                m: 0,
                width: "100%",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Root;
