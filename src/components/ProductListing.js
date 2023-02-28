import {
  Box,
  IconButton,
  Card,
  CardContent,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { deleteProductBySKU, getProducts } from "../api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * Renders a list of products.
 * - Provides an additional Edit product button if `isDashboard` is true. `isDashboard` simulates the administrator level.
 */
const ProductListing = (props) => {
  const { isDashboard } = props;

  const pageOffset = 10;

  const [products, setProducts] = useState(getProducts() || {});
  const [page, setPage] = useState(1);
  const [startIdx, setStartIdx] = useState((page - 1) * pageOffset);

  useEffect(() => {
    // Listens to changes in the localStorage so that it can update the product listing
    const refetch = () => {
      setProducts(getProducts() || {});
    };

    window.addEventListener("storage", refetch);

    return () => {
      window.removeEventListener("storage", refetch);
    };
  }, []);

  useEffect(() => {
    setStartIdx((page - 1) * pageOffset);
  }, [page]);

  const renderProducts = () => {
    return (
      <>
        {Object.values(products)
          .slice(startIdx, startIdx + pageOffset)
          .map((product) => {
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
                    <Typography
                      variant="overline"
                      color="text.secondary"
                      sx={{ lineHeight: 1.5 }}
                    >
                      {product.productSKU}
                    </Typography>
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
                      <Link to={`edit/${product.productSKU}`}>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => {
                          deleteProductBySKU(product.productSKU);
                          window.dispatchEvent(new Event("storage"));
                        }}
                      >
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
      <Pagination
        count={Math.floor(Object.values(products).length / pageOffset) + 1}
        shape="rounded"
        size="large"
        onChange={(_, page) => {
          setPage(page);
        }}
        sx={{
          margin: "1.5em 0 2em",
          "& .MuiPagination-ul": { justifyContent: "end" },
        }}
      />
    </>
  );
};

export default ProductListing;
