import ProductListing from "../components/ProductListing";
import { Typography, Divider } from "@mui/material";

const Products = () => {
  return (
    <>
      <Typography variant="h4">Product Listings</Typography>
      <Divider />
      <ProductListing />
    </>
  );
};

export default Products;
