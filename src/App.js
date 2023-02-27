import PageLayout from "./components/PageLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import Dashboard from "./pages/Dashboard";
import dummyProductsData from "./data/data.json";
import { upsertProduct } from "./api";
import EditProduct from "./pages/EditProduct";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const App = () => {
  // Initialize dummy products data into the local storage
  localStorage.clear();
  dummyProductsData.forEach((item) => {
    upsertProduct(item);
  });

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 500,
        md: 750,
        lg: 1200,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Products />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route
              path="/dashboard/edit/:productSKU"
              element={<EditProduct />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
