export const upsertProduct = (productDetails) => {
  localStorage.setItem(
    "products",
    JSON.stringify({
      ...JSON.parse(localStorage.getItem("products")),
      [productDetails.productSKU]: productDetails,
    })
  );
};

export const getProducts = () => {
  return JSON.parse(localStorage.getItem("products"));
};

export const getProductBySKU = (sku) => {
  return getProducts()[sku];
};
