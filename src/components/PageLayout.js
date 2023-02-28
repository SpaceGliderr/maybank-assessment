import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import NavigationDrawer from "./NavigationDrawer";

const PageLayout = () => {
  return (
    <Box sx={{ display: { lg: "flex" } }}>
      <NavigationDrawer />
      <Box
        component="div"
        sx={{
          flex: { lg: "1 1 auto" },
          m: {
            xs: "6.5em 1em 0",
            sm: "7em 1em 0",
            md: "7em 2em 0",
            lg: "0 2.5em",
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default PageLayout;
