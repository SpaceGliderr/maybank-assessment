import PageLayout from "./components/PageLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import dummyProductsData from "./data/data.json";
import { upsertProduct } from "./api";
import EditProduct from "./pages/EditProduct";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProductForm from "./components/ProductForm";

const App = () => {
  // Initialize dummy products data into the local storage
  localStorage.clear();
  dummyProductsData.forEach((item) => {
    upsertProduct(item);
  });

  // Create a custom theme to account for different breakpoints
  // - Default MUI breakpoints don't work as well differentiating between mobile and tablets
  // - And also because the adjusted breakpoints suit the layout of my application more
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFCC00",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 500,
        md: 750,
        lg: 1024,
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
            <Route path="/create" element={<ProductForm />} />
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
