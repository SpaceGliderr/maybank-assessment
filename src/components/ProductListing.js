import { Box, IconButton, Card, CardContent, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getProducts } from "../api";

const ProductListing = (props) => {
  const { isDashboard } = props;

  const products = getProducts();

  const renderProducts = () => {
    return (
      <>
        {Object.values(products).map((product) => {
          return (
            <Card
              key={product.productSKU}
              variant="outlined"
              sx={{
                margin: "0.5em 0 0.5em 0",
                "& .MuiCardContent-root:last-child": {
                  paddingBottom: "16px",
                },
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Box component="div" sx={{ flexGrow: "1" }}>
                  <Typography variant="h6">{product.productName}</Typography>
                  <Typography variant="h6">
                    Quantity: {product.productQuantity}
                  </Typography>
                </Box>
                {isDashboard && (
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </>
    );
  };

  return <Box>{renderProducts()}</Box>;
};

export default ProductListing;
