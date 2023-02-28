// NOTE: This file serves as a mock API file. It serves to mimic the behavior of real API calls

export const upsertProduct = (productDetails) => {
  localStorage.setItem(
    "products",
    JSON.stringify({
      ...JSON.parse(localStorage.getItem("products")),
      [productDetails.productSKU]: productDetails,
    })
  );
};

export const deleteProductBySKU = (sku) => {
  const products = JSON.parse(localStorage.getItem("products"));
  delete products[sku];
  localStorage.setItem("products", JSON.stringify(products));
};

export const getProducts = () => {
  return JSON.parse(localStorage.getItem("products"));
};

export const getProductBySKU = (sku) => {
  return getProducts()[sku];
};
