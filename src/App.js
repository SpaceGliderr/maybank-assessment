import PageLayout from "./components/PageLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import dummyProductsData from "./data/data.json";
import { upsertProduct } from "./api";

const App = () => {
  useEffect(() => {
    // Initialize dummy products data into the local storage
    localStorage.clear();
    dummyProductsData.forEach((item) => {
      upsertProduct(item);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Products />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreateProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
