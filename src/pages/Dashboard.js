import ProductListing from "../components/ProductListing";
import { Divider, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        Dashboard
      </Typography>
      <Divider sx={{ margin: "10px 0 20px" }} />
      <ProductListing isDashboard />
    </>
  );
};

export default Dashboard;
