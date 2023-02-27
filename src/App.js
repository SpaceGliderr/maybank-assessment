import PageLayout from "./components/PageLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import Dashboard from "./pages/Dashboard";
import dummyProductsData from "./data/data.json";
import { upsertProduct } from "./api";
import EditProduct from "./pages/EditProduct";

const App = () => {
  // Initialize dummy products data into the local storage
  localStorage.clear();
  dummyProductsData.forEach((item) => {
    upsertProduct(item);
  });

  return (
    <>
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
    </>
  );
};

export default App;
