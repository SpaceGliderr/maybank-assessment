import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import NavigationDrawer from "./NavigationDrawer";

const PageLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavigationDrawer />
      <Box component="div" sx={{ flex: "1 1 auto", marginRight: "2.5em" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default PageLayout;
