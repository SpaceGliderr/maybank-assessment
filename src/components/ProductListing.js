import {
  Box,
  IconButton,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { getProducts } from "../api";

const ProductListing = (props) => {
  const { isDashboard } = props;

  const products = getProducts();

  const onEditClick = () => {};

  const onDeleteClick = () => {};

  const renderProducts = () => {
    return (
      <>
        {Object.values(products).map((product) => {
          return (
            <Card
              key={product.productSKU}
              variant="outlined"
              sx={{
                m: "0.5em 0 0.75em 0",
                "& .MuiCardContent-root:last-child": {
                  pb: "20px",
                },
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Box component="div" sx={{ flexGrow: "1", pl: "8px" }}>
                  <Typography variant="h6" sx={{ mb: "4px" }}>
                    {product.productName}
                  </Typography>
                  <Typography variant="body2">
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
                    <IconButton onClick={onEditClick}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={onDeleteClick}>
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

  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: "1em",
        }}
      >
        <TextField
          size="small"
          placeholder="Search"
          InputProps={{
            type: "search",
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flex: "1 1 auto", mr: "0.75em" }}
        />
        <IconButton>
          <FilterListIcon />
        </IconButton>
        <IconButton>
          <RefreshIcon />
        </IconButton>
      </Box>
      {renderProducts()}
    </>
  );
};

export default ProductListing;
