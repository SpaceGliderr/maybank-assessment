import {
  AppBar,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import Logo from "../assets/marketplace-logo.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

const NavigationDrawer = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  console.log(theme.breakpoints);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const productDrawerItems = [
    { key: "products", label: "Products", href: "/", icon: <ViewListIcon /> },
    {
      key: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      key: "create-product",
      label: "Create Product",
      href: "/create",
      icon: <AddBoxIcon />,
    },
  ];

  const drawer = (
    <>
      <Box component="div" sx={{ display: "block", m: "1em" }}>
        <Box component="img" src={Logo} sx={{ width: "100%" }} />
      </Box>
      <Divider sx={{ mb: "1em" }} />
      <Typography variant="subtitle2" sx={{ ml: "1em", mb: "5px" }}>
        Products
      </Typography>
      <List disablePadding>
        {productDrawerItems.map((item) => {
          return (
            <Link
              key={item.key}
              to={item.href}
              style={{ textDecoration: "none", color: "initial" }}
            >
              <ListItem disablePadding sx={{ pb: "0.2em" }}>
                <ListItemButton
                  onClick={() => {
                    setIsDrawerOpen(false);
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: "0.7em" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Box
        component="div"
        sx={{
          bottom: 0,
          position: "absolute",
          width: "inherit",
        }}
      >
        <Divider />
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            p: "20px",
          }}
        >
          <Avatar sx={{ mr: "15px" }}>NL</Avatar>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Nicholas Lee
            </Typography>
            <Typography
              variant="caption"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              nilchyyy@gmail.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );

  return (
    <>
      {desktop ? (
        <Box
          component="nav"
          sx={{
            display: "block",
            width: "20vw",
            height: "100vh",
          }}
        >
          <Drawer
            variant="permanent"
            open
            sx={{
              "& .MuiDrawer-paper": {
                width: "20vw",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      ) : (
        <>
          <AppBar component="nav" position="fixed">
            <Toolbar sx={{ p: "0.75em 1em", justifyContent: "center" }}>
              <IconButton
                onClick={() => {
                  setIsDrawerOpen(true);
                }}
                sx={{ position: "absolute", left: "1em", pl: 0 }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                component="img"
                src={Logo}
                sx={(theme) => ({
                  [theme.breakpoints.down("md")]: { width: "50%" },
                  [theme.breakpoints.only("md")]: { width: "35%" },
                })}
              />
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
            anchor="left"
            open={isDrawerOpen}
            onOpen={() => {
              setIsDrawerOpen(true);
            }}
            onClose={() => {
              setIsDrawerOpen(false);
            }}
            sx={{ "& .MuiDrawer-paper": { xs: { width: "80%" } } }}
          >
            {drawer}
          </SwipeableDrawer>
        </>
      )}
    </>
  );
};

export default NavigationDrawer;
