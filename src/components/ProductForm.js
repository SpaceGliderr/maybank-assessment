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

const ProductForm = (props) => {
  const { editProductDetails } = props;

  const [productDetails, setProductDetails] = useState(
    editProductDetails || { productQuantity: 0 }
  );

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
      <Typography variant="h4" sx={{ mt: "20px" }}>
        {editProductDetails ? "Edit" : "Create"} Product
      </Typography>
      <Divider sx={{ m: "10px 0 20px" }} />
      <Box
        component="form"
        onSubmit={onSubmitForm}
        sx={{ display: "flex", flexDirection: "column", gap: "1em" }}
      >
        <FormLabel sx={{ display: "block" }}>Product SKU</FormLabel>
        <TextField
          name="productSKU"
          variant="outlined"
          placeholder="Enter product SKU"
          value={productDetails.productSKU || ""}
          onChange={onInputChange}
          sx={{ width: "80%" }}
        />
        <FormLabel sx={{ display: "block" }}>Product Name</FormLabel>
        <TextField
          name="productName"
          variant="outlined"
          placeholder="Enter product name"
          value={productDetails.productName || ""}
          onChange={onInputChange}
          sx={{ width: "80%" }}
        />
        {/* TODO: Change Product Quantity input to have two more buttons on each side to increase / decrease the quantity */}
        <FormLabel sx={{ display: "block" }}>Product Quantity</FormLabel>
        <TextField
          name="productQuantity"
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={productDetails.productQuantity}
          onChange={onInputChange}
          sx={{ width: "80%" }}
        />
        <Box component="div" sx={{ display: "block" }}>
          <Button type="submit">
            {editProductDetails ? "Save" : "Create"}
          </Button>
          {!editProductDetails && (
            <Button
              onClick={() => {
                setProductDetails({ productQuantity: 0 });
              }}
            >
              Clear
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductForm;
