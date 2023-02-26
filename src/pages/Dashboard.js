import ProductListing from "../components/ProductListing";
import { Divider, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Typography variant="h4">Dashboard</Typography>
      <Divider />
      <ProductListing />
    </>
  );
};

export default Dashboard;
