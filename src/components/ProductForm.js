import {
  Alert,
  Box,
  Button,
  FormLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { upsertProduct, deleteProductBySKU } from "../api";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PageTitle from "../components/PageTitle";

/**
 * Renders a form that allows the user to enter product details.
 * - The form will create a product if the `editProductDetails` property is not provided
 * - The form will edit a product if the `editProductDetails` property is provided
 * - The form will have an option to delete a product if the edited product has a quantity of 0
 */
const ProductForm = (props) => {
  const { editProductDetails: edp } = props;

  // Used to track overall changes (after saving changes) to the edited product and tell whether the form is "Edit" or "Create"
  const [editProductDetails, setEditProductDetails] = useState(edp);
  // Used to track any changes made to the product form
  const [productDetails, setProductDetails] = useState(
    editProductDetails || { productQuantity: 0 }
  );
  const [formErrorStates, setFormErrorStates] = useState({
    productSKU: false,
    productName: false,
  });
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [productDeleteSuccess, setProductDeleteSuccess] = useState(false);

  const onSubmitForm = (event) => {
    setFormSubmitSuccess(false);

    // Form error handling
    const errorStates = {
      productSKU: !Boolean(productDetails.productSKU),
      productName: !Boolean(productDetails.productName),
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
        // If the form is to edit a product, update the `editProductDetails` state
        setEditProductDetails(productDetails);
      } else {
        // Otherwise, clear the product form
        setProductDetails({ productQuantity: 0 });
      }

      setFormSubmitSuccess(true);
    }
  };

  const onInputChange = (key, updateValue) => {
    setFormSubmitSuccess(false);
    setFormErrorStates({
      ...formErrorStates,
      [key]: false,
    });
    setProductDetails({
      ...productDetails,
      [key]: updateValue,
    });
  };

  const onIncrementClick = (increment) => {
    setFormSubmitSuccess(false);
    setProductDetails((productDetails) => {
      return {
        ...productDetails,
        productQuantity: productDetails.productQuantity + increment,
      };
    });
  };

  const onDeleteClick = () => {
    setFormSubmitSuccess(false);
    deleteProductBySKU(editProductDetails.productSKU);
    setProductDeleteSuccess(true);
  };

  return (
    <Box component="div" sx={{ display: "block" }}>
      <PageTitle title={`${editProductDetails ? "Edit" : "Create"} Product`} />
      <Box
        component="form"
        onSubmit={onSubmitForm}
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          width: "80%",
          [theme.breakpoints.down("lg")]: {
            width: "100%",
          },
        })}
      >
        {/* FORM SUCCESS / ERROR ALERTS */}
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

        {/* PRODUCT SKU INPUT */}
        <FormLabel required sx={{ display: "block" }}>
          Product SKU
        </FormLabel>
        <TextField
          name="productSKU"
          variant="outlined"
          placeholder="Enter product SKU"
          value={productDetails.productSKU || ""}
          onChange={(event) => {
            onInputChange(event.target.name, event.target.value);
          }}
          error={formErrorStates.productSKU}
          disabled={Boolean(editProductDetails) || productDeleteSuccess}
        />
        {formErrorStates.productSKU && (
          <FormHelperText error>Product SKU is required</FormHelperText>
        )}

        {/* PRODUCT NAME INPUT */}
        <FormLabel required sx={{ display: "block" }}>
          Product Name
        </FormLabel>
        <TextField
          name="productName"
          variant="outlined"
          placeholder="Enter product name"
          value={productDetails.productName || ""}
          onChange={(event) => {
            onInputChange(event.target.name, event.target.value);
          }}
          error={formErrorStates.productName}
          disabled={productDeleteSuccess}
        />
        {formErrorStates.productName && (
          <FormHelperText error>Product name is required</FormHelperText>
        )}

        {/* PRODUCT QUANTITY INPUT */}
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
            onChange={(event) => {
              onInputChange(
                event.target.name,
                parseInt(event.target.value) || 0
              );
            }}
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

        {/* SUBMISSION BUTTONS */}
        <Box
          component="div"
          sx={(theme) => ({
            display: "flex",
            mt: "1em",
            justifyContent: "space-between",
            [theme.breakpoints.down("lg")]: {
              width: "100%",
              flexDirection: "column",
              gap: "1em",
            },
          })}
        >
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            disabled={
              JSON.stringify(Object.values(productDetails)) ===
                (editProductDetails &&
                  JSON.stringify(Object.values(editProductDetails))) ||
              productDeleteSuccess
            }
          >
            {editProductDetails ? "Save" : "Create"}
          </Button>
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
          {editProductDetails && productDetails.productQuantity === 0 && (
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={onDeleteClick}
              disabled={productDeleteSuccess}
            >
              Delete
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductForm;
