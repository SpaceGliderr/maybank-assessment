import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { getProductBySKU } from "../api";

const EditProduct = () => {
  const { productSKU } = useParams();

  return <ProductForm editProductDetails={getProductBySKU(productSKU)} />;
};

export default EditProduct;
