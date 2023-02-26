import { Box, Typography } from "@mui/material";
import { getProducts } from "../api";

const ProductListing = () => {
  const products = getProducts();

  const renderProducts = () => {
    return (
      <>
        {Object.values(products).map((product) => {
          return (
            <Box key={product.productSKU}>
              <Typography variant="h6">{product.productName}</Typography>
              <Typography variant="h6">
                Quantity: {product.productQuantity}
              </Typography>
            </Box>
          );
        })}
      </>
    );
  };

  return <Box>{renderProducts()}</Box>;
};

export default ProductListing;
