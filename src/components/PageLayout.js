import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import NavigationDrawer from "./NavigationDrawer";

const PageLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavigationDrawer />
      <Box component="div" sx={{ display: "block" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default PageLayout;
