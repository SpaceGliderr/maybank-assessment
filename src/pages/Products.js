import ProductListing from "../components/ProductListing";
import { Typography, Divider } from "@mui/material";

const Products = () => {
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        Product Listing
      </Typography>
      <Divider sx={{ margin: "10px 0 20px" }} />
      <ProductListing />
    </>
  );
};

export default Products;
