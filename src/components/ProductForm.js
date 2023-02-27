import {
  Alert,
  Box,
  Button,
  Divider,
  FormLabel,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { upsertProduct, deleteProductBySKU } from "../api";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductForm = (props) => {
  const { editProductDetails: edp } = props;

  const [editProductDetails, setEditProductDetails] = useState(edp);
  const [productDetails, setProductDetails] = useState(
    editProductDetails || { productQuantity: 0 }
  );
  const [formErrorStates, setFormErrorStates] = useState({
    productSKU: false,
    productName: false,
    productQuantity: false,
  });
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [productDeleteSuccess, setProductDeleteSuccess] = useState(false);

  const onSubmitForm = (event) => {
    // Form validation
    const errorStates = {
      productSKU: !Boolean(productDetails.productSKU),
      productName: !Boolean(productDetails.productName),
      productQuantity:
        productDetails.productQuantity === 0 && !editProductDetails,
    };

    // Apparently using `preventDefault` with `localStorage` causes a race condition
    // The form will submit faster than the localStorage will save the data
    // Need to use preventDefault here then manually clear the form once the data has been successfully stored
    event.preventDefault();
    if (Object.values(errorStates).some(Boolean)) {
      setFormErrorStates(errorStates);
    } else {
      upsertProduct(productDetails);

      if (editProductDetails) {
        setEditProductDetails(productDetails);
      } else {
        setProductDetails({ productQuantity: 0 });
      }

      setFormSubmitSuccess(true);
    }
  };

  const onTextInputChange = (event) => {
    setFormSubmitSuccess(false);
    setFormErrorStates({
      ...formErrorStates,
      [event.target.name]: false,
    });
    setProductDetails({
      ...productDetails,
      [event.target.name]: event.target.value,
    });
  };

  const onNumericInputChange = (event) => {
    setFormSubmitSuccess(false);
    setFormErrorStates({
      ...formErrorStates,
      [event.target.name]: false,
    });
    setProductDetails({
      ...productDetails,
      [event.target.name]: parseInt(event.target.value) || 0,
    });
  };

  const onIncrementClick = (increment) => {
    setFormSubmitSuccess(false);
    setFormErrorStates({
      ...formErrorStates,
      productQuantity: false,
    });
    setProductDetails((productDetails) => {
      return {
        ...productDetails,
        productQuantity: productDetails.productQuantity + increment,
      };
    });
  };

  const onDeleteClick = () => {
    deleteProductBySKU(editProductDetails.productSKU);
    setProductDeleteSuccess(true);
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
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          width: "80%",
          [theme.breakpoints.down("lg")]: { width: "100%" },
        })}
      >
        {/* SUCCESS / ERROR ALERTS */}
        {Object.values(formErrorStates).some(Boolean) && (
          <Alert
            variant="filled"
            severity="error"
            sx={{ boxSizing: "border-box" }}
          >
            Plese fill in the required fields to continue.
          </Alert>
        )}
        {(formSubmitSuccess || productDeleteSuccess) && (
          <Alert
            variant="filled"
            severity="success"
            sx={{ boxSizing: "border-box" }}
          >
            Product listing was successfully{" "}
            {formSubmitSuccess && editProductDetails
              ? "edited"
              : formSubmitSuccess
              ? "created"
              : "deleted"}
            !
          </Alert>
        )}
        {/* PRODUCT SKU */}
        <FormLabel required sx={{ display: "block" }}>
          Product SKU
        </FormLabel>
        <TextField
          name="productSKU"
          variant="outlined"
          placeholder="Enter product SKU"
          value={productDetails.productSKU || ""}
          onChange={onTextInputChange}
          error={formErrorStates.productSKU}
          disabled={Boolean(editProductDetails) || productDeleteSuccess}
        />
        {formErrorStates.productSKU && (
          <FormHelperText error>Product SKU is required</FormHelperText>
        )}
        {/* PRODUCT NAME */}
        <FormLabel required sx={{ display: "block" }}>
          Product Name
        </FormLabel>
        <TextField
          name="productName"
          variant="outlined"
          placeholder="Enter product name"
          value={productDetails.productName || ""}
          onChange={onTextInputChange}
          error={formErrorStates.productName}
          disabled={productDeleteSuccess}
        />
        {formErrorStates.productName && (
          <FormHelperText error>Product name is required</FormHelperText>
        )}
        {/* PRODUCT QUANTITY */}
        <FormLabel required sx={{ display: "block" }}>
          Product Quantity
        </FormLabel>
        <Box sx={{ display: "flex", flex: "row" }}>
          <Button
            startIcon={<RemoveIcon />}
            variant="contained"
            onClick={() => onIncrementClick(-1)}
            disabled={
              productDetails.productQuantity === 0 || productDeleteSuccess
            }
            sx={{
              height: "auto",
              borderRadius: "4px 0 0 4px",
              boxShadow: "none",
              "& .MuiButton-startIcon": { m: 0 },
            }}
          />
          <TextField
            name="productQuantity"
            variant="outlined"
            inputProps={{ inputMode: "numeric" }}
            value={productDetails.productQuantity || 0}
            onChange={onNumericInputChange}
            error={formErrorStates.productQuantity}
            sx={{
              flex: "1 1 auto",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0",
              },
              "& .MuiOutlinedInput-input": {
                textAlign: "center",
              },
            }}
            disabled={productDeleteSuccess}
          />
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => onIncrementClick(1)}
            sx={{
              height: "auto",
              borderRadius: "0 4px 4px 0",
              boxShadow: "none",
              "& .MuiButton-startIcon": { m: 0 },
            }}
            disabled={productDeleteSuccess}
          />
        </Box>
        {formErrorStates.productQuantity && (
          <FormHelperText error>
            Product quantity needs to be more than 0
          </FormHelperText>
        )}
        <Box
          component="div"
          sx={{
            display: "flex",
            mt: "1em",
            justifyContent: "space-between",
          }}
        >
          {editProductDetails && productDetails.productQuantity === 0 ? (
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={onDeleteClick}
              disabled={productDeleteSuccess}
            >
              Delete
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              disabled={
                JSON.stringify(Object.values(productDetails)) ===
                (editProductDetails &&
                  JSON.stringify(Object.values(editProductDetails)))
              }
            >
              {editProductDetails ? "Save" : "Create"}
            </Button>
          )}
          {!editProductDetails && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                setProductDetails({ productQuantity: 0 });
              }}
            >
              Clear Form
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductForm;
