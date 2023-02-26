import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Typography,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import Logo from "../assets/marketplace-logo.jpg";

const NavigationDrawer = () => {
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
                <ListItemButton>
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
  );
};

export default NavigationDrawer;
