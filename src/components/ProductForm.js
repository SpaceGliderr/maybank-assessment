import {
  Box,
  Button,
  Divider,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { upsertProduct } from "../api";

const ProductForm = () => {
  const [productDetails, setProductDetails] = useState(null);

  const onSubmitForm = (event) => {
    upsertProduct(productDetails);
    console.log("Products >>> ", localStorage.getItem("products"));
    event.preventDefault(); // TODO: Remove this at a later date, this is just for testing purposes
  };

  const onInputChange = (event) => {
    setProductDetails({
      ...productDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box component="div" sx={{ display: "block" }}>
      <Typography variant="h4">Create Product</Typography>
      <Divider />
      <Box component="form" onSubmit={onSubmitForm} sx={{ display: "block" }}>
        <Box component="div" sx={{ display: "block" }}>
          <FormLabel sx={{ display: "block" }}>Product SKU</FormLabel>
          <TextField
            name="productSKU"
            variant="outlined"
            placeholder="Enter product SKU"
            onChange={onInputChange}
          />
        </Box>
        <Box component="div" sx={{ display: "block" }}>
          <FormLabel sx={{ display: "block" }}>Product Name</FormLabel>
          <TextField
            name="productName"
            variant="outlined"
            placeholder="Enter product name"
            onChange={onInputChange}
          />
        </Box>
        <Box component="div" sx={{ display: "block" }}>
          <FormLabel sx={{ display: "block" }}>Product Quantity</FormLabel>
          <TextField
            name="productQuantity"
            variant="outlined"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            placeholder="Enter product quantity"
            onChange={onInputChange}
          />
        </Box>
        <Box component="div" sx={{ display: "block" }}>
          <Button type="submit">Create</Button>
          <Button>Cancel</Button>
          {/* TODO: Remove temp button to clear local storage */}
          <Button
            onClick={() => {
              localStorage.clear();
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductForm;
