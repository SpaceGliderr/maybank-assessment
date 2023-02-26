import {
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
      {/* TODO: Replace this with a logo */}
      <Typography variant="h4">LOGO</Typography>
      <Divider />
      <Typography variant="h6">Products</Typography>
      <List>
        {productDrawerItems.map((item) => {
          return (
            <Link
              key={item.key}
              to={item.href}
              style={{ textDecoration: "none", color: "initial" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Box
        component="div"
        sx={{ bottom: 0, position: "absolute", width: "inherit" }}
      >
        <Divider />
        <Typography variant="h4">ACCOUNTS</Typography>
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
